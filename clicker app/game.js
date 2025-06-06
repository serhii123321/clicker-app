let score = 0;
let idleClickers = 0;
let clickValue = 1;

const scoreDisplay = document.getElementById("score");
const clickButton = document.getElementById("klikkMeg");
const powerups = document.querySelectorAll("#powerups .powerup");

const gansSound = document.getElementById("gansSound");
const hornyJackSound = document.getElementById("hornyJackSound");
const wetWillySound = document.getElementById("wetWillySound");
const trainSound = document.getElementById("trainSound");

function updateScore() {
    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Сосунков в паравозике: ${score}`;

    if (score >= 1488) {
        triggerVictory();
    }
}

function triggerVictory() {
    
    if (document.getElementById('victoryMessage')) return;

    const victoryMessage = document.createElement('div');
    victoryMessage.id = 'victoryMessage';
    victoryMessage.style.position = 'fixed';
    victoryMessage.style.top = '50%';
    victoryMessage.style.left = '50%';
    victoryMessage.style.transform = 'translate(-50%, -50%)';
    victoryMessage.style.padding = '20px';
    victoryMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    victoryMessage.style.color = 'white';
    victoryMessage.style.textAlign = 'center';
    victoryMessage.style.borderRadius = '10px';
    victoryMessage.style.zIndex = '1000';

    const messageText = document.createElement('h2');
    messageText.textContent = 'Пасхалко 1488 джокер сигма про';

 
    const victoryVideo = document.createElement('video');
    victoryVideo.id = 'victoryVideo';
    victoryVideo.src = '432432432432432432.mp4';
    victoryVideo.style.width = '50%';
    victoryVideo.autoplay = true;
    victoryVideo.loop = false;
    victoryVideo.muted = false;
    victoryVideo.controls = false;
    victoryVideo.setAttribute('playsinline', '');

    victoryVideo.addEventListener('pause', () => {
        victoryVideo.play();
    });

    victoryVideo.addEventListener('click', (event) => {
        event.preventDefault();
        victoryVideo.play();
    });

 
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть(закроеш = ебаный фурилла жди паравозик)';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#4CAF50';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.borderRadius = '5px';
    closeButton.addEventListener('click', function() {
        victoryVideo.pause();
        victoryMessage.remove();

        setTimeout(() => {
            window.location.href = 'paravozik.html';
        }, 200);
    });

    victoryMessage.appendChild(messageText);
    victoryMessage.appendChild(victoryVideo);
    victoryMessage.appendChild(closeButton);

    document.body.appendChild(victoryMessage);

    setTimeout(() => {
        victoryVideo.play().catch(error => console.error('Ошибка воспроизведения:', error));
    }, 100);
}
clickButton.addEventListener("click", () => {
    score += clickValue;
    updateScore();
});

setInterval(() => {
    score += idleClickers;
    updateScore();
}, 1000);

powerups.forEach((powerup) => {
    const buyButton = powerup.querySelector(".kjop button");
    const priceElement = powerup.querySelector(".pris");
    const amountElement = powerup.querySelector(".antall");
    let price = parseInt(priceElement.textContent);
    let count = 0;

    buyButton.addEventListener("click", () => {
        if (score >= price) {
            score -= price;
            count++;
            const powerupName = powerup.querySelector(".navn").textContent;
            if (powerupName === "имбовый прицел") {
                clickValue += 1;
                gansSound.play();
            } else if (powerupName === "унизить фурри ето изи") {
                idleClickers += 1;
                hornyJackSound.play();
            } else if (powerupName === "Хорни Джек неконтрица") {
                clickValue += 2;
                wetWillySound.play();
            } else if (powerupName === "купить поровозик") {
                idleClickers += 5;
                trainSound.play();
            }

            price = Math.ceil(price * 1.5);
            priceElement.textContent = `${price}$`;
            amountElement.textContent = count;
            updateScore();
        }
    });
});

updateScore();
const musicToggleButton = document.getElementById("musicToggleButton");
const backgroundMusic = document.getElementById("backgroundMusic");

let isMusicPlaying = false;

function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggleButton.textContent = "Включить музыку";
    } else {
        backgroundMusic.play();
        musicToggleButton.textContent = "Выключить музыку";
    }
    isMusicPlaying = !isMusicPlaying;
}
musicToggleButton.addEventListener("click", toggleMusic);