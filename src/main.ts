import { readFileSync } from 'fs';
import { parseGridInputLine, parseRobotPosition } from './service/parsers.js';
import { Grid, Robot } from './types/types.js';

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
    if (!isRobotInBounds(robot, gridDetails)) {
      throw new Error(
        `Line: ${currentLineIndex + 1} Robot Starting coordinates must be inside grid`
      );
    }

    return;
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    return;
  }
}

function isRobotInBounds(robot: Robot, grid: Grid) {
  if (robot.position.x > grid.width || robot.position.x < 0) {
    return false;
  }
  return !(robot.position.y > grid.height || robot.position.y < 0);
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
