import path from 'node:path';
import fs from 'fs-extra';
import { TemplateRenderer } from '../utils/TemplateRenderer.js';
import { serviceSchema } from '../validators/schemas.js';
import { FileMerger } from '../utils/FileMerger.js';

export class ServiceBuilder {
  constructor(private params: { templatesRoot: string; outputDir: string; apiBaseUrl: string }) {}

  async build(serviceJsonPath: string) {
    const raw = await fs.readFile(serviceJsonPath, 'utf-8');
    const json = JSON.parse(raw);
    const parsed = serviceSchema.parse(json);

    const renderer = new TemplateRenderer(this.params.templatesRoot);
    const content = await renderer.render('next/service.hbs', {
      service: parsed,
      apiBaseUrl: this.params.apiBaseUrl
    });

    const servicesDir = path.join(this.params.outputDir, 'src', 'services');
    await fs.ensureDir(servicesDir);
    const outPath = path.join(servicesDir, `${parsed.name}Service.ts`);

    const merged = await FileMerger.mergeProtectedRegions(outPath, content);
    await fs.writeFile(outPath, merged, 'utf-8');
  }
}

