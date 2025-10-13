import path from 'node:path';
import fs from 'fs-extra';
import { parseAndRun } from './cli.js';
import { ProjectBuilder } from './builders/ProjectBuilder.js';
import { projectSchema } from './validators/schemas.js';
export async function runValidate({ input }) {
    const projectJsonPath = path.resolve(process.cwd(), input, 'project.json');
    if (!(await fs.pathExists(projectJsonPath))) {
        throw new Error(`project.json not found at ${projectJsonPath}`);
    }
    const raw = await fs.readFile(projectJsonPath, 'utf-8');
    const json = JSON.parse(raw);
    const parsed = projectSchema.safeParse(json);
    if (!parsed.success) {
        console.error('Validation errors for project.json');
        console.error(parsed.error.format());
        process.exitCode = 1;
        return;
    }
    console.log('project.json is valid');
}
export async function runGenerate({ input, output }) {
    const builder = new ProjectBuilder({ inputDir: path.resolve(process.cwd(), input), outputBaseDir: output });
    await builder.generate();
}
// Parse CLI when executed directly with node without top-level await
function main() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    parseAndRun(process.argv);
}
main();
