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

function moveForward(robot: Robot, Grid: Grid, scents: LostScent) {}
