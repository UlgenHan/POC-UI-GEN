import path from 'node:path';
import fs from 'fs-extra';
import { TemplateRenderer } from '../utils/TemplateRenderer.js';
import { pageSchema } from '../validators/schemas.js';
import { FileMerger } from '../utils/FileMerger.js';
export class PageBuilder {
    constructor(params) {
        this.params = params;
    }
    async build(pageJsonPath) {
        const raw = await fs.readFile(pageJsonPath, 'utf-8');
        const json = JSON.parse(raw);
        const parsed = pageSchema.parse(json);
        const renderer = new TemplateRenderer(this.params.templatesRoot);
        const content = await renderer.render('next/page.hbs', {
            page: parsed
        });
        const pagesDir = path.join(this.params.outputDir, 'src', 'pages');
        await fs.ensureDir(pagesDir);
        const outPath = path.join(pagesDir, 'index.tsx');
        const merged = await FileMerger.mergeProtectedRegions(outPath, content);
        await fs.writeFile(outPath, merged, 'utf-8');
    }
}
