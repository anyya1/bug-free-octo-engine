const games = [
    { title: 'Каркассон', players: 4, borrower: null },
    { title: 'Доббль', players: 6, borrower: 'Аня' },
    { title: 'Шахматы', players: 2, borrower: null }
];

const gameList = document.getElementById('gameList');
const gameSelect = document.getElementById('gameSelect');
const borrowerNameInput = document.getElementById('borrowerName');
const borrowButton = document.getElementById('borrowButton');
const returnButton = document.getElementById('returnButton');
const messageElement = document.getElementById('message');


function renderGames() {
    gameList.innerHTML = '';

    games.forEach((game, index) => {
        const li = document.createElement('li');

        let statusText = '';
        if (game.borrower === null) {
            statusText = 'Свободна';
        } else {
            statusText = `У ${game.borrower}`;
        }

        li.textContent = `${game.title} · ${game.players} игрока · ${statusText}`;
        gameList.appendChild(li);
    });
}

// Обработчик кнопки «Выдать»
borrowButton.addEventListener('click', () => {
    const name = borrowerNameInput.value.trim();
    const index = Number(gameSelect.value);
    const game = games[index];

    messageElement.textContent = '';

    // Проверка: имя не пустое
    if (!name) {
        messageElement.textContent = 'Введите имя';
        return;
    }

    // Проверка: игра свободна
    if (game.borrower !== null) {
        messageElement.textContent = 'Игра уже выдана';
        return;
    }

    // Выдача игры
    game.borrower = name;
    messageElement.textContent = 'Игра выдана';
    renderGames();
});

// Обработчик кнопки «Вернуть»
returnButton.addEventListener('click', () => {
    const index = Number(gameSelect.value);
    const game = games[index];

    messageElement.textContent = '';

    // Проверка: игра выдана
    if (game.borrower === null) {
        messageElement.textContent = 'Игра уже свободна';
        return;
    }

    // Возврат игры
    game.borrower = null;
    messageElement.textContent = 'Игра возвращена';
    renderGames();
});

// Первоначальная отрисовка
renderGames();