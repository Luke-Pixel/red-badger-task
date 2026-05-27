import { Grid, Orientation, Robot, RobotMovement } from '../types/types.js';

export function parseGridInputLine(input: string, inputLine: number): Grid {
  const isValid = input.match(/^\s*(\d+)\s+(\d+)\s*$/);
  if (!isValid) {
    throw new Error(
      `Line: ${inputLine}, Invalid Grid: First line should be rightmost coordinates (x y) from 1 to 50, \`${input}\``
    );
  }

  const width = parseInt(isValid[1]);
  const height = parseInt(isValid[2]);

  if (width > 50 || width < 1) {
    throw new Error(
      `Line: ${inputLine}, Invalid Width: Valid width range is 1 - 50. Width = ${width}`
    );
  }

  if (height > 50 || height < 1) {
    throw new Error(
      `Line: ${inputLine}, Invalid Height: Valid height range is 1 - 50. Height = ${height}`
    );
  }

  return { width, height };
}

export function parseRobotPosition(input: string, inputLine: number): Robot {
  const isValid = input.match(/^\s*(\d+)\s+(\d+)\s+([NESW])\s*$/);

  if (!isValid) {
    throw new Error(
      `Line: ${inputLine}, Invalid intital robot position, expected (X Y Orientation(N,E,S,W))`
    );
  }

  const x = parseInt(isValid[1]);
  const y = parseInt(isValid[2]);

  if (x < 0 || y < 0) {
    throw new Error(
      `Line: ${inputLine}, Invlaid robot coordinates, X and Y must be greater than - 1`
    );
  }

  return {
    position: {
      x: parseInt(isValid[1]),
      y: parseInt(isValid[2]),
    },
    orientation: isValid[3] as Orientation,
    isLost: false,
  };
}

export function parseRobotInstructions(input: string, lineNumber: number): RobotMovement[] {
  const inputLength = input.length;
  if (inputLength === 0 || inputLength > 100) {
    throw new Error(
      `Line: ${lineNumber} Invalid robot instruction length must be 1 - 100 charectors. Got ${inputLength} characters`
    );
  }

  if (!/^[LRF]+$/.test(input)) {
    throw new Error(
      `Line: ${lineNumber} Invalid robot instruction, instructions must only contain L, R, F`
    );
  }

  const inputToEnumMap: Record<string, RobotMovement> = {
    L: RobotMovement.left,
    R: RobotMovement.right,
    F: RobotMovement.forward,
  };

  return input.split('').map((stringVal) => inputToEnumMap[stringVal]);
}
