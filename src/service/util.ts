import { Grid, Robot } from '../types/types.js';

export function isRobotInBounds(robot: Robot, grid: Grid): boolean {
  if (robot.position.x > grid.width || robot.position.x < 0) {
    return false;
  }
  return !(robot.position.y > grid.height || robot.position.y < 0);
}
