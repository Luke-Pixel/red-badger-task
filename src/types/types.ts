export enum RobotMovement {
  left = 'L',
  right = 'R',
  forward = 'F',
}

export enum Orientation {
  north = 'N',
  east = 'E',
  south = 'S',
  west = 'W',
}
export interface GridPosition {
  x: number;
  y: number;
}

export interface Robot {
  position: GridPosition;
  orientation: Orientation;
  isLost: boolean;
}

export interface Grid {
  width: number;
  height: number;
}
