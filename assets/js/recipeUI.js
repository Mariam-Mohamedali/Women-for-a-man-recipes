// Shared UI functions for displaying and interacting with recipes
function recipeCard(r) {
    const fav = isFavorite(r.id);
    const avgRating = getAverageRating(r);
    const user = getUser();
    let myRating = 0;
    if (user && r.ratings) {
        const found = r.ratings.find(x => x.userId === user.id);
        if (found) myRating = found.stars;
    }

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        const isSelected = i <= myRating ? 'color:gold;' : 'color:lightgray;';
        starsHtml += `<span style="font-size:30px; cursor:pointer; ${isSelected}" onclick="submitRating(${r.id}, ${i})">★</span>`;
    }

    return `
    <div id="recipe-${r.id}" style="border:1px solid #ddd; padding:15px; margin-bottom:15px; border-radius: 8px; display: flex; flex-direction: column; gap: 10px; max-width: 400px; display: inline-block; margin-right: 15px; vertical-align: top;">
        <h2 style="margin: 0;"><a href="recipeDetails.html?id=${r.id}" style="text-decoration: none; color: inherit;">${r.name}</a></h2>
        
        ${r.image ? `<a href="recipeDetails.html?id=${r.id}"><img src="${r.image}" style="height:200px;width:100%;border-radius:12px;object-fit:cover;" alt="${r.name}"></a>` : ''}
        
        <h4 style="margin: 5px 0;">Average Rating: <span id="avgRating-${r.id}">${avgRating}</span> / 5.0 ⭐</h4>
        
        <p style="margin: 0; color: #555;">${r.description.length > 80 ? r.description.substring(0, 80) + '...' : r.description}</p>
        
        <div style="display: flex; gap: 10px; margin-top: 10px;">
            <a href="recipeDetails.html?id=${r.id}"><button style="padding: 8px 15px; cursor: pointer;">Full Recipe</button></a>
            <button onclick="toggleFavorite(${r.id}, this)" style="padding: 8px 15px; cursor: pointer;">${fav ? '❤️ Remove' : '🤍 Add to Favorites'}</button>
        </div>
    </div>`;
}

function submitRating(id, stars) {
    rateRecipe(id, stars);
    const r = getRecipeById(id);
    document.getElementById('avgRating-' + id).innerText = getAverageRating(r);
    const ratingSection = document.getElementById('ratingSection-' + id);
    if (ratingSection) {
        const starSpans = ratingSection.querySelectorAll('span');
        starSpans.forEach((s, idx) => {
            if (idx < stars) s.style.color = 'gold';
            else s.style.color = 'lightgray';
        });
    }
}

function toggleFavorite(id, btn) {
    if (isFavorite(id)) { removeFavorite(id); btn.textContent = '🤍 Add to Favorites'; }
    else { addFavorite(id); btn.textContent = '❤️ Remove from Favorites'; }
}

function renderCategoryRecipes(course) {
    const recipes = getRecipesByCategory(course);
    const container = document.getElementById('allRecipes');
    if (container) {
        container.innerHTML = recipes.length
            ? recipes.map(recipeCard).join('')
            : `<p>No ${course} recipes found.</p>`;
    }
}

function runCategorySearch(e, course) {
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim();
    if (!q) { clearCategorySearch(); return; }

    // Fixed bug where r.category was used instead of r.course
    const results = searchRecipes(q).filter(r => r.course === course);

    const area = document.getElementById('searchResults');
    const allArea = document.getElementById('allRecipes');
    if (allArea) allArea.style.display = 'none';
    if (area) {
        area.innerHTML = results.length
            ? `<p>Results for "<strong>${q}</strong>":</p><br>` + results.map(recipeCard).join('')
            : `<p>No ${course} recipes found for "<strong>${q}</strong>".</p>`;
    }
}

function clearCategorySearch() {
    const input = document.getElementById('searchInput');
    if (input) input.value = '';
    const area = document.getElementById('searchResults');
    if (area) area.innerHTML = '';
    const allArea = document.getElementById('allRecipes');
    if (allArea) allArea.style.display = '';
}