import "./style.css";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
];

let timeCurrent = 1000;
// const piece = {
//   position: { x: 7, y: 1 },
//   shape: [
//     [1, 1],
//     [1, 1],
//   ],
// };

const PIECES = [
  // # Pieza cuadrada (O)
  [
    [1, 1],
    [1, 1],
  ],

  // # Pieza de línea recta (I)
  [[1], [1], [1], [1]],

  // # Pieza en forma de L (L)
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],

  // # Pieza en forma de J (J)
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],

  // # Pieza en forma de T (T)
  [
    [0, 1, 0],
    [1, 1, 1],
  ],

  // # Pieza en forma de S (S)
  [
    [0, 1, 1],
    [1, 1, 0],
  ],

  // # Pieza en forma de Z (Z)
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
];

const piece = {
  shape: PIECES[Math.floor(Math.random() * PIECES.length)],
  position: { x: 2, y: 0 },
};

let dropCounter = 0;
let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > timeCurrent) {
    piece.position.y++;
    dropCounter = 0;
    if (checkcollision()) {
      piece.position.y--;
      solidifypiece();
    }
  }
  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = "yellow";
        context.fillRect(x, y, 1, 1);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = "red";
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    piece.position.x--;
    if (checkcollision()) {
      piece.position.x++;
    }
  }

  if (event.key === "ArrowRight") {
    piece.position.x++;
    if (checkcollision()) {
      piece.position.x--;
    }
  }
  if (event.key === "ArrowDown") {
    piece.position.y++;
    if (checkcollision()) {
      piece.position.y--;
      solidifypiece();
      removeRows();
    }
  }
  if (event.key === "ArrowUp") {
    const rotated = [];
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }
      rotated.push(row);
    }
    piece.shape = rotated;
  }
});

function checkcollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}

function solidifypiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1;
      }
    });
  });

  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];
  piece.position.x = Math.floor(piece.shape.length * 2);
  piece.position.y = 0;

  if (checkcollision()) {
    window.alert("Game Over !!");
    board.forEach((row) => row.fill(0));
    timeCurrent = 1000;
  }
}

function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      rowsToRemove.push(y);
    }
  });
  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    const newRow = Array(BOARD_HEIGHT).fill(0);
    board.unshift(newRow);
    console.log(timeCurrent);
    timeCurrent >= 100 ? (timeCurrent = timeCurrent - 100) : (timeCurrent = 0);
  });
}

update();
