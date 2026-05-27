import { describe, it, expect } from 'vitest';
import { parseGridInputLine, parseRobotPosition, parseRobotInstructions } from './parsers.js';
import { Orientation, RobotMovement } from '../types/types.js';

describe('parseGridInputLine', () => {
  it('should parse valid grid size', () => {
    expect(parseGridInputLine('5 3', 1)).toEqual({ width: 5, height: 3 });
  });

  it('should parse minimum bounds (1 1)', () => {
    expect(parseGridInputLine('1 1', 1)).toEqual({ width: 1, height: 1 });
  });

  it('should parse maximum bounds (50 50)', () => {
    expect(parseGridInputLine('50 50', 1)).toEqual({ width: 50, height: 50 });
  });

  it('should throw for out of bounds width (51)', () => {
    expect(() => parseGridInputLine('51 5', 1)).toThrow('Invalid Width');
  });

  it('should throw for out of bounds height (0)', () => {
    expect(() => parseGridInputLine('5 0', 1)).toThrow('Invalid Height');
  });

  it('should throw for invalid input format', () => {
    expect(() => parseGridInputLine('invalid', 1)).toThrow('Invalid Grid');
  });
});

describe('parseRobotPosition', () => {
  it('should parse valid robot position', () => {
    const result = parseRobotPosition('1 1 E', 2);
    expect(result.position).toEqual({ x: 1, y: 1 });
    expect(result.orientation).toBe(Orientation.east);
    expect(result.isLost).toBe(false);
  });

  it('should parse all orientations', () => {
    expect(parseRobotPosition('0 0 N', 1).orientation).toBe(Orientation.north);
    expect(parseRobotPosition('0 0 E', 1).orientation).toBe(Orientation.east);
    expect(parseRobotPosition('0 0 S', 1).orientation).toBe(Orientation.south);
    expect(parseRobotPosition('0 0 W', 1).orientation).toBe(Orientation.west);
  });

  it('should throw for invalid format', () => {
    expect(() => parseRobotPosition('invalid', 2)).toThrow('Invalid intital robot position');
  });

  it('should throw for negative coordinates', () => {
    expect(() => parseRobotPosition('-1 0 E', 2)).toThrow('Invalid intital robot position');
  });
});

describe('parseRobotInstructions', () => {
  it('should parse valid instructions', () => {
    const result = parseRobotInstructions('LRF', 3);
    expect(result).toEqual([RobotMovement.left, RobotMovement.right, RobotMovement.forward]);
  });

  it('should throw for empty string', () => {
    expect(() => parseRobotInstructions('', 3)).toThrow('Invalid robot instruction length');
  });

  it('should throw for invalid characters', () => {
    expect(() => parseRobotInstructions('LRX', 3)).toThrow('Invalid robot instruction');
  });
});
