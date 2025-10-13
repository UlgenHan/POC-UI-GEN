export declare class PageBuilder {
    private params;
    constructor(params: {
        templatesRoot: string;
        outputDir: string;
    });
    build(pageJsonPath: string): Promise<void>;
}
