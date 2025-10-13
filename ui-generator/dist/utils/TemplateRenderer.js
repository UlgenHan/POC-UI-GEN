import Handlebars from 'handlebars';
import fs from 'fs-extra';
import path from 'node:path';
export class TemplateRenderer {
    constructor(templatesRoot) {
        this.templatesRoot = templatesRoot;
        Handlebars.registerHelper('json', (ctx) => JSON.stringify(ctx, null, 2));
        Handlebars.registerPartial('protectedRegion', '<!-- <gen-start id="{{id}}"> -->\n{{{content}}}\n<!-- <gen-end id="{{id}}"> -->');
    }
    async render(templateRelPath, context) {
        const templatePath = path.join(this.templatesRoot, templateRelPath);
        const source = await fs.readFile(templatePath, 'utf-8');
        const tpl = Handlebars.compile(source, { noEscape: true });
        return tpl(context);
    }
}
