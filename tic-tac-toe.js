
document.addEventListener("DOMContentLoaded", function () {

    
    const board = document.getElementById("board");
    const squares = board.querySelectorAll("div");
    const status = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");

    let currentPlayer = "X";
    let gameOver = false;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const originalMessage =
        "Move your mouse over a square and click to play an X or an O.";


    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    squares.forEach(function (square) {
        square.classList.add("square");
    });

    squares.forEach(function (square, index) {

        square.addEventListener("click", function () {

            if (gameOver) {
                return;
            }

            if (gameState[index] !== "") {
                return;
            }

            gameState[index] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            const hasWon = winningCombinations.some(function (combination) {
                return combination.every(function (position) {
                    return gameState[position] === currentPlayer;
                });
            });

            if (hasWon) {
                status.textContent =
                    "Congratulations! " + currentPlayer + " is the Winner!";
                status.classList.add("you-won");
                gameOver = true;
                return;
            }

            if (gameState.every(function (value) {
                return value !== "";
            })) {
                status.textContent = "It's a draw!";
                gameOver = true;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
        });

        square.addEventListener("mouseenter", function () {
            if (!gameOver && gameState[index] === "") {
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseleave", function () {
            square.classList.remove("hover");
        });
    });

    newGameButton.addEventListener("click", function () {

        gameState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameOver = false;

        squares.forEach(function (square) {
            square.textContent = "";
            square.classList.remove("X", "O", "hover");
        });

        status.textContent = originalMessage;
        status.classList.remove("you-won");
    });

});
