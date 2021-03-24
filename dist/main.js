(()=>{"use strict";const e="PLAY",t="#111111",s=.03,i=[[],[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:2,y:0}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],[{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:1,y:1}],[{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:2,y:0}],[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:2,y:1}],[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:2,y:1}],[{x:0,y:1},{x:1,y:0},{x:1,y:1},{x:2,y:0}]],n=["","magenta","lightBlue","yellow","blue","orange","green","red"],r=function(e,t){let s=[];for(let e=0;e<=20;e++)s.push({height:100*e,width:50*e,scale:5*e});return s}();function o(e,t){Object.keys(t).forEach((function(s){e.style[s]=t[s]}))}function a(e,t){e.style.position="absolute",t.forEach((function(t){e.style[t]=0}))}class l{constructor(){this.levelChoice=()=>this.selectLevel(),this.handleClickStart=()=>this.clickStart(),this.handleClickStop=()=>this.clickStop(),this.handleClickRestart=()=>this.clickRestart(),this.element=this.initSidebar()}get playButton(){return this._playButton}set playButton(e){this._playButton=e}get levelButton(){return this._levelButton}set levelButton(e){this._levelButton=e}get restartButton(){return this._restartButton}set restartButton(e){this._restartButton=e}get message(){return this._message}set message(e){this._message=e}initSidebar(){const e=this.createSidebar(),t=this.createHeader(),s=this.createBody(),i=this.createFooter();return e.appendChild(t),e.appendChild(s),e.appendChild(i),e}createSidebar(){const e=document.createElement("aside");return e.setAttribute("id","sidebar"),a(e,["top","bottom","left"]),o(e,{width:"20%",backgroundColor:"#d1d1d1",display:"flex",justifyContent:"center",alignItems:"center",display:"grid",gridTemplateRows:"33% 34% 33%"}),e}createHeader(){const e=document.createElement("div"),t=document.createElement("h1"),s=document.createElement("span"),i=document.createElement("span"),n=document.createElement("span"),r=document.createElement("span"),a=document.createElement("span"),l=document.createElement("span"),h=document.createElement("span"),d=document.createElement("h2");return this.message=document.createElement("span"),this.message.setAttribute("id","showMessage"),o(e,{width:"100%",height:"100%",gridRow:"1",fontStyle:"Courier",fontSize:"250%",textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}),o(d,{textAlign:"center"}),s.innerText="T",o(s,{color:"red"}),i.innerText="E",o(i,{color:"orange"}),n.innerText="T",o(n,{color:"yellow"}),r.innerText="R",o(r,{color:"lime"}),a.innerText="I",o(a,{color:"blue"}),l.innerText="S",o(l,{color:"magenta"}),h.innerText="  JS",o(h,{color:"yellow"}),this.message.innerText="GAME \nOVER",o(this.message,{color:"red",fontSize:"100%",display:"none"}),setInterval((()=>{"transparent"==this.message.style.color?this.message.style.color="red":this.message.style.color="transparent"}),500),s.append(i),i.append(n),n.append(r),r.append(a),a.append(l),l.append(h),t.appendChild(s),d.appendChild(this.message),e.appendChild(t),e.appendChild(d),e}createBody(){const e=document.createElement("div");return this.playButton=this.createPlayButton(),this.levelButton=this.createLevelButton(),this.restartButton=this.createRestartButton(),o(e,{width:"100%",height:"100%",gridRow:"2",display:"grid",gridTemplateRows:"50% 50%"}),e.appendChild(this.levelButton),e.appendChild(this.playButton),e.appendChild(this.restartButton),e}createFooter(){const e=document.createElement("div"),t=document.createElement("h3"),s=document.createElement("h3"),i=document.createElement("span"),n=document.createElement("span"),r=document.createElement("span"),a=document.createElement("span");return r.setAttribute("id","highScore"),a.setAttribute("id","highLevel"),i.innerText="TOP SCORE: ",n.innerText="TOP LEVEL: ",r.innerText=0,a.innerText=1,o(e,{width:"100%",height:"100%",gridRow:"3",fontStyle:"Courier",fontSize:"150%",textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",textAlign:"center"}),o(t,{paddingTop:"25%"}),o(i,{color:"red"}),o(n,{color:"orange"}),i.append(r),n.append(a),t.appendChild(i),s.appendChild(n),e.appendChild(t),e.appendChild(s),e}createPlayButton(){const t=document.createElement("button");return t.setAttribute("id","playButton"),t.addEventListener("click",this.handleClickStart),t.innerHTML=e,t.addEventListener("mousedown",(()=>{t.style.backgroundColor=t.innerHTML==e?"lime":"red",t.style.boxShadow="0 5px #666",t.style.transform="translateY(4px)"})),t.addEventListener("mouseup",(()=>{t.style.backgroundColor=t.innerHTML==e?"lime":"red",t.style.boxShadow="0 9px #999",t.style.transform="translateY(-4px)"})),t.addEventListener("mouseover",(()=>{t.style.backgroundColor=t.innerHTML==e?"lime":"red"})),t.addEventListener("mouseout",(()=>{t.style.backgroundColor=t.innerHTML==e?"limegreen":"#FF3333"})),this.styleGreenButton(t),t}createLevelButton(){const e=document.createElement("button");return e.setAttribute("id","levelButton"),e.addEventListener("click",this.levelChoice),e.innerHTML="LEVEL: 1",e.addEventListener("mousedown",(()=>{e.style.backgroundColor="#e4e4e4",e.style.boxShadow="0 5px #666",e.style.transform="translateY(4px)"})),e.addEventListener("mouseup",(()=>{e.style.backgroundColor="#e4e4e4",e.style.boxShadow="0 9px #999",e.style.transform="translateY(-4px)"})),e.addEventListener("mouseover",(()=>{e.style.backgroundColor="#e4e4e4"})),e.addEventListener("mouseout",(()=>{e.style.backgroundColor="white"})),o(e,{width:"60%",height:"60%",gridRow:"2",margin:"20%",borderRadius:"10% 10% 10% 10% / 25% 25% 25% 25%",outline:"none",cursor:"pointer",border:"none",boxShadow:"0 9px #999",fontSize:"100%",textAlign:"center"}),e}createRestartButton(){const e=document.createElement("button");return e.setAttribute("id","restartButton"),e.addEventListener("click",this.handleClickRestart),e.innerHTML="START NEW GAME",e.addEventListener("mousedown",(()=>{e.style.backgroundColor="lime",e.style.boxShadow="0 5px #666",e.style.transform="translateY(4px)"})),e.addEventListener("mouseup",(()=>{e.style.backgroundColor="lime",e.style.boxShadow="0 9px #999",e.style.transform="translateY(-4px)"})),e.addEventListener("mouseover",(()=>{e.style.backgroundColor="lime"})),e.addEventListener("mouseout",(()=>{e.style.backgroundColor="limegreen"})),this.styleGreenButton(e),e.style.display="none",e}styleGreenButton(e){o(e,{width:"80%",height:"80%",gridRow:"1",margin:"10%",backgroundColor:"limegreen",cursor:"pointer",outline:"none",borderRadius:"10% 10% 10% 10% / 25% 25% 25% 25%",border:"none",boxShadow:"0 9px #999",fontSize:"100%",textAlign:"center"})}selectLevel(){switch(this.levelButton.innerHTML){case"LEVEL: 1":this.levelButton.innerHTML="LEVEL: 5";break;case"LEVEL: 5":this.levelButton.innerHTML="LEVEL: 10";break;case"LEVEL: 10":this.levelButton.innerHTML="LEVEL: 15";break;case"LEVEL: 15":this.levelButton.innerHTML="LEVEL: 20";break;case"LEVEL: 20":this.levelButton.innerHTML="LEVEL: 25";break;case"LEVEL: 25":this.levelButton.innerHTML="LEVEL: 1"}}clickStop(){this.playButton.removeEventListener("click",this.handleClickStop),this.playButton.innerHTML=e,this.playButton.addEventListener("click",this.handleClickStart),this.levelButton.removeAttribute("disabled"),document.getElementById("main").dispatchEvent(new CustomEvent("stop"))}clickStart(){const e=this.levelButton.innerHTML.split(" ")[1];this.playButton.removeEventListener("click",this.handleClickStart),this.playButton.innerHTML="PAUSE",this.playButton.addEventListener("click",this.handleClickStop),this.levelButton.setAttribute("disabled",!0),document.getElementById("main").dispatchEvent(new CustomEvent("start",{detail:e}))}clickRestart(){this.restartButton.style.display="none",this.message.style.display="none",this.playButton.style.display="block",this.playButton.removeEventListener("click",this.handleClickStop),this.playButton.addEventListener("click",this.handleClickStart),this.playButton.innerHTML=e,this.styleGreenButton(this.playButton),this.levelButton.removeAttribute("disabled"),this.levelButton.style.display="block",document.getElementById("main").dispatchEvent(new CustomEvent("restart"))}}class h{constructor(e,t){this.elements=[],this.reset(e,t)}transpose(){for(let e=0;e<4;e++)for(let t=0;t<e;t++){let s=this.getValue(e,t);this.setValue(this.getValue(t,e),e,t),this.setValue(s,t,e)}for(let e=0;e<4;e++)this.elements[e].reverse()}setValue(e,t,s){this.elements[s][t]=e}getValue(e,t){return this.elements[t][e]}reset(e,t){for(;t-- >0;)this.elements.push(new Array(e).fill(0))}iterate(e){this.elements.forEach(((t,s)=>{t.forEach(((t,i)=>{e(t,i,s)}))}))}deleteRows(){let e=[];this.elements.length,this.elements.forEach(((t,s)=>{t.every((e=>0!==e))&&e.push(s)})),e.forEach((e=>{this.elements.splice(e,1)}));for(let t=0;t<e.length;t++)this.elements.unshift(new Array(this.elements[0].length).fill(0));return e.length}print(){console.table(this.elements)}}class d{constructor(e,t,s){this.width=e,this.height=t,this.controller=s,this.elements=new h(e,t)}collide(e){return!!e.isBottom(this.height)||!!this.elementCollide(e)}elementCollide(e){let t=!1;return e.getElements().forEach((({value:e,x:s,y:i})=>{0!==this.elements.getValue(s,i)&&(t=!0)})),t}merge(e){e.getElements().forEach((e=>{const{value:t,x:s,y:i}=e;this.elements.setValue(t,s,i)}))}draw(e){this.elements.iterate(((i,r,o)=>{0!==i&&(e.fillStyle=n[i],e.fillRect(r,o,1,1),e.fillStyle=t,e.fillRect(r,o,s,1),e.fillRect(r,o,1,s))}))}deleteRows(){const e=this.elements.deleteRows();this.controller.points+=e*this.controller.level*100,this.controller.increaseLevel(e)}}class c{constructor(e){this.matrix=new h(4,4),this.tetrisType=e,i[e].forEach((({x:t,y:s})=>{this.matrix.setValue(e,t,s)})),this.color=n[e],this.position={x:2==e||4==e||7==e?3:4,y:0}}rotate(){3!==this.tetrisType&&this.matrix.transpose()}checkAfterRotate(e){let t=!1;return this.matrix.iterate(((s,i,n)=>{let r=this.position.x+i;if(0!==s)return r<0?this.position.x++:r>=e&&this.position.x--,void(t=!0)})),t}output(e){this.matrix.iterate(((i,n,r)=>{0!==i&&(e.fillStyle=this.color,e.fillRect(n+this.position.x,r+this.position.y,1,1),e.fillStyle=t,e.fillRect(n+this.position.x,r+this.position.y,s,1),e.fillRect(n+this.position.x,r+this.position.y,1,s))}))}isEdge(e){let t=!1;return this.matrix.iterate(((s,i,n)=>{let r=this.position.x+i;0!==s&&(r<0||r>=e)&&(t=!0)})),t}isBottom(e){let t=!1;return this.matrix.iterate(((s,i,n)=>{0!==s&&this.position.y+n>=e&&(t=!0)})),t}getElements(){let e=[];return this.matrix.iterate(((t,s,i)=>{0!==t&&e.push({value:t,x:s+this.position.x,y:i+this.position.y})})),e}}class u{constructor(){this.points=0,this.lines=0,this.currentTetris=null,this.board=null,this.sound=new Audio("/src/resources/audio/lines.mp3"),this.genNextTetris()}get level(){return this._level}set level(e){this._level=e}get startLevel(){return this._startLevel}set startLevel(e){this._startLevel=e}generateTetris(){return this.currentTetris=this.nextTetris,this.genNextTetris(),new c(this.currentTetris)}genNextTetris(){this.nextTetris=function(e=1,t=7){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}()}increaseLevel(e){e&&(this.sound.play(),this.lines+=e,this.level=Number(this.startLevel)+Math.floor((this.lines+3)/3))}}class p{constructor(){this.inputListener=e=>this.inputController(e),this.element=this.initScreen(),this.controller=new u,this.board=new d(this.screenWidth/this.scale,this.screenHeight/this.scale,this.controller),this.tetris=this.controller.generateTetris(),this.times=this.resetTimes(1500),this.sounds=this.loadSounds()}get context(){return this._context}set context(e){this._context=e}get screenWidth(){return this._screenWidth}set screenWidth(e){this._screenWidth=e}get screenHeight(){return this._screenHeight}set screenHeight(e){this._screenHeight=e}get refreshId(){return this._refreshId}set refreshId(e){this._refreshId=e}get isGameOver(){return this._isGameOver}set isGameOver(e){this._isGameOver=e}get scale(){return this._scale}set scale(e){this._scale=e}get isPause(){return this._isPause}set isPause(e){this._isPause=e}initScreen(){const e=this.createArticle(),t=this.createLeftContainer(),s=this.createCenterContainer(),i=this.createRightContainer();return e.appendChild(t),e.appendChild(s),e.appendChild(i),e}createArticle(){const e=document.createElement("article");return e.setAttribute("id","main-content"),a(e,["top","bottom","right"]),e.style.left="20%",o(e,{margin:"2%",textAlign:"center",display:"inline-grid",gridTemplateColumns:"33% 34% 33%",gridColumnStart:"1",gridColumnEnd:"3"}),e}createLeftContainer(){const e=this.createContainer("","1"),t=this.createContentContainer("red","1","POINTS","showPoints"),s=this.createContentContainer("orange","2","LEVEL","showLevel");return e.appendChild(t),e.appendChild(s),e}createCenterContainer(){const e=this.createContainer("","2"),t=this.createCanvas();return e.appendChild(t),e}createRightContainer(){const e=this.createContainer("","3"),t=this.createContentContainer("yellow","1","NEXT","showNext"),s=this.createContentContainer("lime","2","LINES","showLines");return e.appendChild(t),e.appendChild(s),e}createCanvas(){const e=3==window.outerHeight?1:2,t=Number(window.outerHeight.toString().substring(0,e))-2;this.scale=r[t].scale;const s=document.createElement("canvas");return s.setAttribute("id","screen"),s.setAttribute("width",`${r[t].width}px`),s.setAttribute("height",`${r[t].height}px`),a(s,["bottom","left","right"]),o(s,{display:"block",margin:"0 auto",borderRight:"1.5px solid grey",borderBottom:"1.5px solid grey"}),this.initContext(s),s}createContainer(e,t){const s=document.createElement("div");return o(s,{gridColumn:t,backgroundColor:e,display:"grid",gridTemplateRows:"50% 50%"}),s}createContentContainer(e,t,s,i){const n=document.createElement("div");n.innerText=s,o(n,{width:"60%",height:"60%",gridRow:t,backgroundColor:"grey",margin:"18%",color:e,fontStyle:"Courier",fontSize:"250%",borderRadius:"30% 30% 30% 30% / 25% 25% 25% 25%",border:"5px solid black",textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"});const r=document.createElement("div");if(o(r,{width:"60%",backgroundColor:"#4f4f4f",margin:"20%",color:"white",fontStyle:"Courier",fontSize:"100%",borderRadius:"10% 10% 10% 10% / 25% 25% 25% 25%",border:"3px solid black",textShadow:"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}),"showNext"!==i)r.setAttribute("id",i),r.innerText=0;else{const e=document.createElement("canvas");e.setAttribute("id",i),e.setAttribute("width","100%"),e.setAttribute("height","100%"),e.addEventListener("nextTetris",this.showNextTetris);const t=e.getContext("2d");o(e,{display:"block",margin:"0 auto",padding:"10%"}),t.scale(e.width/6,e.height/6),this.setGameBoard(t,6,6),r.appendChild(e)}return n.appendChild(r),n}initContext(e){const t=e.getContext("2d");t.scale(this.scale,this.scale),this.screenWidth=e.width,this.screenHeight=e.height,this.context=t,this.setGameBoard(this.context,this.screenWidth/this.scale,this.screenHeight/this.scale)}setGameBoard(e,i,n){for(let r=0;r<i;r++)for(let i=0;i<n;i++)e.fillStyle=t,e.fillRect(r,i,1,1),e.fillStyle="grey",e.fillRect(r,i,s,1),e.fillRect(r,i,1,s)}setLevel(e){this.controller.startLevel=e,this.controller.level=e}setDifficulty(){this.times.interval=1500/this.controller.level}resetTimes(e){return{lastTime:0,lastDt:0,interval:e}}drop(){this.tetris.position.y++,this.controller.points++,this.board.collide(this.tetris)&&this.merge(),this.times.lastDt=0,this.updateInfo()}merge(){this.tetris.position.y--,this.tetris.position.y?(this.sounds.bottom.play(),this.board.merge(this.tetris),this.tetris=this.startNewTetris(),this.setDifficulty(),this.updateNextTetris()):this.gameOver()}update(e=0){this.isGameOver||(this.times.lastDt+=e-this.times.lastTime,this.times.lastDt>this.times.interval&&this.drop(),this.setGameBoard(this.context,this.screenWidth/this.scale,this.screenHeight/this.scale),this.tetris.output(this.context),this.board.draw(this.context),this.times.lastTime=e,this.startGraphicRefresh())}startGraphicRefresh(){this.refreshId=window.requestAnimationFrame((e=>this.update(e)))}stopGraphicRefresh(){this.refreshId&&(window.cancelAnimationFrame(this.refreshId),this.refreshId=void 0)}inputController(e){const{key:t}=e;if(this.isPause)"Escape"===t&&this.startGame();else{let e=0;switch(t){case"Escape":this.stopGame();break;case"ArrowLeft":e=-1;break;case"ArrowRight":e=1;break;case"ArrowDown":this.drop();break;case"ArrowUp":this.tetris.rotate(),this.tetris.isEdge(this.screenWidth/this.scale)&&this.tetris.checkAfterRotate(this.screenWidth/this.scale),this.board.collide(this.tetris)&&this.merge()}this.tetris.position.x+=e,0!=e&&(this.tetris.isEdge(this.screenWidth/this.scale)||this.board.elementCollide(this.tetris))&&(this.tetris.position.x-=e)}}startGame(){window.addEventListener("keydown",this.inputListener),this.isPause=!1,this.removeLevelButton(),this.setDifficulty(),this.updateLevel(),this.updateNextTetris(),this.update(),this.sounds.soundtrack.play()}stopGame(){this.isPause=!0,this.sounds.soundtrack.pause(),this.stopGraphicRefresh()}startNewTetris(){return this.board.deleteRows(),this.controller.generateTetris()}gameOver(){console.log("GAME OVER"),this.isGameOver=!0,this.sounds.soundtrack.pause(),this.sounds.gameOver.play(),document.getElementById("main").dispatchEvent(new CustomEvent("stop"))}updateInfo(){this.updateLevel(),this.updateLines(),this.updatePoints()}updateLevel(){document.getElementById("showLevel").innerText=this.controller.level}updatePoints(){document.getElementById("showPoints").innerText=this.controller.points}updateLines(){document.getElementById("showLines").innerText=this.controller.lines}updateNextTetris(){const e=this.controller.nextTetris,t=new c(e),s=document.getElementById("showNext").getContext("2d");this.setGameBoard(s,6,6),t.position.x=2==e||4==e||7==e?1:2,t.position.y=2,t.output(s)}removeLevelButton(){document.getElementById("levelButton").style.display="none"}loadSounds(){const e=new Audio("/src/resources/audio/soundtrack.mp3"),t=new Audio("/src/resources/audio/gameover.mp3"),s=new Audio("/src/resources/audio/bottom.mp3");return e.loop=!0,e.volume=.15,{soundtrack:e,gameOver:t,bottom:s}}}class m{constructor(){this.start=e=>this.startGame(e),this.stop=()=>this.stopGame(),this.restart=()=>this.restartGame(),this.score=0,this.level=1,this.initGame()}get gameManager(){return this._gameManager}set gameManager(e){this._gameManager=e}get sidebar(){return this._sidebar}set sidebar(e){this._sidebar=e}get appContainer(){return this._appContainer}set appContainer(e){this._appContainer=e}initGame(){this.appContainer=this.createContainer(),this.sidebar=new l,this.gameManager=new p,this.appContainer.appendChild(this.sidebar.element),this.appContainer.appendChild(this.gameManager.element),document.body.appendChild(this.appContainer)}createContainer(){const e=document.createElement("main");return e.setAttribute("id","main"),e.addEventListener("start",this.start),e.addEventListener("stop",this.stop),e.addEventListener("restart",this.restart),a(e,["top","bottom","left","right"]),o(document.body,{position:"relative",width:"100vw",height:"100vh",margin:0}),document.body.style.position="relative",e}startGame(e){this.gameManager.isPause||this.gameManager.setLevel(e.detail),this.gameManager.startGame()}stopGame(){this.gameManager.stopGame(),this.gameManager.isGameOver&&(this.gameManager.controller.points>this.score&&(this.score=this.gameManager.controller.points,document.getElementById("highScore").innerText=this.score),this.gameManager.controller.level>this.level&&(this.level=this.gameManager.controller.level,document.getElementById("highLevel").innerText=this.level),document.getElementById("playButton").style.display="none",document.getElementById("restartButton").style.display="block",document.getElementById("showMessage").style.display="block")}restartGame(){this.appContainer.removeChild(this.gameManager.element),this.gameManager=new p,this.appContainer.appendChild(this.gameManager.element)}}console.log("START TETRIS"),window.addEventListener("load",(()=>{new m}))})();