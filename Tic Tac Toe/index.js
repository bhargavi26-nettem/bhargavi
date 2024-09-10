const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const choiceDiv = document.getElementById('choice');
const chooseXButton = document.getElementById('chooseX');
const chooseOButton = document.getElementById('chooseO');

let currentPlayer = '';
let computerPlayer = '';
let gameActive = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin(player) {
    return winPatterns.some(pattern =>
        pattern.every(index => cells[index].textContent === player)
    );
}

function checkDraw() {
    return cells.every(cell => cell.textContent !== '');
}

function handleCellClick(event) {
    const cell = event.target;

    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        message.textContent = 'It\'s a Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = computerPlayer;
    setTimeout(computerPlay, 500);
}

function computerPlay() {
    const availableCells = cells.filter(cell => cell.textContent === '');
    if (availableCells.length === 0) return;

    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.textContent = computerPlayer;

    if (checkWin(computerPlayer)) {
        message.textContent = `${computerPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        message.textContent = 'It\'s a Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
}

function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    gameActive = true;
}

function startGame(playerChoice) {
    currentPlayer = playerChoice;
    computerPlayer = playerChoice === 'X' ? 'O' : 'X';
    gameActive = true;
    board.style.display = 'grid';
    restartButton.style.display = 'inline-block';
    choiceDiv.style.display = 'none';
}

chooseXButton.addEventListener('click', () => startGame('X'));
chooseOButton.addEventListener('click', () => startGame('O'));

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);

restartGame(); // Initialize the game
