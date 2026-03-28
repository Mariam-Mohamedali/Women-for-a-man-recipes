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
    <div id="recipe-${r.id}" style="border:1px solid #ddd; padding:10px; margin-bottom:15px; border-radius: 8px;">
        <h2> - ${r.name}</h2>
        ${r.image ? `<img src="${r.image}" style="height:200px;width:200px;border-radius:12px;object-fit:cover;" alt="${r.name}">` : ''}
        
        <h3>Average Rating: <span id="avgRating-${r.id}">${avgRating}</span> / 5.0 ⭐</h3>
        <div id="ratingSection-${r.id}">
            <p><strong>Rate this recipe:</strong></p>
            ${starsHtml}
        </div>
        <br>
        <button onclick="toggleFavorite(${r.id}, this)">${fav ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}</button>

        <h3>Description</h3>
        <p>${r.description}</p>
        
        <h3>Ingredients</h3>
        <ul>${(r.ingredients || []).map(i => `<li>${i.name} (${i.quantity})</li>`).join('')}</ul>
        
        <h3>Preparation Steps</h3>
        <ol>${(r.steps || []).map(s => `<li>${s}</li>`).join('')}</ol>
        <p><strong>Bon Appetit!</strong></p>
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
            ? recipes.map(recipeCard).join('<hr>')
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
            ? `<p>Results for "<strong>${q}</strong>":</p>` + results.map(recipeCard).join('<hr>')
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