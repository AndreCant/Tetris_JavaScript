export const START_GAME = 'INIZIA';
export const STOP_GAME = 'STOP';
export const SCALE = 40;
export const COLOR_1 = '#111';
export const COLOR_2 = '#002';
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