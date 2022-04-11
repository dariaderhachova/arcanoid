var gameArea = document.getElementById("game-area")
var menu = document.getElementById("menu")
var nick = document.getElementById("nick")
var yourScore = document.getElementById("your-score")
var highScore = document.getElementById("high-score")
var buttonRegister = document.getElementById("button-register")
var buttonPlay = document.getElementById("button-play")
var menuRegister = document.getElementById("menu-register")
var formRegister = document.getElementById("register")
var inputNick =document.getElementById("input-nick")
var inputPass1 =document.getElementById("input-password-1")
var inputPass2 =document.getElementById("input-password-2")
var gameOver = document.getElementById("game-over")
var finalYScore = document.getElementById("your-score-final")
var finalHScore = document.getElementById("high-score-final")

var leftArrow = false
var rightArrow = false
var space = false

var live1 = document.createElement("div")
var live2 = document.createElement("div")
var live3 = document.createElement("div")
var score1 = document.createElement("span")
var score2 = document.createElement("span")
var scoreYour = document.createElement("span")
var scoreHigh = document.createElement("span")

live1.className = "heart-1"
live2.className = "heart-1"
live3.className = "heart-1"
score1.className = "score"
score2.className = "score"
scoreYour.className = "score"
scoreHigh.className = "score"






