import { describe, it, expect } from 'vitest';
import { parseGridInputLine } from './parsers.js';

describe('parseGridInputLine', () => {
  it('should parse valid grid size', () => {
    expect(parseGridInputLine('5 3', 1)).toEqual({ x: 5, y: 3 });
  });

  it('should parse minimum bounds (1 1)', () => {
    expect(parseGridInputLine('1 1', 1)).toEqual({ x: 1, y: 1 });
  });

  it('should parse maximum bounds (50 50)', () => {
    expect(parseGridInputLine('50 50', 1)).toEqual({ x: 50, y: 50 });
  });

  it('should throw for out of bounds width (51)', () => {
    expect(() => parseGridInputLine('51 5', 1)).toThrow('Invalid Width');
  });

  it('should throw for out of bounds height (0)', () => {
    expect(() => parseGridInputLine('5 0', 1)).toThrow('Invalid Height');
  });

  it('should throw for invalid input format', () => {
    expect(() => parseGridInputLine('invalid', 1)).toThrow('Invalid Coordinates');
  });
});
