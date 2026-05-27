import { GridPosition, Orientation, Robot } from '../types/types.js';

export function parseGridInputLine(input: string, inputLine: number): GridPosition {
  const isValid = input.match(/^\s*(\d+)\s+(\d+)\s*$/);
  if (!isValid) {
    throw new Error(
      `Line: ${inputLine}, Invalid Coordinates: First line should be rightmost coordinates (x y) from 1 to 50, \`${input}\``
    );
  }

  const width = parseInt(isValid[1]);
  const height = parseInt(isValid[2]);

  if (width > 50 || width < 1) {
    throw new Error(`Line: ${inputLine}, Invalid X: Valid width range is 1 - 50. Width = ${width}`);
  }

  if (height > 50 || height < 1) {
    throw new Error(
      `Line: ${inputLine}, Invalid Y: Valid height range is 1 - 50. Height = ${height}`
    );
  }

  return { x: width, y: height };
}

export function robotPositionParser(input: string, inputLine: number): Robot {
  const isValid = input.match(/^\s*(\d+)\s+(\d+)\s+([NESW])\s*$/);

  if (!isValid) {
    throw new Error(
      `Line: ${inputLine}, Invalid intital robot position, expected (X Y Orientation(N,E,S,W))`
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
