const container = document.getElementById('gameContainer');
const yearFilter = document.getElementById('yearFilter');
const genreFilter = document.getElementById('genreFilter');
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

  
    const genres = [...new Set(games.map(g => g.genre))].sort();
    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genre;
      genreFilter.appendChild(option);
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
    
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const selectedYear = yearFilter.value;
  const selectedGenre = genreFilter.value;

  let filtered = allGames;

  if (selectedYear !== "all") {
    filtered = filtered.filter(game => game.year == selectedYear);
  }

  if (selectedGenre !== "all") {
    filtered = filtered.filter(game => game.genre === selectedGenre);
  }

  renderGames(filtered);
}

yearFilter.addEventListener('change', applyFilters);
genreFilter.addEventListener('change', applyFilters);
