import {initAbsolute, setStyle, handleClickStart} from '/src/utils/index.js';
import {START_GAME} from '/src/constants/index.js';

export default class Sidebar {

    constructor(){
        this.element = this.initSidebar();
    }

    initSidebar(){
        const sidebar = this.createSidebar();
        const button = this.createButton();
        
        sidebar.appendChild(button);

        return sidebar;
    }

    createSidebar(){
        const sidebar = document.createElement('aside');
        sidebar.setAttribute('id', 'sidebar');
        initAbsolute(sidebar, ['top', 'bottom', 'left']);
        setStyle(sidebar, {
            width: '30%',
            border: '3px solid black',
            backgroundColor: '#d1d1d1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        });

        return sidebar;
    }

    createButton(){
        const button = document.createElement('button');
        button.setAttribute('id', 'sidebarButton');
        button.innerHTML = START_GAME;
        button.addEventListener('click', handleClickStart);

        return button;
    }
}
