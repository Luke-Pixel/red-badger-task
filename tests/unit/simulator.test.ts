import { describe, it, expect } from 'vitest';
import { simulateRobot } from '../../src/service/simulator.js';
import { Orientation, Robot, Grid, LostScent, RobotMovement } from '../../src/types/types.js';

function createRobot(x: number, y: number, orientation: Orientation): Robot {
  return {
    position: { x, y },
    orientation,
    isLost: false,
  };
}

const grid: Grid = { width: 5, height: 3 };

describe('simulateRobot', () => {
  it('processes all instructions when staying on grid', () => {
    const robot = createRobot(1, 1, Orientation.east);
    const instructions = [
      RobotMovement.right,
      RobotMovement.forward,
      RobotMovement.left,
      RobotMovement.forward,
    ];
    simulateRobot(robot, instructions, grid, new Set());
    expect(robot.position).toEqual({ x: 2, y: 0 });
    expect(robot.orientation).toBe(Orientation.east);
    expect(robot.isLost).toBe(false);
  });

  it('stops early when robot becomes lost', () => {
    const robot = createRobot(3, 3, Orientation.north);
    const instructions = [RobotMovement.forward, RobotMovement.right, RobotMovement.forward];
    simulateRobot(robot, instructions, grid, new Set());
    expect(robot.isLost).toBe(true);
    expect(robot.position).toEqual({ x: 3, y: 3 });
  });

  it('second robot blocked by first robots scent', () => {
    const scents: LostScent = new Set();

    const robot1 = createRobot(3, 3, Orientation.north);
    simulateRobot(robot1, [RobotMovement.forward], grid, scents);
    expect(robot1.isLost).toBe(true);

    const robot2 = createRobot(3, 3, Orientation.north);
    simulateRobot(robot2, [RobotMovement.forward], grid, scents);
    expect(robot2.isLost).toBe(false);
    expect(robot2.position).toEqual({ x: 3, y: 3 });
  });
});
