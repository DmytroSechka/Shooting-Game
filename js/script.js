class Game {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.difficulty = 'easy';
        this.targetSpeed = 2000;
        this.targetInterval = null;

        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
    }

    cacheDOM() {
        this.gameContainer = document.getElementById('game-container');
        this.scoreDisplay = document.getElementById('score');
        this.livesDisplay = document.getElementById('lives');
        this.difficultySelect = document.getElementById('difficulty');
        this.startButton = document.getElementById('start-game');
        this.gameOverMessage = document.getElementById('game-over');
    }

    bindEvents() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.difficultySelect.addEventListener('change', (e) => this.setDifficulty(e.target.value));
    }

    setDifficulty(level) {
        this.difficulty = level;
        switch (level) {
            case 'easy':
                this.targetSpeed = 2000;
                break;
            case 'medium':
                this.targetSpeed = 1000;
                break;
            case 'hard':
                this.targetSpeed = 500;
                break;
        }
    }

    startGame() {
        this.resetGame();
        this.targetInterval = setInterval(() => this.spawnTarget(), this.targetSpeed);
    }

    resetGame() {
        this.score = 0;
        this.lives = 3;
        this.updateUI();
        this.clearTargets();
        this.gameOverMessage.style.display = 'none';
    }

    updateUI() {
        this.scoreDisplay.textContent = this.score;
        this.livesDisplay.textContent = this.lives;
    }

    clearTargets() {
        this.gameContainer.innerHTML = '';
    }

    spawnTarget() {
        const target = document.createElement('div');
        target.classList.add('target');
        target.classList.add('move');
        target.style.top = `${Math.random() * (this.gameContainer.clientHeight - 50)}px`;
        target.style.left = `${Math.random() * (this.gameContainer.clientWidth - 50)}px`;

        target.addEventListener('click', () => {
            this.score++;
            this.updateUI();
            this.createExplosion(target);
            target.remove();
        });

        this.gameContainer.appendChild(target);

        setTimeout(() => {
            if (this.gameContainer.contains(target)) {
                target.remove();
                this.lives--;
                this.updateUI();
                if (this.lives <= 0) this.endGame();
            }
        }, this.targetSpeed);
    }

    createExplosion(target) {
        const explosion = document.createElement('div');
        explosion.classList.add('explosion');
        explosion.style.top = `${target.offsetTop + 10}px`;
        explosion.style.left = `${target.offsetLeft + 10}px`;
        this.gameContainer.appendChild(explosion);

        setTimeout(() => {
            explosion.remove();
        }, 500); 
    }

    endGame() {
        clearInterval(this.targetInterval);
        this.gameOverMessage.style.display = 'block';
        setTimeout(() => {
            alert(`Game Over! Your score: ${this.score}`);
            this.resetGame();
        }, 1000);
    }
}

const game = new Game();