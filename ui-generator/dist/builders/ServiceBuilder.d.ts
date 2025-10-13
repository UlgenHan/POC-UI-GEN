export declare class ServiceBuilder {
    private params;
    constructor(params: {
        templatesRoot: string;
        outputDir: string;
        apiBaseUrl: string;
    });
    build(serviceJsonPath: string): Promise<void>;
}
