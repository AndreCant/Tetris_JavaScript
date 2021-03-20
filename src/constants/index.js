export const START_GAME = 'INIZIA';
export const STOP_GAME = 'STOP';
export const SCALE = 30;
export const BOARD_COLOR = '#111111';
export const LEVEL_UPDATE = 1;
export const DEFAULT_DIFFICULTY = 1500;
export const TETRIS = [
    [],
    [{ x: 0, y: 0}, { x: 1, y: 0}, { x: 1, y: 1}, { x: 2, y: 0}], // T
    [{ x: 0, y: 0}, { x: 1, y: 0}, { x: 2, y: 0}, { x: 3, y: 0}], // I
    [{ x: 0, y: 0}, { x: 0, y: 1}, { x: 1, y: 0}, { x: 1, y: 1}], // O
    [{ x: 0, y: 0}, { x: 0, y: 1}, { x: 1, y: 0}, { x: 2, y: 0}], // J
    [{ x: 0, y: 0}, { x: 1, y: 0}, { x: 2, y: 0}, { x: 2, y: 1}], // L
    [{ x: 0, y: 0}, { x: 1, y: 0}, { x: 1, y: 1}, { x: 2, y: 1}], // S
    [{ x: 0, y: 1}, { x: 1, y: 0}, { x: 1, y: 1}, { x: 2, y: 0}]  // Z
];
export const TETRIS_COLORS = ['', 'magenta', 'lightBlue', 'yellow', 'blue', 'orange', 'green', 'red'];
export const RESOLUTION = [
    {height: 0, width: 0, scale: 0},
    {height: 100, width: 50, scale: 5},
    {height: 200, width: 100, scale: 10},
    {height: 300, width: 150, scale: 15},
    {height: 400, width: 200, scale: 20},
    {height: 500, width: 250, scale: 25},
    {height: 600, width: 300, scale: 30},
    {height: 700, width: 350, scale: 35},
    {height: 800, width: 400, scale: 40}
];