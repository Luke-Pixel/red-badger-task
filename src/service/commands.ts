import { Grid, Orientation, LostScent, Robot, RobotMovement } from '../types/types.js';

export type Command = (robot: Robot, grid: Grid, scents: LostScent) => void;

export const commands: Record<RobotMovement, Command> = {
  [RobotMovement.left]: turnLeft,
  [RobotMovement.right]: turnRight,
  [RobotMovement.forward]: moveForward,
};

function turnLeft(robot: Robot): void {
  switch (robot.orientation) {
    case Orientation.north:
      robot.orientation = Orientation.west;
      break;
    case Orientation.east:
      robot.orientation = Orientation.north;
      break;
    case Orientation.south:
      robot.orientation = Orientation.east;
      break;
    case Orientation.west:
      robot.orientation = Orientation.south;
      break;
  }
}

function turnRight(robot: Robot): void {
  switch (robot.orientation) {
    case Orientation.north:
      robot.orientation = Orientation.east;
      break;
    case Orientation.east:
      robot.orientation = Orientation.south;
      break;
    case Orientation.south:
      robot.orientation = Orientation.west;
      break;
    case Orientation.west:
      robot.orientation = Orientation.north;
      break;
  }
}

function moveForward(robot: Robot, Grid: Grid, scents: LostScent) {
  if (robot.isLost) {
    return;
  }

  let nextX = robot.position.x;
  let nextY = robot.position.y;

  switch (robot.orientation) {
    case Orientation.north:
      nextY += 1;
      break;
    case Orientation.east:
      nextX += 1;
      break;
    case Orientation.south:
      nextY -= 1;
      break;
    case Orientation.west:
      nextX -= 1;
      break;
  }

  robot.position.x = nextX;
  robot.position.y = nextY;
}
