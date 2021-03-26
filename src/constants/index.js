import { generateResolutions } from '/src/utils/index.js';

export const LABELS = {
    startGame: 'PLAY',
    stopGame: 'PAUSE',
    newGame: 'START NEW GAME',
    highScore: 'TOP SCORE: ',
    highLevel: 'TOP LEVEL: ',
    level1: 'LEVEL: ',
    level2: 'LEVEL',
    points: 'POINTS',
    next: 'NEXT',
    lines: 'LINES',
    message: 'GAME \nOVER'
};
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
export const BOARD_COLOR = '#111111';
export const GRID_COLOR = 'grey';
export const GRID_DIMENSION = 0.03;
export const LEVEL_UPDATE = 3;
export const DEFAULT_DIFFICULTY = 1500;
export const RESOLUTION = generateResolutions(0, 20);
export const SOUNDTRACK = 'soundtrack.mp3';
export const SOUND_LINES = 'lines.mp3';
export const SOUND_GAME_OVER = 'gameover.mp3';
export const SOUND_BOTTOM = 'bottom.mp3';
export const SOUND_DENIED = 'denied.mp3';
export const LOGO = 'tetris-logo.png';