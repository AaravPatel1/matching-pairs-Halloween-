document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const startButton = document.getElementById('start');
    const restartButton = document.getElementById('restart');
    const timerDisplay = document.getElementById('timer');
    
    // Halloween-related words or images
    const words = ['ghost', 'witch', 'bat', 'cat', 'pumpkin', 'skull', 'spider', 'moon', 'ghost', 'witch', 'bat', 'cat', 'pumpkin', 'skull', 'spider', 'moon'];
    let flippedCards = [];
    let matchedPairs = 0;
    let gameStarted = false;
    let startTime;
    let timerInterval;

    // Shuffle the cards
    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Create the board
    const createBoard = () => {
        shuffleArray(words);
        for (let i = 0; i < words.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = words[i];
            card.innerHTML = `<div class="front"></div><div class="back">${words[i]}</div>`;
            grid.appendChild(card);
        }
    };

    // Flip a card
    const flipCard = e => {
        if (!gameStarted) return; // Prevent flipping before the game starts
        const clickedCard = e.target.closest('.card');
        if (clickedCard && !clickedCard.classList.contains('flipped') && flippedCards.length < 2) {
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    };

    // Check for a match
    const checkForMatch = () => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.name === card2.dataset.name) {
            matchedPairs++;
            if (matchedPairs === words.length / 2) {
                clearInterval(timerInterval);
                const endTime = Date.now();
                const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
                setTimeout(() => alert(`Congratulations! You found all the pairs in ${timeTaken} seconds!`), 500);
                timerDisplay.textContent = `Time: ${timeTaken}s`;
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        flippedCards = [];
    };

    // Start the timer
    const startTimer = () => {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2);
            timerDisplay.textContent = `Time: ${elapsedTime}s`;
        }, 100);
    };

    // Restart the game
    const restartGame = () => {
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        clearInterval(timerInterval);
        timerDisplay.textContent = 'Time: 0s';
        createBoard();
    };

    // Start the game
    const startGame = () => {
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        gameStarted = true;
        startTimer();
        createBoard();
    };

    // Event listeners
    grid.addEventListener('click', flipCard);
    restartButton.addEventListener('click', restartGame);
    startButton.addEventListener('click', startGame);
});
