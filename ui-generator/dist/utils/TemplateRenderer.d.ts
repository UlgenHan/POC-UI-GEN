export declare class TemplateRenderer {
    private templatesRoot;
    constructor(templatesRoot: string);
    render(templateRelPath: string, context: unknown): Promise<string>;
}
