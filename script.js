(function(){
    var playerX = {
        text: "X",
        score: []
    }

    var playerO = {
        text: "O",
        score: []
    }

    var currentPlayer = playerX;

    var container = document.getElementsByClassName("container")[0];
    var childrens = container.children;

    var btnRestart = document.getElementById("btnRestart");

    function init(){
        btnRestart.addEventListener("click", restartGame);

        currentPlayer = playerX;

        for(let box of childrens){
            box.className = "box";
            for(let textbox of box.children){
                textbox.remove();
            }
            box.addEventListener("click", clickBoard)
        }
    }

    function resetScorePlayer(){
        playerX.score = [];
        playerO.score = [];
    }

    function clickBoard(event){
        writeBoard(this);
        addScore(this.dataset.value);
        changePlayer();

        removeClickListener(this, clickBoard);
    }

    function writeBoard(box){
        var text = document.createElement("span");
        text.classList.add("text-value");
        text.textContent = currentPlayer.text;

        box.append(text);
    }

    function addScore(value){
        currentPlayer.score.push(value);
    }

    function checkWinner(){
        
    }

    function changePlayer(){
        currentPlayer = currentPlayer == playerX ? playerO : playerX;
    }

    function removeClickListener(box, handler){
        box.removeEventListener("click", handler);
    }

    function restartGame(event){
        init();
    }

    init();

})()