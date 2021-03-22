import {initAbsolute, setStyle} from '/src/utils/index.js';
import {START_GAME, STOP_GAME} from '/src/constants/index.js';

export default class Sidebar {

    constructor(){
        this.levelChoice = () => this.selectLevel();
        this.handleClickStart = () => this.clickStart();
        this.handleClickStop = () => this.clickStop();
        this.handleLevel = event => this.updateLevel(event);
        this.handlePoints = event => this.updatePoints(event);
        this.handleLines = event => this.updateLines(event);

        this.element = this.initSidebar();
    }

    get playButton(){
        return this._playButton;
    }
    set playButton(playButton){
        this._playButton = playButton;
    }

    get levelButton(){
        return this._levelButton;
    }
    set levelButton(levelButton){
        this._levelButton = levelButton;
    }

    get level(){
        return this._level;
    }
    set level(level){
        this._level = level;
    }

    get points(){
        return this._points;
    }
    set points(points){
        this._points = points;
    }

    get lines(){
        return this._lines;
    }
    set lines(lines){
        this._lines = lines;
    }

    initSidebar(){
        const sidebar = this.createSidebar();
        this.playButton = this.createPlayButton();
        this.levelButton = this.createLevelButton();
        this.level = this.createLevel();
        this.points = this.createPoints();
        this.lines = this.createLines();

        sidebar.appendChild(this.level);
        sidebar.appendChild(this.points);
        sidebar.appendChild(this.lines);
        sidebar.appendChild(this.levelButton);
        sidebar.appendChild(this.playButton);

        return sidebar;
    }

    createSidebar(){
        const sidebar = document.createElement('aside');
        sidebar.setAttribute('id', 'sidebar');
        initAbsolute(sidebar, ['top', 'bottom', 'left']);
        setStyle(sidebar, {
            width: '20%',
            backgroundColor: '#d1d1d1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        });

        return sidebar;
    }

    createPlayButton(){
        const button = document.createElement('button');
        button.setAttribute('id', 'playButton');
        button.innerHTML = START_GAME;
        button.addEventListener('click', this.handleClickStart);

        return button;
    }

    createLevelButton(){
        const button = document.createElement('button');
        button.setAttribute('id', 'levelButton');
        button.innerHTML = 'LEVEL: 1';
        button.addEventListener('click', this.levelChoice);

        return button;
    }

    createLevel(){
        const div = document.createElement('div');
        div.setAttribute('id', 'showLevel');
        div.innerHTML = this.levelButton.innerHTML;
        div.addEventListener('setlevel', this.handleLevel);

        return div;
    }

    createPoints(){
        const div = document.createElement('div');
        div.setAttribute('id', 'showPoints');
        div.innerHTML = 'POINTS: 0';
        div.addEventListener('setpoints', this.handlePoints);

        return div;
    }

    createLines(){
        const div = document.createElement('div');
        div.setAttribute('id', 'showLines');
        div.innerHTML = 'LINES: 0';
        div.addEventListener('setlines', this.handleLines);

        return div;
    }

    selectLevel(){
        switch (this.levelButton.innerHTML) {
            case 'LEVEL: 1': this.levelButton.innerHTML = 'LEVEL: 5';
                break;
            case 'LEVEL: 5': this.levelButton.innerHTML = 'LEVEL: 10';
                break;
            case 'LEVEL: 10': this.levelButton.innerHTML = 'LEVEL: 15';
                break;
            case 'LEVEL: 15': this.levelButton.innerHTML = 'LEVEL: 20';
                break;
            case 'LEVEL: 20': this.levelButton.innerHTML = 'LEVEL: 25';
                break;
            case 'LEVEL: 25': this.levelButton.innerHTML = 'LEVEL: 1';
                break;
            default:
                break;
        }
    }

    clickStop(){
        this.playButton.removeEventListener('click', this.handleClickStop);
        this.playButton.innerHTML = START_GAME;
        this.playButton.addEventListener('click', this.handleClickStart);

        this.levelButton.removeAttribute('disabled');
        document.getElementById('main').dispatchEvent(new CustomEvent('stop'));
    }
    
    clickStart(){
        const level = this.levelButton.innerHTML.split(' ')[1];
        this.playButton.removeEventListener('click', this.handleClickStart);
        this.playButton.innerHTML = STOP_GAME;
        this.playButton.addEventListener('click', this.handleClickStop);

        this.levelButton.setAttribute('disabled', true);
		document.getElementById('main').dispatchEvent(new CustomEvent('start', {detail: level}));
    }

    updateLevel(event){
        this.level.innerHTML = `LEVEL:${event.detail}`;
    }

    updatePoints(event){
        this.points.innerHTML = `POINTS:${event.detail}`;
    }

    updateLines(event){
        this.lines.innerHTML = `LINES:${event.detail}`;
    }
}
