(function(){
    var playerX = {
        text: "X",
        board: {}
    }

    var playerO = {
        text: "O",
        board: {}
    }

    var mapBoard = {};

    var currentPlayer = null;

    var board = document.getElementsByClassName("board")[0];
    var childrens = board.children;

    var btnRestart = document.getElementById("btnRestart");
    var elCurrentPlayer = document.getElementById("currentPlayer");

    function init(){
        board.style.pointerEvents = "auto";
        
        btnRestart.addEventListener("click", restartGame);

        resetBoardPlayer();
        changePlayer();

        for(let box of childrens){
            box.className = "box";
            var data = box.dataset;
            
            mapBoard[data.row] = (Array.isArray(mapBoard[data.row]) ? mapBoard[data.row] : []);
            mapBoard[data.row].push(data.col);
            for(let textbox of box.children){
                textbox.remove();
            }
            box.addEventListener("click", clickBoard)
        }
    }

    function resetBoardPlayer(){
        playerX.board = {};
        playerO.board = {};
    }

    function clickBoard(event){
        writeBoard(this);
        addBoard(this.dataset);

        removeClickListener(this, clickBoard);
    }

    function writeBoard(box){
        var text = document.createElement("span");
        text.classList.add("text-value");
        text.textContent = currentPlayer.text;

        box.append(text);
    }

    function addBoard(data){
        var row = data.row;
        var col = data.col;
        currentPlayer.board[row] = Array.isArray(currentPlayer.board[row]) ? currentPlayer.board[row] : [];
        currentPlayer.board[row].push(col);

        checkWinner();
    }

    function checkWinner(){
        var playerBoard = currentPlayer.board;
        var isWin = false;
        
        var totalRow = Object.keys(playerBoard).length;
        var boardWinning = {
            row: {},
            col: {},
            left: {},
            right: {}
        };

        for(const col of mapBoard[0]){

            var colWin = totalRow == Object.keys(mapBoard).length;
            var rowWin = false;

            boardWinning.col = {};

            for(const row in playerBoard){    
                //. Row Condition        
                if(playerBoard[row].length == mapBoard[row].length){
                    rowWin = true;
                    boardWinning.row[row] = playerBoard[row];
                    break;
                }

                //. Col Condition
                colWin = colWin && playerBoard[row].includes(col);
                if(colWin){
                    boardWinning.col[row] = [];
                    boardWinning.col[row].push(col);
                }
            }

            isWin = rowWin || colWin;
            if(rowWin) {
                boardWinning = boardWinning.row;
                break;
            };

            if(colWin) {
                boardWinning = boardWinning.col;
                break;
            };
        }

        //. Diagonal Condition
        if(totalRow == Object.keys(mapBoard).length){
            var leftWin = true;
            var rightWin = true;
            
            for(let i=0; i < totalRow; i++){
                var leftValue = i.toString();
                var rightValue = (totalRow - (i+1)).toString();
                leftWin = leftWin && playerBoard[i].includes(leftValue); //. Index Col == Row
                rightWin = rightWin && playerBoard[i].includes(rightValue);

                if(leftWin){
                    boardWinning.left[i] = leftValue;
                }

                if(rightWin){
                    boardWinning.right[i] = rightValue;
                }
            }

            if(leftWin){
                isWin = true;
                boardWinning = boardWinning.left;
            }

            if(rightWin){
                isWin = true;
                boardWinning = boardWinning.right;
            }
        }


        if(isWin){
            elCurrentPlayer.textContent = `PLAYER ${currentPlayer.text} IS WINNING`;
            board.style.pointerEvents = "none";
            changeBoardWinning(boardWinning);
            return;
        }
        
        changePlayer();
    }

    function changeBoardWinning(boardWinning){
        for(const box of childrens){
            var data = box.dataset;
            if(boardWinning[data.row] && boardWinning[data.row].includes(data.col)){
                box.classList.add("box-winner");
            }
        }
    }

    function changePlayer(){
        currentPlayer = currentPlayer == playerX ? playerO : playerX;
        elCurrentPlayer.textContent = `PLAYER ${currentPlayer.text} TURN`;
    }

    function removeClickListener(box, handler){
        box.removeEventListener("click", handler);
    }

    function restartGame(event){
        init();
    }

    init();

})()