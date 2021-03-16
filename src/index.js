console.log('START TETRIS');

import Tetris from './components/Game.js';

window.addEventListener('load', () => {
	const game = new Tetris();
});
