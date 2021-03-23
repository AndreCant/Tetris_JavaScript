import {initAbsolute, setStyle} from '/src/utils/index.js';
import {START_GAME, STOP_GAME, NEW_GAME} from '/src/constants/index.js';

export default class Sidebar {

    constructor(){
        this.levelChoice = () => this.selectLevel();
        this.handleClickStart = () => this.clickStart();
        this.handleClickStop = () => this.clickStop();
        this.handleClickRestart = () => this.clickRestart();

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

    get restartButton(){
        return this._restartButton;
    }
    set restartButton(restartButton){
        this._restartButton = restartButton;
    }

    get message(){
        return this._message;
    }
    set message(message){
        this._message = message;
    }

    initSidebar(){
        const sidebar = this.createSidebar();
        const header = this.createHeader();
        const body = this.createBody();
        const footer = this.createFooter();
        
        sidebar.appendChild(header);
        sidebar.appendChild(body);
        sidebar.appendChild(footer);
        
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
            display: 'grid',
            gridTemplateRows: '33% 34% 33%',
        });

        return sidebar;
    }

    createHeader(){
        const div =  document.createElement('div');
        const h1 = document.createElement('h1');
        const span_T1 = document.createElement('span');
        const span_E = document.createElement('span');
        const span_T2 = document.createElement('span');
        const span_R = document.createElement('span');
        const span_I = document.createElement('span');
        const span_S = document.createElement('span');
        const span_JS = document.createElement('span');
        const h2 = document.createElement('h2');
        this.message = document.createElement('span');
        this.message.setAttribute('id', 'showMessage');

        setStyle(div, {
            width: '100%',
            height: '100%',
            gridRow: '1',
            fontStyle: 'Courier',
            fontSize: '250%',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
        });

        setStyle(h2, {
            textAlign: 'center'
        });
        
        span_T1.innerText = 'T';
        setStyle(span_T1, {
            color: 'red',
        });
        span_E.innerText = 'E';
        setStyle(span_E, {
            color: 'orange',
        });
        span_T2.innerText = 'T';
        setStyle(span_T2, {
            color: 'yellow',
        });
        span_R.innerText = 'R';
        setStyle(span_R, {
            color: 'lime',
        });
        span_I.innerText = 'I';
        setStyle(span_I, {
            color: 'blue',
        });
        span_S.innerText = 'S';
        setStyle(span_S, {
            color: 'magenta',
        });
        span_JS.innerText = '  JS';
        setStyle(span_JS, {
            color: 'yellow',
        });
        this.message.innerText = 'GAME \nOVER';
        setStyle(this.message, {
            color: 'red',
            fontSize: '100%',
            display: 'none'
        });

        setInterval(() => {
            if (this.message.style.color == 'transparent') {
                this.message.style.color = 'red';
            }else{
                this.message.style.color = 'transparent';
            }
        }, 500);

        span_T1.append(span_E);
        span_E.append(span_T2);
        span_T2.append(span_R);
        span_R.append(span_I);
        span_I.append(span_S);
        span_S.append(span_JS);

        h1.appendChild(span_T1);
        h2.appendChild(this.message);

        div.appendChild(h1);
        div.appendChild(h2);

        return div;
    }

    createBody(){
        const div =  document.createElement('div');
        this.playButton = this.createPlayButton();
        this.levelButton = this.createLevelButton();
        this.restartButton = this.createRestartButton();
        
        setStyle(div, {
            width: '100%',
            height: '100%',
            gridRow: '2',
            display: 'grid',
            gridTemplateRows: '50% 50%',
        });
        
        div.appendChild(this.levelButton);
        div.appendChild(this.playButton);
        div.appendChild(this.restartButton);

        return div;
    }

    createFooter(){
        const div = document.createElement('div');
        const highScore = document.createElement('h3');
        const highLevel = document.createElement('h3');
        const highScoreText = document.createElement('span');
        const highLevelText = document.createElement('span');
        const highScoreValue = document.createElement('span');
        const highLevelValue = document.createElement('span');

        highScoreValue.setAttribute('id', 'highScore');
        highLevelValue.setAttribute('id', 'highLevel');

        highScoreText.innerText = 'TOP SCORE: ';
        highLevelText.innerText = 'TOP LEVEL: ';
        highScoreValue.innerText = 0;
        highLevelValue.innerText = 1;

        setStyle(div, {
            width: '100%',
            height: '100%',
            gridRow: '3',
            fontStyle: 'Courier',
            fontSize: '150%',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
            textAlign: 'center'
        });

        setStyle(highScore, {
            paddingTop: '25%'
        });

        setStyle(highScoreText, {
            color: 'red'
        });

        setStyle(highLevelText, {
            color: 'orange'
        });

        highScoreText.append(highScoreValue);
        highLevelText.append(highLevelValue);
        highScore.appendChild(highScoreText);
        highLevel.appendChild(highLevelText);

        div.appendChild(highScore);
        div.appendChild(highLevel);

        return div;
    }

    createPlayButton(){
        const button = document.createElement('button');
        button.setAttribute('id', 'playButton');
        button.addEventListener('click', this.handleClickStart);
        button.innerHTML = START_GAME;

        /** style */
        button.addEventListener('mousedown', () => {
            button.style.backgroundColor = button.innerHTML == START_GAME ? 'lime' : 'red';
            button.style.boxShadow = '0 5px #666';
            button.style.transform = 'translateY(4px)';
        });
        button.addEventListener('mouseup', () => {
            button.style.backgroundColor = button.innerHTML == START_GAME ? 'lime' : 'red';
            button.style.boxShadow = '0 9px #999';
            button.style.transform = 'translateY(-4px)';
        });
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = button.innerHTML == START_GAME ? 'lime' : 'red';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = button.innerHTML == START_GAME ? 'limegreen' : '#FF3333';
        });

        this.styleGreenButton(button);
        
        return button;
    }

    createLevelButton(){
        const button = document.createElement('button');
        button.setAttribute('id', 'levelButton');
        button.addEventListener('click', this.levelChoice);
        button.innerHTML = 'LEVEL: 1';

        /** style */
        button.addEventListener('mousedown', () => {
            button.style.backgroundColor = '#e4e4e4';
            button.style.boxShadow = '0 5px #666';
            button.style.transform = 'translateY(4px)';
        });
        button.addEventListener('mouseup', () => {
            button.style.backgroundColor = '#e4e4e4';
            button.style.boxShadow = '0 9px #999';
            button.style.transform = 'translateY(-4px)';
        });
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#e4e4e4'
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = 'white'
        });
        
        setStyle(button, {
            width: '60%',
            height: '60%',
            gridRow: '2',
            margin: '20%',
            borderRadius: '10% 10% 10% 10% / 25% 25% 25% 25%',
            outline: 'none',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 9px #999',
            fontSize: '100%',
            textAlign: 'center',
        });

        return button;
    }

    createRestartButton(){
        const button = document.createElement('button');
        button.setAttribute('id', 'restartButton');
        button.addEventListener('click', this.handleClickRestart);
        button.innerHTML = NEW_GAME;

        /** style */
        button.addEventListener('mousedown', () => {
            button.style.backgroundColor = 'lime';
            button.style.boxShadow = '0 5px #666';
            button.style.transform = 'translateY(4px)';
        });
        button.addEventListener('mouseup', () => {
            button.style.backgroundColor = 'lime';
            button.style.boxShadow = '0 9px #999';
            button.style.transform = 'translateY(-4px)';
        });
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = 'lime';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = 'limegreen';
        });

        this.styleGreenButton(button);
        button.style.display = 'none';
        
        return button;
    }

    styleGreenButton(button){
        setStyle(button, {
            width: '80%',
            height: '80%',
            gridRow: '1',
            margin: '10%',
            backgroundColor: 'limegreen',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '10% 10% 10% 10% / 25% 25% 25% 25%',
            border: 'none',
            boxShadow: '0 9px #999',
            fontSize: '100%',
            textAlign: 'center'
        });
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

    clickRestart(){
        this.restartButton.style.display = 'none';
        this.message.style.display = 'none';

        this.playButton.style.display = 'block';
        this.playButton.removeEventListener('click', this.handleClickStop);
        this.playButton.addEventListener('click', this.handleClickStart);
        this.playButton.innerHTML = START_GAME;
        this.styleGreenButton(this.playButton);

        this.levelButton.removeAttribute('disabled');
        this.levelButton.style.display = 'block';
		document.getElementById('main').dispatchEvent(new CustomEvent('restart'));
    }
}
