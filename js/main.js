const container = document.getElementById('gameContainer');
const yearFilter = document.getElementById('yearFilter');
let allGames = [];


fetch('./data/games.json')

  .then(response => response.json())
  .then(games => {
    allGames = games;


    const years = [...new Set(games.map(g => g.year))].sort((a, b) => b - a);
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearFilter.appendChild(option);
    });

    
    renderGames(games);
  })
  .catch(error => console.error("Error loading games:", error));


function renderGames(games) {
  container.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';

    card.innerHTML = `
      <img class="game-image" src="${game.image}" alt="${game.title}">
      <div class="game-info">
        <div class="game-title">${game.title} (${game.year})</div>
        <div class="game-description">${game.description}</div>
        <div class="game-genre">Genre: ${game.genre}</div>
        <div class="game-buttons">
          <button onclick="window.location.href='${game.link}'">Play</button>
          <button>Details</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Filter by year
yearFilter.addEventListener('change', () => {
  const selectedYear = yearFilter.value;
  if (selectedYear === "all") {
    renderGames(allGames);
  } else {
    const filtered = allGames.filter(game => game.year == selectedYear);
    renderGames(filtered);
  }
});
