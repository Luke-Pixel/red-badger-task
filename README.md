# Red Badger Coding Challenge - Luke

## Tech Stack

| Tool | Purpose |
|------|---------|
| TypeScript 5 | Language with strict type checking |
| Node.js 20+ | Runtime |
| tsx | Execute TypeScript directly without compilation |
| Vitest | Testing framework |
| ESLint + Prettier | Linting and code formatting |

## Project Structure

```
src/
├── main.ts              # Entry point — reads input, runs simulation, prints output
├── types/
│   └── types.ts         # Domain types and enums (Robot, Grid, Orientation, etc.)
└── service/
    ├── parsers.ts       # Input parsing (grid, robot position, instructions)
    ├── commands.ts      # Robot movement commands (L, R, F)
    ├── simulator.ts     # Simulation engine
    ├── formatter.ts     # Output formatting
    └── util.ts          # Helper functions

tests/
└── unit/                # Unit tests for service modules
    ├── parsers.test.ts
    ├── commands.test.ts
    └── simulator.test.ts

input.txt                # Default input file
```

## Running

### Default input file

```bash
npm start
```

This reads from `input.txt` in the project root.

### Custom input file

```bash
npm start path/to/input.txt
```

### Example

```bash
$ npm start
1 1 E

3 3 N LOST

2 3 S
```

## Input Format

The input file contains:

1. **First line**: grid upper-right coordinates (`maxX maxY`). Lower-left is always `0,0`.
2. **Robot blocks** (repeated): two lines per robot
   - Line 1: initial position and orientation (`x y orientation`)
   - Line 2: instruction string (`L`, `R`, `F` only, max 99 characters)

```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Output Format

For each robot, prints final grid position and orientation:

```
x y orientation
```

If the robot fell off the grid:

```
x y orientation LOST
```

Multiple robots are separated by a blank line:

```
1 1 E

3 3 N LOST

2 3 S
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run the application |
| `npm run dev` | Run with tsx (development) |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## Constraints

- Grid coordinates: `1` to `50`
- Instruction length: `1` to `99` characters
- Valid orientations: `N`, `E`, `S`, `W`
- Valid instructions: `L`, `R`, `F`
