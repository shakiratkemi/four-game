let currentPlayer = ["red", "yellow"];
let playerIndex = 0;
const winnerElement = document.querySelector(".winner");
const resetButtonElement = document.querySelector(".reset");

function showCircles() {
  const boardElement = document.querySelector(".board");
  const rows = 6;
  const columns = 7;
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < columns; j++) {
      const circles = document.createElement("div");
      circles.classList.add("circle");
      circles.setAttribute("data-position", `${i}-${j}`);
      circles.addEventListener("click", handleCircleClicked);
      row.appendChild(circles);
    }
    boardElement.appendChild(row);
  }
}

function handleCircleClicked(event) {
  const position = event.target.getAttribute("data-position");
  event.target.style.backgroundColor = currentPlayer[playerIndex];
  switchPlayer();
  checkWinner();
}

function switchPlayer() {
  if (playerIndex === 0) {
    playerIndex = 1;
  } else {
    playerIndex = 0;
  }
}

function checkWinner() {
  const circles = document.querySelectorAll(".circle");
  const rows = 6;
  const columns = 7;

  function getCircleColor(position) {
    const circle = document.querySelector(
      `.circle[data-position="${position}"]`
    );
    if (circle) {
      return circle.style.backgroundColor;
    } else {
      return null;
    }
  }

  // Check Winner horizontally
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const color = getCircleColor(`${i}-${j}`);
      if (color) {
        if (
          j < columns &&
          color === getCircleColor(`${i}-${j + 1}`) &&
          color === getCircleColor(`${i}-${j + 2}`) &&
          color === getCircleColor(`${i}-${j + 3}`)
        ) {
          winnerElement.innerHTML = `${color} Wins`;
          console.log("Win", color);
        }

        // Check Winner Vertically
        if (
          i < rows &&
          color === getCircleColor(`${i + 1}-${j}`) &&
          color === getCircleColor(`${i + 2}-${j}`) &&
          color === getCircleColor(`${i + 3}-${j}`)
        ) {
          winnerElement.innerHTML = `${color} Wins`;
          console.log("win", color);
        }

        // Check Diagonally
        if (
          j < columns &&
          i < rows &&
          color === getCircleColor(`${i + 1}-${j + 1}`) &&
          color === getCircleColor(`${i + 2}-${j + 2}`) &&
          color === getCircleColor(`${i + 3}-${j + 3}`)
        ) {
          winnerElement.innerHTML = `${color} Wins`;
          console.log("win", color);
        }

        if (
          j < columns &&
          i < rows &&
          color === getCircleColor(`${i + 1}-${j - 1}`) &&
          color === getCircleColor(`${i + 2}-${j - 2}`) &&
          color === getCircleColor(`${i + 3}-${j - 3}`)
        ) {
          winnerElement.innerHTML = `${color} Wins`;
          console.log("win", color);
        }
      }
    }
  }
}
showCircles();

function resetGame() {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle) => {
    circle.style.backgroundColor = "";
  });
  winnerElement.innerHTML = "";
}

resetButtonElement.addEventListener("click", resetGame);
