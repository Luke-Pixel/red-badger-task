import { readFileSync } from 'fs';
import { parseGridInputLine } from './service/parsers.js';

function main(): void {
  try {
    const inputPath = process.argv[2] ?? 'input.txt';
    console.log(`Reading input from ${inputPath}`);

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

    const currentLineIndex = 1;
    const currentLine = lines[currentLineIndex - 1];
    const gridDetails = parseGridInputLine(currentLine, currentLineIndex);

    return;
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    return;
  }
}

main();
