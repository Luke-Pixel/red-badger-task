import { describe, it, expect } from 'vitest';
import { commands } from '../../src/service/commands.js';
import { Orientation, Robot, Grid, LostScent, RobotMovement } from '../../src/types/types.js';

function createRobot(x: number, y: number, orientation: Orientation): Robot {
  return {
    position: { x, y },
    orientation,
    isLost: false,
  };
}

const grid: Grid = { width: 5, height: 3 };

describe('turnLeft', () => {
  it('rotates N to W', () => {
    const robot = createRobot(0, 0, Orientation.north);
    commands[RobotMovement.left](robot, grid, new Set());
    expect(robot.orientation).toBe(Orientation.west);
  });

  it('rotates W to S', () => {
    const robot = createRobot(0, 0, Orientation.west);
    commands[RobotMovement.left](robot, grid, new Set());
    expect(robot.orientation).toBe(Orientation.south);
  });

  it('rotates S to E', () => {
    const robot = createRobot(0, 0, Orientation.south);
    commands[RobotMovement.left](robot, grid, new Set());
    expect(robot.orientation).toBe(Orientation.east);
  });

  it('rotates E to N', () => {
    const robot = createRobot(0, 0, Orientation.east);
    commands[RobotMovement.left](robot, grid, new Set());
    expect(robot.orientation).toBe(Orientation.north);
  });
});

describe('turnRight', () => {
  it('rotates N to E', () => {
    const robot = createRobot(0, 0, Orientation.north);
    commands[RobotMovement.right](robot, grid, new Set());
    expect(robot.orientation).toBe(Orientation.east);
  });

  it('rotates E to S', () => {
    const robot = createRobot(0, 0, Orientation.east);
    commands[RobotMovement.right](robot, grid, new Set());
    expect(robot.orientation).toBe(Orientation.south);
  });

  it('rotates S to W', () => {
    const robot = createRobot(0, 0, Orientation.south);
    commands[RobotMovement.right](robot, grid, new Set());
    expect(robot.orientation).toBe(Orientation.west);
  });

  it('rotates W to N', () => {
    const robot = createRobot(0, 0, Orientation.west);
    commands[RobotMovement.right](robot, grid, new Set());
    expect(robot.orientation).toBe(Orientation.north);
  });
});

describe('moveForward', () => {
  it('moves N on grid', () => {
    const robot = createRobot(1, 1, Orientation.north);
    commands[RobotMovement.forward](robot, grid, new Set());
    expect(robot.position).toEqual({ x: 1, y: 2 });
    expect(robot.isLost).toBe(false);
  });

  it('moves E on grid', () => {
    const robot = createRobot(1, 1, Orientation.east);
    commands[RobotMovement.forward](robot, grid, new Set());
    expect(robot.position).toEqual({ x: 2, y: 1 });
  });

  it('moves S on grid', () => {
    const robot = createRobot(1, 1, Orientation.south);
    commands[RobotMovement.forward](robot, grid, new Set());
    expect(robot.position).toEqual({ x: 1, y: 0 });
  });

  it('moves W on grid', () => {
    const robot = createRobot(1, 1, Orientation.west);
    commands[RobotMovement.forward](robot, grid, new Set());
    expect(robot.position).toEqual({ x: 0, y: 1 });
  });

  it('becomes LOST when falling off N edge', () => {
    const robot = createRobot(3, 3, Orientation.north);
    const scents: LostScent = new Set();
    commands[RobotMovement.forward](robot, grid, scents);
    expect(robot.isLost).toBe(true);
    expect(robot.position).toEqual({ x: 3, y: 3 });
  });

  it('becomes LOST when falling off E edge', () => {
    const robot = createRobot(5, 0, Orientation.east);
    const scents: LostScent = new Set();
    commands[RobotMovement.forward](robot, grid, scents);
    expect(robot.isLost).toBe(true);
  });

  it('adds scent at current position when lost', () => {
    const robot = createRobot(3, 3, Orientation.north);
    const scents: LostScent = new Set();
    commands[RobotMovement.forward](robot, grid, scents);
    expect(scents.has('3,3')).toBe(true);
  });

  it('ignores command when scented (stays put, not lost)', () => {
    const robot = createRobot(3, 3, Orientation.north);
    const scents: LostScent = new Set(['3,3']);
    commands[RobotMovement.forward](robot, grid, scents);
    expect(robot.isLost).toBe(false);
    expect(robot.position).toEqual({ x: 3, y: 3 });
  });

  it('does nothing if robot already lost', () => {
    const robot = createRobot(0, 0, Orientation.north);
    robot.isLost = true;
    commands[RobotMovement.forward](robot, grid, new Set());
    expect(robot.position).toEqual({ x: 0, y: 0 });
  });
});
