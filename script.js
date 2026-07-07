// Globális változók a játék állapotának tárolására
const BOARD_SIZE = 5;
let board = [];
let gameActive = true;

// DOM elemek lekérése
const boardContainer = document.getElementById('board');
const messageElement = document.getElementById('game-message');
const resetBtn = document.getElementById('reset-btn');

// Játék indítása az oldal betöltődésekor
initGame();

// Eseménykezelő a Reset gombhoz
resetBtn.addEventListener('click', initGame);

/**
 * Inicializálja a játékot: alaphelyzetbe állítja a táblát és legenerálja a DOM-ot
 */
function initGame() {
    gameActive = true;
    messageElement.textContent = "Good luck! Find the pattern.";
    messageElement.classList.remove('victory');
    
    // 1. Létrehozunk egy teljesen lekapcsolt (mindenhol 0) mátrixot
    board = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
    
    // 2. Összekeverjük a táblát 15 véletlenszerű kattintással
    shuffleBoard(15);
    
    // 3. Kirajzoljuk a felületet
    renderBoard();
}

/**
 * Szimulált kattintásokkal összekeveri a táblát, hogy garantáltan megoldható legyen
 */
function shuffleBoard(steps) {
    for (let i = 0; i < steps; i++) {
        const randomX = Math.floor(Math.random() * BOARD_SIZE);
        const randomY = Math.floor(Math.random() * BOARD_SIZE);
        // Fontos: itt közvetlenül a mátrixon változtatunk, nem a felületen
        toggleLights(randomX, randomY);
    }
    
    // Biztonsági játék: Ha a keverés végén véletlenül pont minden lámpa lekapcsolva maradt,
    // akkor keverünk rajta még egyet.
    if (checkVictory()) {
        shuffleBoard(steps);
    }
}

/**
 * Invertálja a megadott koordinátájú lámpát és a közvetlen szomszédait (Cross alakzat)
 */
function toggleLights(x, y) {
    // A mintázat koordinátai: [Közép, Fel, Le, Balra, Jobbra]
    const coordinates = [
        [x, y],
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ];

    coordinates.forEach(([cx, cy]) => {
        // Ellenőrizzük, hogy a koordináta a táblán belül van-e
        if (cx >= 0 && cx < BOARD_SIZE && cy >= 0 && cy < BOARD_SIZE) {
            // Bitmentes XOR (0-ból 1 lesz, 1-ből 0)
            board[cx][cy] ^= 1;
        }
    });
}

/**
 * Kiüríti a HTML konténert, majd újraépíti a 25 gombot a mátrix aktuális állapota alapján
 */
function renderBoard() {
    boardContainer.innerHTML = '';

    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            
            // Beállítjuk a CSS osztályt az állapot alapján (1 = on, 0 = off)
            cell.classList.add(board[x][y] === 1 ? 'on' : 'off');
            
            // Kattintás esemény a cellára
            cell.addEventListener('click', () => handleCellClick(x, y));
            
            boardContainer.appendChild(cell);
        }
    }
}

/**
 * Kezeli a játékos tényleges kattintását
 */
function handleCellClick(x, y) {
    if (!gameActive) return; // Ha már nyert, nem csinálunk semmit

    // Átváltjuk a lámpákat a logikában
    toggleLig
hts(x, y);
