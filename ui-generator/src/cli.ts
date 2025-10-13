import { Command } from 'commander';

export interface CliOptions {
  input: string;
  output?: string;
}

export function buildCli(): Command {
  const program = new Command();

  program
    .name('ui-generator')
    .description('Generate a Next.js app from JSON manifests and a component library')
    .version('0.1.0');

  program
    .command('validate')
    .requiredOption('-i, --input <path>', 'Input directory containing project.json, components/, pages/, services/')
    .action(async (opts: CliOptions) => {
      const { runValidate } = await import('./index.js');
      await runValidate(opts);
    });

  program
    .command('generate')
    .requiredOption('-i, --input <path>', 'Input directory containing project.json, components/, pages/, services/')
    .option('-o, --output <path>', 'Output base directory (default from project.json outputDir or dist/generated)')
    .action(async (opts: CliOptions) => {
      const { runGenerate } = await import('./index.js');
      await runGenerate(opts);
    });

  return program;
}

export async function parseAndRun(argv: string[]) {
  const program = buildCli();
  await program.parseAsync(argv);
}

