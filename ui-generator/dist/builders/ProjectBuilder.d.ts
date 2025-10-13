export declare class ProjectBuilder {
    private options;
    private templatesRoot;
    private outputDir;
    constructor(options: {
        inputDir: string;
        outputBaseDir?: string;
    });
    generate(): Promise<void>;
    private scaffoldProject;
    private writeRegistry;
    private writeReport;
}
