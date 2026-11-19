const gameList = document.getElementById(`gameList`)
const gameSelect = document.getElementById(`gameSelect`)
const borrowerName = document.getElementById(`borrowerName`)
const borrowButton = document.getElementById(`borrowButton`)
const returnButton = document.getElementById(`returnButton`)

const onlyFree = document.getElementById('onlyFree');

const nameGame = document.getElementById('nameGame');
const numberPlayer = document.getElementById('numberPlayer');
const gameButton = document.getElementById('gameButton');

const games =[
    {title:`Каркассон`,players: 4 ,borrower:null }, 
    {title:`Доббль`,players: 6 ,borrower:`Аня` },
    {title:`Шахматы`,players: 2 ,borrower:null },
]

onlyFree.addEventListener('change', renderGames);

function renderGames(){
  gameList.innerHTML = '';

  let count = 0;

  games.forEach((game)=>{
      if (onlyFree.checked && game.borrower !== null) {
          return;
      }

      count++;

      const li = document.createElement('li')  
      let statusText;
      if(game.borrower===null){
          statusText=` Свободна`
      }else{
          statusText =`У ${game.borrower}` 
      }
      li.textContent = `${game.title} · ${game.players} игрока · ${statusText}`;
      gameList.append(li);
  })

  if (count === 0) {
      const li = document.createElement('li');
      li.textContent = 'Свободных игр пока нет';
      gameList.append(li);
  }
}

gameButton.addEventListener('click', () => {
  const title = nameGame.value.trim();
  const players = Number(numberPlayer.value);

  if (!title) {
      message.textContent = 'Введите название игры';
      return;
  }
  if (!Number.isInteger(players) || players <= 0) {
      message.textContent = 'Число игроков должно быть положительным целым';
      return;
  }

  games.push({ title, players, borrower: null });

  renderGames();
});

const message = document.getElementById('message')

borrowButton.addEventListener(`click`, () => {
const name = borrowerName.value.trim()
const index = Number(gameSelect.value)
const game = games[index]

if(!name){
    message.textContent = 'Введите имя'
    return; 
}
if (game.borrower != null) {
    message.textContent = 'Игра уже выдана'
    return;
  }

  game.borrower = name
  message.textContent = 'Игра выдана'
  renderGames()
})


returnButton.addEventListener('click', () => {
    const index = Number(gameSelect.value)
    const game = games[index]

    message.textContent = ''

    if (game.borrower === null) {
      message.textContent = 'Игра уже свободна'
      return;
    }

    game.borrower = null;
    message.textContent = 'Игра возвращена'
    renderGames(); 
  });


renderGames();