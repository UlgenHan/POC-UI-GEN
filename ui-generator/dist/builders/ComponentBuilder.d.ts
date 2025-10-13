import { ComponentManifest } from '../validators/schemas.js';
export declare class ComponentBuilder {
    private params;
    constructor(params: {
        templatesRoot: string;
        outputDir: string;
        componentsLibRoot: string;
    });
    buildFromManifest(manifestPath: string): Promise<{
        manifest: ComponentManifest;
        wrapperFilename: string;
    }>;
}
