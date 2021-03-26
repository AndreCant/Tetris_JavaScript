import {initAbsolute, setStyle} from '/src/utils/index.js';
import {LOGO, LABELS} from '/src/constants/index.js';

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
        const imgContainer = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute('src', `/src/resources/img/${LOGO}`);

        setStyle(div, {
            width: '100%',
            height: '100%',
            gridRow: '1',
            fontStyle: 'Courier',
            fontSize: '250%',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
        });

        setStyle(img, {
            maxWidth: '100%',
            maxHeight: '100%'
        });
        
        setStyle(imgContainer, {
            width: '100%',
            height: '100%'
        });
        
        imgContainer.appendChild(img);
        div.appendChild(imgContainer);

        return div;
    }

    createBody(){
        const div =  document.createElement('div');
        this.playButton = this.createPlayButton();
        this.levelButton = this.createLevelButton();
        this.restartButton = this.createRestartButton();
        this.message = this.createMessage();
        
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
        div.appendChild(this.message);

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
        button.innerHTML = LABELS.startGame;

        /** style */
        button.addEventListener('mousedown', () => {
            button.style.backgroundColor = button.innerHTML == LABELS.startGame ? 'lime' : 'red';
            button.style.boxShadow = '0 5px #666';
            button.style.transform = 'translateY(4px)';
        });
        button.addEventListener('mouseup', () => {
            button.style.backgroundColor = button.innerHTML == LABELS.startGame ? 'lime' : 'red';
            button.style.boxShadow = '0 9px #999';
            button.style.transform = 'translateY(-4px)';
        });
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = button.innerHTML == LABELS.startGame ? 'lime' : 'red';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = button.innerHTML == LABELS.startGame ? 'limegreen' : '#FF3333';
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
        button.innerHTML = LABELS.newGame;

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

    createMessage(){
        const span = document.createElement('span');
        span.setAttribute('id', 'showMessage');
        span.innerText = LABELS.message;

        setStyle(span, {
            color: 'red',
            fontSize: '400%',
            display: 'none',
            textAlign: 'center',
            margin: '15%',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
        });

        setInterval(() => {
            if (span.style.color == 'transparent') {
                span.style.color = 'red';
            }else{
                span.style.color = 'transparent';
            }
        }, 500);

        return span;
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
        const lev = LABELS.level1;

        switch (this.levelButton.innerHTML) {
            case `${lev}1`: this.levelButton.innerHTML = `${lev}5`;
                break;
            case `${lev}5`: this.levelButton.innerHTML = `${lev}10`;
                break;
            case `${lev}10`: this.levelButton.innerHTML = `${lev}15`;
                break;
            case `${lev}15`: this.levelButton.innerHTML = `${lev}20`;
                break;
            case `${lev}20`: this.levelButton.innerHTML = `${lev}25`;
                break;
            case `${lev}25`: this.levelButton.innerHTML = `${lev}1`;
                break;
            default:
                break;
        }
    }

    clickStop(){
        this.playButton.removeEventListener('click', this.handleClickStop);
        this.playButton.innerHTML = LABELS.startGame;
        this.playButton.addEventListener('click', this.handleClickStart);

        this.levelButton.removeAttribute('disabled');
        document.getElementById('main').dispatchEvent(new CustomEvent('stop'));
    }
    
    clickStart(){
        const level = this.levelButton.innerHTML.split(' ')[1];
        this.playButton.removeEventListener('click', this.handleClickStart);
        this.playButton.innerHTML = LABELS.stopGame;
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
        this.playButton.innerHTML = LABELS.startGame;
        this.styleGreenButton(this.playButton);

        this.levelButton.removeAttribute('disabled');
        this.levelButton.style.display = 'block';
		document.getElementById('main').dispatchEvent(new CustomEvent('restart'));
    }
}
