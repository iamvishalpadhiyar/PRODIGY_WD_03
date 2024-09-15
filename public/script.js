let gameActive = true;
let xWins = 0;
let oWins = 0;
let isComputerOpponent = true;
let firstMoveMade = false;
let currentPlayer = 'X';

const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
const newbtn = document.querySelector("#new");
const game = document.querySelector('.game');
const turn = document.querySelector(".turn");
const boxes = document.querySelectorAll('.box');
const oCount = document.querySelector('#ocount');
const xCount = document.querySelector('#xcount');
const computerBtn = document.querySelector(".c-btn");
const playerBtn = document.querySelector(".u-btn");
const playerX = document.querySelector("#playerX");
const playerO = document.querySelector("#playerO");
const container = document.querySelector(".container");
const row = document.querySelector(".row");

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

start.addEventListener("click", () => {
    container.style.width = '90%';
    row.style.display = 'flex';
    reset.style.display = 'block';
    newbtn.style.display = 'block';
    start.style.display = 'none';
    game.style.display = 'grid';
    turn.style.display = 'flex';
    resetBoard();
    updateTurnIndicator();
});

newbtn.addEventListener("click", () => {
    if (firstMoveMade) {
        newbtn.style.backgroundColor = "rgb(204, 204, 204)";
        newbtn.style.border = "2px solid rgb(204, 204, 204)";
        firstMoveMade = false;
        resetBoard();
    }
});

computerBtn.addEventListener('click', () => {
    isComputerOpponent = true;
    computerBtn.classList.add('active');
    playerBtn.classList.remove('active');
    newbtn.click();
});

playerBtn.addEventListener('click', () => {
    isComputerOpponent = false;
    playerBtn.classList.add('active');
    computerBtn.classList.remove('active');
    newbtn.click();
});

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (!firstMoveMade) {
            firstMoveMade = true;
            newbtn.style.backgroundColor = "#008fbb";
            newbtn.style.border = "2px solid #008fbb";
        }
        if (box.textContent === '' && gameActive) {
            box.textContent = currentPlayer;
            if (checkWinner()) {
                endGame();
            } else if (isDraw()) {
                alert('Draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateTurnIndicator();

                if (isComputerOpponent && currentPlayer === 'O') {
                    setTimeout(computerMove, 500);
                }
            }
        }
    });
});

reset.addEventListener("click", () => {
    reset.style.display = 'none';
    newbtn.style.display = 'none';
    start.style.display = 'block';
    container.style.width = '40%';
    row.style.display = 'block';
    game.style.display = 'none';
    turn.style.display = 'none';
    xWins = 0;
    oWins = 0;
    xCount.textContent = xWins;
    oCount.textContent = oWins;
    newbtn.style.backgroundColor = "rgb(204, 204, 204)";
    newbtn.style.border = "2px solid rgb(204, 204, 204)";
    firstMoveMade = false;
    resetBoard();
});

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boxes[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...boxes].every(box => box.textContent !== '');
}

function resetBoard() {
    gameActive = true;
    currentPlayer = 'X';
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('X', 'O');
    });
    updateTurnIndicator();
}

function computerMove() {
    const emptyBoxes = [...boxes].filter(box => box.textContent === '');

    let move = findBestMove('O');
    if (move === null) {
        move = findBestMove('X');
    }
    if (move === null) {
        // Otherwise, pick a random box
        move = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    }

    move.textContent = currentPlayer;
    move.classList.add(currentPlayer);

    if (checkWinner()) {
        endGame();
    } else if (isDraw()) {
        alert('Draw!');
    } else {
        currentPlayer = 'X';
        updateTurnIndicator();
    }
}

function findBestMove(player) {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const values = [boxes[a].textContent, boxes[b].textContent, boxes[c].textContent];

        if (values.filter(value => value === player).length === 2 && values.includes('')) {
            return boxes[combination[values.indexOf('')]];
        }
    }
    return null;
}

function endGame() {
    gameActive = false;
    if (currentPlayer === 'X') {
        xWins++;
        xCount.textContent = xWins;
    } else {
        oWins++;
        oCount.textContent = oWins;
    }
    setTimeout(() => alert(`${currentPlayer} Wins!`), 100);
}

function updateTurnIndicator() {
    if (currentPlayer === 'X') {
        playerX.style.backgroundColor = "#d72638";
        playerO.style.backgroundColor = "transparent";
    } else {
        playerO.style.backgroundColor = "#d72638";
        playerX.style.backgroundColor = "transparent";
    }
}
