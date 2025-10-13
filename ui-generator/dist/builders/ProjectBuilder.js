import path from 'node:path';
import fs from 'fs-extra';
import { globSync } from 'glob';
import { projectSchema, componentManifestSchema } from '../validators/schemas.js';
import { ComponentBuilder } from './ComponentBuilder.js';
import { PageBuilder } from './PageBuilder.js';
import { ServiceBuilder } from './ServiceBuilder.js';
import { TemplateRenderer } from '../utils/TemplateRenderer.js';
export class ProjectBuilder {
    constructor(options) {
        this.options = options;
        // Resolve templates from the project root (ui-generator/templates)
        this.templatesRoot = path.join(process.cwd(), 'templates');
    }
    async generate() {
        const projectPath = path.join(this.options.inputDir, 'project.json');
        const projectRaw = await fs.readFile(projectPath, 'utf-8');
        const projectJson = JSON.parse(projectRaw);
        const project = projectSchema.parse(projectJson);
        const outputBase = this.options.outputBaseDir ?? project.outputDir ?? 'dist/generated';
        this.outputDir = path.resolve(process.cwd(), outputBase, project.name);
        await this.scaffoldProject(project);
        const componentBuilder = new ComponentBuilder({
            templatesRoot: this.templatesRoot,
            outputDir: this.outputDir,
            componentsLibRoot: path.resolve(process.cwd(), project.componentsPath)
        });
        const serviceBuilder = new ServiceBuilder({
            templatesRoot: this.templatesRoot,
            outputDir: this.outputDir,
            apiBaseUrl: project.apiBaseUrl
        });
        const pageBuilder = new PageBuilder({ templatesRoot: this.templatesRoot, outputDir: this.outputDir });
        const manifestsDir = path.join(this.options.inputDir, 'components');
        const manifestFiles = globSync('*.json', { cwd: manifestsDir, absolute: true });
        const builtWrappers = [];
        for (const mf of manifestFiles) {
            const { manifest, wrapperFilename } = await componentBuilder.buildFromManifest(mf);
            builtWrappers.push({ name: manifest.name, file: wrapperFilename });
        }
        const servicesDir = path.join(this.options.inputDir, 'services');
        const serviceFiles = globSync('*.json', { cwd: servicesDir, absolute: true });
        for (const sf of serviceFiles) {
            await serviceBuilder.build(sf);
        }
        const pagesDir = path.join(this.options.inputDir, 'pages');
        const pageFiles = globSync('*.page.json', { cwd: pagesDir, absolute: true });
        for (const pf of pageFiles) {
            await pageBuilder.build(pf);
        }
        await this.writeRegistry(manifestsDir);
        await this.writeReport();
    }
    async scaffoldProject(project) {
        await fs.ensureDir(this.outputDir);
        const renderer = new TemplateRenderer(this.templatesRoot);
        const pkg = await renderer.render('next/app.hbs', { project });
        await fs.writeFile(path.join(this.outputDir, 'package.json'), pkg, 'utf-8');
        await fs.writeFile(path.join(this.outputDir, 'next.config.js'), `/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nmodule.exports = nextConfig;\n`, 'utf-8');
        await fs.writeFile(path.join(this.outputDir, 'tsconfig.json'), JSON.stringify({
            compilerOptions: {
                target: 'ES2020',
                lib: ['dom', 'es2020'],
                jsx: 'react-jsx',
                module: 'commonjs',
                moduleResolution: 'node',
                strict: true,
                esModuleInterop: true,
                skipLibCheck: true,
                baseUrl: '.',
                paths: {}
            },
            include: ['src/**/*']
        }, null, 2), 'utf-8');
        await fs.ensureDir(path.join(this.outputDir, 'public'));
        await fs.ensureDir(path.join(this.outputDir, 'src', 'pages'));
        await fs.ensureDir(path.join(this.outputDir, 'src', 'components'));
        await fs.ensureDir(path.join(this.outputDir, 'src', 'services'));
        await fs.ensureDir(path.join(this.outputDir, 'src', 'runtime'));
        const eventManager = await renderer.render('next/runtime/EventManager.hbs', {});
        await fs.writeFile(path.join(this.outputDir, 'src', 'runtime', 'EventManager.ts'), eventManager, 'utf-8');
        const hooks = await renderer.render('next/runtime/hooks.hbs', {});
        await fs.writeFile(path.join(this.outputDir, 'src', 'runtime', 'hooks.ts'), hooks, 'utf-8');
        await fs.writeFile(path.join(this.outputDir, 'README.md'), `# ${project.name}\n\nRun:\n\n\n- npm install\n- npm run dev\n\n`, 'utf-8');
    }
    async writeRegistry(manifestsDir) {
        const files = await fs.readdir(manifestsDir);
        const items = [];
        for (const f of files) {
            if (!f.endsWith('.json'))
                continue;
            const json = JSON.parse(await fs.readFile(path.join(manifestsDir, f), 'utf-8'));
            const parsed = componentManifestSchema.safeParse(json);
            if (parsed.success) {
                items.push({ name: parsed.data.name, importPath: parsed.data.importPath, confidence: 0.9 });
            }
        }
        const out = path.join(this.options.inputDir, '..', 'component-registry.json');
        await fs.writeFile(out, JSON.stringify(items, null, 2), 'utf-8');
    }
    async writeReport() {
        const reportPath = path.join(this.options.inputDir, 'report.md');
        await fs.writeFile(reportPath, `# Generation Report\n\n- Components and pages generated.\n- Protected regions preserved if present.\n`, 'utf-8');
    }
}
