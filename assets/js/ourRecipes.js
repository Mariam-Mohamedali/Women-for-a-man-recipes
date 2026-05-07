function runGlobalSearch(e) {
    e.preventDefault();
    const q = document.getElementById('globalSearchInput').value.trim();
    if (!q) return;

    const results = searchRecipes(q);

    if (results.length > 0) {
        window.location.href = `recipeDetails.html?id=${results[0].id}`;
    } else {
        const msg = document.getElementById('searchNoResult');
        msg.textContent = `No recipes found for "${q}".`;
        msg.style.display = 'block';
    }
}

