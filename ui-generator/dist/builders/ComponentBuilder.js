import path from 'node:path';
import fs from 'fs-extra';
import { TemplateRenderer } from '../utils/TemplateRenderer.js';
import { componentManifestSchema } from '../validators/schemas.js';
import { FileMerger } from '../utils/FileMerger.js';
export class ComponentBuilder {
    constructor(params) {
        this.params = params;
    }
    async buildFromManifest(manifestPath) {
        const raw = await fs.readFile(manifestPath, 'utf-8');
        const json = JSON.parse(raw);
        const parsed = componentManifestSchema.parse(json);
        // Copy source component into generated app's src/lib and point wrapper import to it
        const repoRoot = path.resolve(process.cwd(), '..');
        // Normalize manifest import path: treat as project-root relative and strip leading ../ segments if present
        const normalizedRel = parsed.importPath.replace(/^(\.\/+)+/, '');
        let sourcePath = path.resolve(repoRoot, normalizedRel);
        const libDir = path.join(this.params.outputDir, 'src', 'lib');
        await fs.ensureDir(libDir);
        // Determine source with extension
        const withTsx = sourcePath.endsWith('.tsx') ? sourcePath : `${sourcePath}.tsx`;
        const srcExists = await fs.pathExists(withTsx);
        if (!srcExists) {
            // Try without adding .tsx (maybe original already had different extension)
            if (!(await fs.pathExists(sourcePath))) {
                throw new Error(`Component source not found for manifest '${parsed.name}': tried '${withTsx}' and '${sourcePath}'`);
            }
        }
        const parsedPath = path.parse(withTsx);
        const baseNameNoExt = parsedPath.name; // e.g., PrimaryButton
        const destPath = path.join(libDir, `${baseNameNoExt}.tsx`);
        await fs.copy(withTsx, destPath);
        const renderer = new TemplateRenderer(this.params.templatesRoot);
        const exportName = baseNameNoExt; // assume named export matches filename; default fallback handled in template
        const wrapperContent = await renderer.render('next/componentWrapper.hbs', {
            name: parsed.name,
            importPath: `../lib/${baseNameNoExt}`,
            exportName,
            props: parsed.props,
            events: parsed.events
        });
        const componentsOut = path.join(this.params.outputDir, 'src', 'components');
        await fs.ensureDir(componentsOut);
        const filename = `Generated${parsed.name}.tsx`;
        const outPath = path.join(componentsOut, filename);
        const merged = await FileMerger.mergeProtectedRegions(outPath, wrapperContent);
        await fs.writeFile(outPath, merged, 'utf-8');
        return { manifest: parsed, wrapperFilename: filename };
    }
}
