function makeBoard() {
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];
    console.log("new board made");

    function printBoard() {
        for (let row of board) {
            console.log(row.join("|"));
            console.log("-".repeat(5));
        }
    }
    function ResetBoard() {
        board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
        console.log("borad reset");
    }

    function selectcell(row, col, playersymbol) {
        if (board[row][col] == " ") {
            board[row][col] = playersymbol;
            //   console.log(board[row][col]);
            // printBoard();
            return true;
        } else {
            return false;
        }
    }
    return { board, printBoard, selectcell, ResetBoard };
}

function checkwin(board, player) {
    console.log(board.board);
    const newboard = board.board;
    // console.log(newboard);
    // board.printBoard();
    for (let row of newboard) {
        if (row.every((cell) => cell === player)) {
            console.log("row are true");
            return true;
        }
    }
    for (let col = 0; col < 3; col++) {
        if (newboard.every((row) => row[col] === player)) {
            console.log("cols are true");
            return true;
        }
    }
    if (
        newboard[0][0] === player &&
        newboard[1][1] === player &&
        newboard[2][2] === player
    ) {
        console.log("main Diognal is true");
        return true;
    }
    if (
        newboard[0][2] === player &&
        newboard[1][1] === player &&
        newboard[2][0] === player
    ) {
        console.log("2nd Diognal is true");
        return true;
    }
    return false;
}

function checkDraw(board) {
    return board.flat().every((cell) => cell !== " ");
}

function makeplayer(name, symbol) {
    let playerinput;
    let playersymbol = symbol;
    let playername = name;
    function setboard(x, y, board) {
        return board.selectcell(x, y, playersymbol);
    }

    return { playername, playersymbol, setboard };
}

function displaycontroller(board) {
    let playerXinput;
    let playerYinput;
    const cellslist = document.querySelectorAll(".cell");

    let player1 = makeplayer("Player X", "x");
    let player2 = makeplayer("Player O", "o");

    let turn = player1;

    const cellListeners = [];
    const gamestatus = document.querySelector(".gamestatus");
    const setCellListener = (cell, x, y) => {
        const listener = () => {
            playerXinput = x;
            playerYinput = y;

            if (turn.setboard(playerXinput, playerYinput, board)) {
                cell.textContent = turn.playersymbol;

                if (checkwin(board, turn.playersymbol)) {
                    const gamestatuselement = document.createElement("h1");
                    gamestatuselement.innerText = `${turn.playername} wins the game`;
                    gamestatus.appendChild(gamestatuselement);
                    console.log(`${turn.playername} wins the game`);
                    disableAllListeners();
                    return;
                }
                if (checkDraw(board.board)) {
                    const gamestatuselement = document.createElement("h1");
                    gamestatuselement.innerText = "It's a draw";
                    gamestatus.appendChild(gamestatuselement);
                    console.log("It's a draw!");
                    disableAllListeners();
                    return;
                }

                turn = turn === player1 ? player2 : player1;
            } else {
                console.log("Invalid input or already selected");
            }
        };

        cell.addEventListener("click", listener);
        cellListeners.push({ cell, listener }); // Store the cell and listener
    };

    // Assign listeners to each cell
    cellslist.forEach((cell) => {
        if (cell.classList.contains("cell1")) setCellListener(cell, 0, 0);
        else if (cell.classList.contains("cell2")) setCellListener(cell, 0, 1);
        else if (cell.classList.contains("cell3")) setCellListener(cell, 0, 2);
        else if (cell.classList.contains("cell4")) setCellListener(cell, 1, 0);
        else if (cell.classList.contains("cell5")) setCellListener(cell, 1, 1);
        else if (cell.classList.contains("cell6")) setCellListener(cell, 1, 2);
        else if (cell.classList.contains("cell7")) setCellListener(cell, 2, 0);
        else if (cell.classList.contains("cell8")) setCellListener(cell, 2, 1);
        else if (cell.classList.contains("cell9")) setCellListener(cell, 2, 2);
    });

    // Function to disable all listeners
    const disableAllListeners = () => {
        cellListeners.forEach(({ cell, listener }) => {
            cell.removeEventListener("click", listener);
        });
    };
}

function resetdisplay() {
    const cellslist = document.querySelectorAll(".cell");
    const gamestatus = document.querySelector(".gamestatus");
    gamestatus.innerText = '';

    cellslist.forEach((cell) => {
        cell.textContent = '';
    })
    // board.ResetBoard();
}

function playgame() {
    let board = makeBoard();
    const resetbtn = document.querySelector(".reset");
    const newgamebtn = document.querySelector(".newgame");

    const startGame = () => {
        board = makeBoard();
        displaycontroller(board);
    };

    startGame();

    resetbtn.addEventListener("click", () => {
        resetdisplay(board);
        console.log("reset");
        startGame();
    });

    newgamebtn.addEventListener("click", () => {
        resetdisplay(board);
        console.log("new game");
        startGame();
    });
}

playgame();
