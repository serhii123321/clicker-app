const game = document.getElementById('game');
const gridSize = 12;
const cells = [];
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: -1 };
let interval;
let score = 0;
let gameStarted = false;
let currentSpeed = 200;
let defaultSpeed = 200;
let selectedSpeed = 200;
let selectedDifficultyName = 'MID';

const vagon4ikparavozika = [
  'mgebratok1.jpg',
  'mgebratok2.jpg',
  'mgebratok3.jpg',
  'mgebratok4.jpg'
];

function saveScore(score) {
  localStorage.setItem('snakeScore', score);
}

function loadScore() {
  const saved = localStorage.getItem('snakeScore');
  if (saved !== null) {
    score = parseInt(saved, 10);
    document.getElementById('score').textContent = score;
  }
}

loadScore();

const normalMusic = document.getElementById('bg-music');
const sosynokMusic = document.getElementById('sosynok-music');
const btnMusic = document.getElementById('toggle-music');

btnMusic.addEventListener('click', () => {
  if (normalMusic.paused && sosynokMusic.paused) {
    normalMusic.play();
    btnMusic.textContent = 'Music On';
  } else if (!normalMusic.paused) {
    normalMusic.pause();
    btnMusic.textContent = 'Music Off';
  } else if (!sosynokMusic.paused) {
    sosynokMusic.pause();
    btnMusic.textContent = 'Music Off';
  }
});

function createGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      game.appendChild(cell);
      cells.push(cell);
    }
  }
}

function draw() {
  cells.forEach(cell => {
    cell.className = 'cell';
    cell.style.backgroundImage = '';
  });

  const foodIndex = food.y * gridSize + food.x;
  cells[foodIndex].classList.add('food');

  snake.forEach((part, i) => {
    const index = part.y * gridSize + part.x;
    if (index >= 0 && index < cells.length) {
      cells[index].classList.add('snake');
      let imageUrl = '';
      if (i === 0) {
        imageUrl = 'mgebratokbiletnaparavozik.jpg';
      } else {
        const imageIndex = (i - 1) % vagon4ikparavozika.length;
        imageUrl = vagon4ikparavozika[imageIndex];
      }
      cells[index].style.backgroundImage = `url('${imageUrl}')`;
    }
  });
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 || head.x >= gridSize ||
    head.y < 0 || head.y >= gridSize ||
    snake.some(part => part.x === head.x && part.y === head.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = score;
    saveScore(score);
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function placeFood() {
  let valid = false;
  while (!valid) {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    valid = !snake.some(part => part.x === food.x && part.y === food.y);
  }
}

function changeDirection(e) {
  if (!gameStarted) return;
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

function setGameSpeed(speed, name) {
  currentSpeed = speed;
  document.getElementById('current-difficulty').textContent = name;
  if (gameStarted) {
    clearInterval(interval);
    interval = setInterval(update, currentSpeed);
  }
}

document.querySelectorAll('.difficulty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const speed = parseInt(btn.getAttribute('data-speed'), 10);
    const name = btn.getAttribute('data-name');
    selectedSpeed = speed;
    selectedDifficultyName = name;
    defaultSpeed = speed;
    setGameSpeed(speed, name);
  });
});

function resetGame() {
  clearInterval(interval);
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: -1 };
  score = 0;
  document.getElementById('score').textContent = score;
  placeFood();
  draw();
}

const startButton = document.getElementById('start-game');
const gameContainer = document.getElementById('game-container');
const retryButton = document.getElementById('retry-game');

startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  retryButton.style.display = 'none';
  gameContainer.style.display = 'flex';
  resetGame();
  interval = setInterval(update, currentSpeed);
  gameStarted = true;
});

function gameOver() {
  clearInterval(interval);
  gameStarted = false;
  document.getElementById('container').style.display = 'none';
  retryButton.style.display = 'inline-block';
  startButton.disabled = false;
}

retryButton.addEventListener('click', () => {
  retryButton.style.display = 'none';
  document.getElementById('container').style.display = 'flex';
  resetGame();
  interval = setInterval(update, currentSpeed);
  gameStarted = true;
  startButton.disabled = true;
});

document.addEventListener('keydown', changeDirection);

createGrid();
draw();
setGameSpeed(selectedSpeed, selectedDifficultyName);
startButton.setAttribute('draggable', 'false');
startButton.addEventListener('dragstart', e => e.preventDefault());

const gameElement = document.getElementById('game');
const toggleSosynokBtn = document.getElementById('toggle-sosynok');
const bgVideo = document.getElementById('bg-video');
const source = bgVideo.querySelector('source');

toggleSosynokBtn.addEventListener('click', () => {
  const isSosynok = gameElement.classList.toggle('sosynok-mode');
  document.body.classList.toggle('sosynok-mode', isSosynok);
  toggleSosynokBtn.textContent = isSosynok ? 'ON' : 'OFF';

  if (isSosynok) {
    setGameSpeed(1000, 'SOSYNOK');
    normalMusic.pause();
    sosynokMusic.currentTime = 0;
    sosynokMusic.play();
    source.src = 'sosynok-bg.mp4';
  } else {
    setGameSpeed(selectedSpeed, selectedDifficultyName);
    sosynokMusic.pause();
    normalMusic.play();
    source.src = 'normal-bg.mp4';
  }

  bgVideo.load();
  bgVideo.play();
});
