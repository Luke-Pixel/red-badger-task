import { Robot } from '../types/types.js';

export function formatRobot(robot: Robot): string {
  const base = `${robot.position.x} ${robot.position.y} ${robot.orientation}`;
  return robot.isLost ? `${base} LOST` : base;
}

export function formatOutput(robots: Robot[]): string {
  return robots.map(formatRobot).join('\n\n');
}
