requireLogin();

const user = getCurrentUser();
if (user) {
    document.getElementById('displayName').textContent = user.username;
    document.getElementById('displayEmail').textContent = user.email;
    document.getElementById('displayRole').textContent = user.is_admin ? 'Administrator' : 'Member';
    if (user.is_admin) document.getElementById('adminBadge').style.display = 'inline-block';
}

// Course → emoji map
const courseEmoji = { breakfast: '🍳', lunch: '🥗', dinner: '🍽️', dessert: '🍰' };

function renderFavorites() {
    const favIds = getFavorites();
    const area = document.getElementById('favoritesArea');
    const countEl = document.getElementById('favCount');

    if (favIds.length === 0) {
        countEl.textContent = '0';
        if (document.getElementById('statFavCount')) document.getElementById('statFavCount').textContent = '0';
        area.innerHTML = `
            <div class="fav-empty">
                <div class="fav-empty-icon">🍽️</div>
                <p>No favorites yet. Browse recipes and add some!</p>
                <a href="ourRecipes.html"><button>Explore Recipes</button></a>
            </div>`;
        return;
    }

    const favRecipes = getRecipes().filter(r => favIds.includes(r.id));
    countEl.textContent = favRecipes.length;
    if (document.getElementById('statFavCount')) document.getElementById('statFavCount').textContent = favRecipes.length;

    area.innerHTML = '<ul>' + favRecipes.map(r => `
        <li>
            <a href="recipeDetails.html?id=${r.id}">
                <span class="fav-emoji">${courseEmoji[r.course] || '🍴'}</span>
                <span class="fav-info">
                    <span class="fav-name">${r.name}</span>
                    <span class="fav-course-tag">${r.course}</span>
                </span>
                <span class="fav-arrow">›</span>
            </a>
        </li>
    `).join('') + '</ul>';
}

// Populate stats row
if (document.getElementById('statYear')) {
    document.getElementById('statYear').textContent = new Date().getFullYear();
}


renderFavorites();
