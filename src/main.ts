import { readFileSync } from 'fs';
import {
  parseGridInputLine,
  parseRobotInstructions,
  parseRobotPosition,
} from './service/parsers.js';
import { formatOutput } from './service/formatter.js';
import { simulateRobot } from './service/simulator.js';
import { Grid, Robot, RobotMovement } from './types/types.js';
import { isRobotInBounds } from './service/util.js';

function main(): void {
  try {
    const inputPath: string = process.argv[2] ?? 'input.txt';

    const input: string = initialFileRead(inputPath);
    const lines: string[] = splitInputText(input);

    let currentLineIndex: number = 0;
    let currentLine: string = lines[currentLineIndex];

    const gridDetails: Grid = parseGridInputLine(currentLine, currentLineIndex + 1);
    const gridScents: Set<string> = new Set<string>();

    currentLineIndex++;

    const results: Robot[] = [];

    while (currentLineIndex < lines.length) {
      currentLine = lines[currentLineIndex];

      const robot = parseRobotPosition(currentLine, currentLineIndex + 1);
      if (!isRobotInBounds(robot, gridDetails)) {
        throw new Error(
          `Line: ${currentLineIndex + 1} Robot Starting coordinates must be inside grid`
        );
      }

      currentLineIndex++;

      if (currentLineIndex >= lines.length) {
        throw new Error(`Line: ${currentLineIndex + 1} Missing robot instructions`);
      }

      currentLine = lines[currentLineIndex];
      const instructions: RobotMovement[] = parseRobotInstructions(
        currentLine,
        currentLineIndex + 1
      );

      simulateRobot(robot, instructions, gridDetails, gridScents);
      results.push(robot);

      currentLineIndex++;
    }

    console.log(formatOutput(results));
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    return;
  }
}

function initialFileRead(inputPath: string): string {
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
  const lines: string[] = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    throw new Error('No valid input found');
  }

  return lines;
}

main();
