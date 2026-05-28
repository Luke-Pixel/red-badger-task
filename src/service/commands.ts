import { Grid, LostScent, Robot, RobotMovement } from '../types/types.js';

export type Command = (robot: Robot, grid: Grid, scents: LostScent) => void;

export const commands: Record<RobotMovement, Command> = {
  [RobotMovement.left]: turnLeft,
  [RobotMovement.right]: turnRight,
  [RobotMovement.forward]: moveForward,
};

function turnLeft(robot: Robot) {}

function turnRight(robot: Robot) {}

function moveForward(robot: Robot, Grid: Grid, scents: LostScent) {}
