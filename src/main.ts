import { readFileSync } from 'fs';
import { parseGridInputLine, parseRobotPosition } from './service/parsers.js';

function main(): void {
  try {
    const inputPath = process.argv[2] ?? 'input.txt';

    const input = initialFileRead(inputPath);
    const lines = splitInputText(input);

    let currentLineIndex = 0;
    let currentLine = lines[currentLineIndex];

    const gridDetails = parseGridInputLine(currentLine, currentLineIndex + 1);
    const gridScents = new Set<string>();

    currentLineIndex++;
    currentLine = lines[currentLineIndex];

    const robot = parseRobotPosition(currentLine, currentLineIndex + 1);

    return;
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    return;
  }
}

function initialFileRead(inputPath: string): string {
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

  return input;
}

function splitInputText(input: string): string[] {
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    throw new Error('No valid input found');
  }

  return lines;
}

main();
