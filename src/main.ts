import { readFileSync } from 'fs';

function main(): void {
  try {
    console.log('app');
    const inputPath = process.argv[2] ?? 'input.txt';

    let input: string;
    try {
      input = readFileSync(inputPath, 'utf-8');
    } catch {
      throw new Error(`Could not read file: ${inputPath}`);
    }

    if (!input.trim()) {
      throw new Error('Input file is empty');
    }

    const lines = input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      throw new Error('No valid input found');
    }

    return;
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    return;
  }
}

main();
