import { Grid, LostScent, Robot, RobotMovement } from '../types/types.js';
import { commands } from './commands.js';

export function simulateRobot(
  robot: Robot,
  instructions: RobotMovement[],
  grid: Grid,
  scents: LostScent
): Robot {
  for (const instruction of instructions) {
    if (robot.isLost) {
      break;
    }

    commands[instruction](robot, grid, scents);
  }

  return robot;
}
