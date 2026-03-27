function runGlobalSearch(e) {
    e.preventDefault();
    const q = document.getElementById('globalSearchInput').value.trim();
    if (!q) { clearGlobalSearch(); return; }

    const results = searchRecipes(q);
    const area = document.getElementById('searchResultsArea');
    document.getElementById('categoriesSection').style.display = 'none';

    area.style.display = 'block';
    area.innerHTML = results.length
        ? `<h3>Search Results for "${q}"</h3><hr>` + results.map(recipeCard).join('<hr>')
        : `<h3>No recipes found for "${q}".</h3>`;
}

function clearGlobalSearch() {
    document.getElementById('globalSearchInput').value = '';
    document.getElementById('searchResultsArea').style.display = 'none';
    document.getElementById('categoriesSection').style.display = 'grid';
}
