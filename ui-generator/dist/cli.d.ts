import { Command } from 'commander';
export interface CliOptions {
    input: string;
    output?: string;
}
export declare function buildCli(): Command;
export declare function parseAndRun(argv: string[]): Promise<void>;