document.addEventListener("keydown", () => {
    switch(event.key){
        case "ArrowLeft":
            leftArrow = true
            break
        case "ArrowRight":
            rightArrow = true
            break
        case " " :
            space = true
            break
        default :
            return
    }
})
document.addEventListener("keyup", () => {
    switch(event.key){
        case "ArrowLeft":
            leftArrow = false
            break
        case "ArrowRight":
            rightArrow = false
            break
        case " " :
            space = false
            break
        default :
            return
    }
})
class Platform{
    speed = 10
    domObject = document.createElement("div")
    balloon
    constructor(speed, balloon){
        this.speed = speed
        this.domObject.id = "platform"
        this.balloon = balloon
    }
    addElement(){
        gameArea.appendChild(this.domObject)
        this.domObject.style.left = parseInt(gameArea.offsetLeft + gameArea.offsetWidth/2 - this.domObject.offsetWidth/2) + "px"
        this.domObject.style.top = parseInt(gameArea.offsetTop + gameArea.offsetHeight - this.domObject.offsetHeight - 20) + "px"
        this.balloon.domObject.style.left = parseInt(this.domObject.offsetLeft + this.domObject.offsetWidth/2 - this.balloon.domObject.offsetWidth/2) + "px"
        this.balloon.domObject.style.top = parseInt(this.domObject.offsetTop - this.balloon.domObject.offsetHeight) + "px"
        this.move()
    }
    move(){
        var interval = setInterval(() => {
            if(leftArrow){
                this.domObject.style.left = parseInt(this.domObject.offsetLeft - this.speed) + "px"   
                if(!this.balloon.isShot){
                    this.balloon.domObject.style.left = parseInt(this.balloon.domObject.offsetLeft - this.speed) + "px"
                }
            }
            if(rightArrow){
                this.domObject.style.left = parseInt(this.domObject.offsetLeft + this.speed) + "px"   
                if(!this.balloon.isShot){
                    this.balloon.domObject.style.left = parseInt(this.balloon.domObject.offsetLeft + this.speed) + "px"
                }
            }
            if(this.domObject.offsetLeft<gameArea.offsetLeft){
                this.domObject.style.left = parseInt(gameArea.offsetLeft) + "px"
                if(!this.balloon.isShot){
                    this.balloon.domObject.style.left = parseInt(this.domObject.offsetLeft + this.domObject.offsetWidth/2 - this.balloon.domObject.offsetWidth/2) + "px"
                }
            }//
            if((this.domObject.offsetLeft + this.domObject.offsetWidth)>(gameArea.offsetLeft+gameArea.offsetWidth)){
                this.domObject.style.left = parseInt(gameArea.offsetLeft + gameArea.offsetWidth - this.domObject.offsetWidth) + "px"
                if(!this.balloon.isShot){
                    this.balloon.domObject.style.left = parseInt(this.domObject.offsetLeft + this.domObject.offsetWidth/2 - this.balloon.domObject.offsetWidth/2) + "px"
                }
            }//
            if(space && !this.balloon.isShot){
                this.balloon.move()
            }
            if(((this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight)>=this.domObject.offsetTop)&&
            ((this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight)<=(this.domObject.offsetTop + Math.abs(this.balloon.speed)))&&
            (this.balloon.domObject.offsetLeft + this.balloon.domObject.offsetWidth > this.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetLeft < this.domObject.offsetLeft + this.domObject.offsetWidth)){
                this.balloon.yDirection = -this.balloon.speed
                this.balloon.domObject.style.top = (this.domObject.offsetTop - 1 - this.balloon.domObject.offsetHeight) + "px"
            }//столкновение с верхней границей платформы
            if((this.balloon.domObject.offsetLeft + this.balloon.domObject.offsetWidth >= this.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetLeft < this.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight > this.domObject.offsetTop)){
                this.balloon.xDirection = - this.balloon.speed
                this.balloon.domObject.style.left = (this.domObject.offsetLeft - 1 - this.balloon.domObject.offsetWidth) + "px"
            }//столкновение с левой границей платформы
            if((this.domObject.offsetLeft + this.domObject.offsetWidth >= this.balloon.domObject.offsetLeft)&&
            (this.domObject.offsetLeft < this.balloon.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight > this.domObject.offsetTop)){
                this.balloon.xDirection = this.balloon.speed
                this.balloon.domObject.style.left = (this.domObject.offsetLeft + this.domObject.offsetWidth + 1) + "px"
            }//столкновение с правой границей платформы
            if((this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight) >= (gameArea.offsetTop + gameArea.offsetHeight)){
                this.domObject.style.left = parseInt(gameArea.offsetLeft + gameArea.offsetWidth/2 - this.domObject.offsetWidth/2) + "px"
                this.balloon.domObject.style.left = parseInt(this.domObject.offsetLeft + this.domObject.offsetWidth/2 - this.balloon.domObject.offsetWidth/2) + "px"
                this.balloon.domObject.style.top = parseInt(this.domObject.offsetTop - this.balloon.domObject.offsetHeight) + "px"
                this.balloon.isShot = false
                clearInterval(this.balloon.ballInterval)
                
                this.balloon.numLives -= 1
                switch(this.balloon.numLives){
                    case 3:
                        live1.className = "heart-1"
                        live2.className = "heart-1"
                        live3.className = "heart-1"
                        break
                    case 2:
                        live1.className = "heart-1"
                        live2.className = "heart-1"
                        live3.className = "heart-2"
                        break
                    case 1:
                        live1.className = "heart-1"
                        live2.className = "heart-2"
                        live3.className = "heart-2"
                        break
                    default :
                        live1.className = "heart-2"
                        live2.className = "heart-2"
                        live3.className = "heart-2"
                        end();
                }
            }//нижняя граница поля
        }, 16)
    }
}
class Ball {
    speed = 1
    domObject = document.createElement("div")
    isShot = false
    xDirection 
    yDirection
    ballInterval
    numLives = 3
    constructor(speed){
        this.speed = speed
        this.domObject.id = "circle"
        this.xDirection = Math.random(1)
        this.yDirection = -this.speed
        this.xDirection = Math.round(this.xDirection)
        if(this.xDirection == 0){
            this.xDirection = -this.speed
        } else {
            this.xDirection = this.speed
        }
    }
    addElement(){
        gameArea.appendChild(this.domObject)

    }
    move(){
        this.isShot = true 
        
        this.ballInterval = setInterval(() => {
            this.domObject.style.left = (this.domObject.offsetLeft + this.xDirection) + "px";
            this.domObject.style.top =  (this.domObject.offsetTop + this.yDirection) + "px";
            
            if(this.domObject.offsetTop <= gameArea.offsetTop){
                this.yDirection = this.speed
                this.domObject.style.top = (gameArea.offsetTop + 1) + "px"
            }//верхняя граница поля
           
            if(this.domObject.offsetLeft <= gameArea.offsetLeft){
                this.xDirection = this.speed
                this.domObject.style.left = (gameArea.offsetLeft + 1) + "px"
            }//левая граница поля
            if((this.domObject.offsetLeft + this.domObject.offsetWidth) >= (gameArea.offsetLeft + gameArea.offsetWidth)){
                this.xDirection = -this.speed
                this.domObject.style.left  = ((gameArea.offsetLeft + gameArea.offsetWidth) - 1 - this.domObject.offsetWidth) + "px"
            }//правая граница поля
            
        }, 30)
    }
}
class Block {
    domObject = document.createElement("div")
    type
    balloon
    constructor(type, balloon){
        this.balloon = balloon
        if(type == 1){
            this.domObject.className = "block-1"
        }
        else{
            this.domObject.className = "block-2"
        }
        this.remove()
    }
    remove(){
        var interval = setInterval(() => {
            if((document.getElementsByClassName("block-1").length == 0)&&(document.getElementsByClassName("block-2").length == 0)){
                end("win");
            }
            if((this.domObject.offsetTop + this.domObject.offsetHeight >= this.balloon.domObject.offsetTop)&&
            (this.balloon.domObject.offsetLeft + this.balloon.domObject.offsetWidth >= this.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetLeft + this.balloon.domObject.offsetWidth <= this.domObject.offsetLeft + this.domObject.offsetWidth )){
                this.balloon.domObject.style.top = (this.domObject.offsetHeight + this.domObject.offsetTop + 1) + "px"
                this.balloon.yDirection = this.balloon.speed
                gameArea.removeChild(this.domObject)
                scoreYour.textContent = parseInt(scoreYour.textContent) + 100
                if(parseInt(scoreHigh.textContent) < parseInt(scoreYour.textContent)){
                    scoreHigh.textContent = parseInt(scoreYour.textContent)
                }
            }//шарик отскакивает от нижней границы блока
            if((this.balloon.domObject.offsetLeft + this.balloon.domObject.offsetWidth >= this.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetLeft < this.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight > this.domObject.offsetTop)&&
            (this.balloon.domObject.offsetTop < this.domObject.offsetTop + this.domObject.offsetHeight)){
                this.balloon.domObject.style.left = (this.domObject.offsetLeft - 1 - this.balloon.domObject.offsetWidth) + "px"
                this.balloon.xDirection = - this.balloon.speed
                gameArea.removeChild(this.domObject)
            }//столкновение с левой границей блока
            if((this.domObject.offsetLeft + this.domObject.offsetWidth >= this.balloon.domObject.offsetLeft)&&
            (this.domObject.offsetLeft < this.balloon.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight > this.domObject.offsetTop)&&
            (this.balloon.domObject.offsetTop < this.domObject.offsetTop + this.domObject.offsetHeight)){
                this.balloon.xDirection = this.balloon.speed
                this.balloon.domObject.style.left = (this.domObject.offsetLeft + this.domObject.offsetWidth + 1) + "px"
                gameArea.removeChild(this.domObject)
            }//столкновение с правой границей блока
            if(((this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight)>=this.domObject.offsetTop)&&
            ((this.balloon.domObject.offsetTop + this.balloon.domObject.offsetHeight)<=(this.domObject.offsetTop + Math.abs(this.balloon.speed)))&&
            (this.balloon.domObject.offsetLeft + this.balloon.domObject.offsetWidth/2 >= this.domObject.offsetLeft)&&
            (this.balloon.domObject.offsetLeft + this.balloon.domObject.offsetWidth/2 <= this.domObject.offsetLeft + this.domObject.offsetWidth )){
                this.balloon.yDirection = -this.balloon.speed
                this.balloon.domObject.style.top = (this.domObject.offsetTop - 1 - this.balloon.domObject.offsetHeight) + "px"
                gameArea.removeChild(this.domObject)
            }//столкновение с верхней границей блока
        }, 16)
    }
}
buttonRegister.addEventListener("click", () =>{
    menu.style.display = "none";
    menuRegister.style.display = "flex";
})
formRegister.addEventListener("submit",(e)=>{
    e.preventDefault();
    var valid = 0;
    if(!/^\w{2,10}$/.test(inputNick.value)){
        inputNick.style.border = "3px solid red";
        return;
    }else{
        inputNick.style.border = "3px solid green";
    }
    if(!/^\w{6,50}$/.test(inputPass1.value)){
        inputPass1.style.border = "3px solid red";
        return;
    }else{
        inputPass1.style.border = "3px solid green";
    }
    if(inputPass1.value != inputPass2.value){
        inputPass2.style.border = "3px solid red";
        return;
    }else{
        inputPass2.style.border = "3px solid green";
    }
    menuRegister.style.display = "none";
    menu.style.display = "flex";
    for(i=0;i<6;i++){
        document.getElementsByClassName("text-main")[i].style.opacity = 1;
    }
    nick.textContent = inputNick.value;
    yourScore.textContent = 0;
    highScore.textContent = 0;
    buttonPlay.style.cursor = "pointer";
    buttonPlay.style.opacity = 1;

})
buttonPlay.addEventListener("click", ()=>{
    start(highScore.textContent);
    
})
function start(hS){
    var maxId = setInterval(function () {});
    while (maxId--) {
        clearInterval(maxId);
    }
    menu.style.display = "none";
    gameOver.style.display = "none";
    gameArea.style.display = "flex";
    gameArea.innerHTML="";
   

    live1.style.top = (gameArea.offsetTop + gameArea.offsetHeight - live1.offsetHeight -gameArea.offsetHeight/4-95) + "px"
    live2.style.top = (gameArea.offsetTop + gameArea.offsetHeight - live2.offsetHeight -gameArea.offsetHeight/4-60) + "px"
    live3.style.top = (gameArea.offsetTop + gameArea.offsetHeight - live3.offsetHeight -gameArea.offsetHeight/4-25) + "px"
    live1.style.left = (gameArea.offsetLeft + 10) +"px"
    live2.style.left = (gameArea.offsetLeft + 10) +"px"
    live3.style.left = (gameArea.offsetLeft + 10) + "px"

    score1.style.top = (gameArea.offsetTop + gameArea.offsetHeight - score1.offsetHeight -gameArea.offsetHeight/6-20) + "px"
    score2.style.top = (gameArea.offsetTop + gameArea.offsetHeight - score2.offsetHeight -gameArea.offsetHeight/6-45) + "px"
    scoreYour.style.top = (gameArea.offsetTop + gameArea.offsetHeight - score1.offsetHeight -gameArea.offsetHeight/6-20) + "px"
    scoreHigh.style.top = (gameArea.offsetTop + gameArea.offsetHeight - score2.offsetHeight -gameArea.offsetHeight/6-45) + "px"
    score1.style.left = (gameArea.offsetLeft + 10) +"px"
    score2.style.left = (gameArea.offsetLeft + 10) +"px"
    scoreYour.style.left = (gameArea.offsetLeft + 94) +"px"
    scoreHigh.style.left = (gameArea.offsetLeft + 94) +"px"
    
    score1.textContent = "Your score: "
    score2.textContent = "High score: "
    scoreYour.textContent = "0"
    scoreHigh.textContent = parseInt(hS);

    gameArea.appendChild(live1)
    gameArea.appendChild(live2)
    gameArea.appendChild(live3)
    gameArea.appendChild(score1)
    gameArea.appendChild(score2)
    gameArea.appendChild(scoreYour)
    gameArea.appendChild(scoreHigh)
    var mainBall = new Ball(7)
    mainBall.addElement()
    var mainPlatform = new Platform(10, mainBall)
    mainPlatform.addElement()
    live1.className = "heart-1";
    live2.className = "heart-1";
    live3.className = "heart-1";
    for( i=1; i<9; i++){
        for( j=1; j<11; j++){
            if(j%2 == 0){
                if( i % 2 == 0 ){
                    var block = new Block(1, mainBall)
                }else {
                    var block = new Block(2, mainBall)
                }
            } else {
                if( i % 2 == 1 ){
                    var block = new Block(1, mainBall)
                }else{
                    var block = new Block(2, mainBall)
                }
            }
            gameArea.appendChild(block.domObject)
            block.domObject.style.left = (block.domObject.offsetWidth  * (j-1) + gameArea.offsetLeft + j*9) + "px"
            if(j == 1){
                block.domObject.style.left = (gameArea.offsetLeft + 9) + "px";
            }
            block.domObject.style.top = (block.domObject.offsetHeight * (i) +gameArea.offsetTop + i*5) + "px"
            if(i == 1){
                block.domObject.style.top = (gameArea.offsetTop + 25) + "px"
            }
        }
    }
}
function end(w){
    var maxId = setInterval(function () {});
    while (maxId--) {
        clearInterval(maxId);
    }
    gameOver.style.display = "flex";
    if(w == "win"){
        document.getElementById("game-over-pic").src = "img/youWin.png"
        document.getElementById("game-over-pic").style.width = "300px";
        document.getElementById("game-over-pic").style.height = "240px";
        document.getElementById("game-over-pic").style.marginTop = "3%";
    }else{
        document.getElementById("game-over-pic").src = "img/gameOver.png"
        document.getElementById("game-over-pic").style.width = "800px";
        document.getElementById("game-over-pic").style.height = "180px";
        document.getElementById("game-over-pic").style.marginTop = "7%";
    }
    finalHScore.textContent = scoreHigh.textContent ;
    finalYScore.textContent = scoreYour.textContent ;
    var playAgain = document.getElementById("play-again");
    var backToMain = document.getElementById("back");
    playAgain.addEventListener("click", ()=>{
        start(scoreHigh.textContent);
    })
    backToMain.addEventListener("click",()=>{
        gameOver.style.display = "none";
        gameArea.style.display = "none";
        menu.style.display = "flex";
        highScore.textContent = finalHScore.textContent;
        yourScore.textContent = finalYScore.textContent;
    })
}



