const gameList = document.getElementById(`gameList`)
const gameSelect = document.getElementById(`gameSelect`)
const borrowerName = document.getElementById(`borrowerName`)
const borrowButton = document.getElementById(`borrowButton`)
const returnButton = document.getElementById(`returnButton`)


const games =[
    {title:`Каркассон`,players: 4 ,borrower:null }, 
    {title:`Доббль`,players: 6 ,borrower:`Аня` },
    {title:`Шахматы`,players: 2 ,borrower:null },
]

function renderGames(){
    gameList.innerHTML = '';
    games.forEach((game)=>{
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

}
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