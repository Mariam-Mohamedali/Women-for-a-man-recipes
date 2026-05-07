document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('recipe-detail-container');

    if (!id) {
        container.innerHTML = '<h2>Recipe ID missing.</h2>';
        return;
    }

    const recipe = getRecipeById(id);
    if (!recipe) {
        container.innerHTML = '<h2>Recipe not found.</h2>';
        return;
    }

    const fav = isFavorite(recipe.id);
    const avgRating = getAverageRating(recipe);
    const user = getCurrentUser();
    
    let myRating = 0;
    if (user && recipe.ratings) {
        const found = recipe.ratings.find(x => x.userId == user.id);
        if (found) myRating = Number(found.stars);
    }

    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        const isSelected = i <= myRating ? 'color:gold;' : 'color:lightgray;';
        starsHtml += `<span style="font-size:40px; cursor:pointer; ${isSelected}" onclick="submitRating(${recipe.id}, ${i})">★</span>`;
    }

    container.innerHTML = `
        <div style="display: flex; gap: 40px; flex-wrap: wrap; margin-bottom: 30px;">
            <div style="flex: 1; min-width: 300px;">
                ${recipe.image ? `<img src="${recipe.image}" style="width:100%; max-height: 400px; object-fit: cover; border-radius: 16px;" alt="${recipe.name}">` : ''}
            </div>
            <div style="flex: 2; min-width: 300px;">
                <h1 style="font-size: 40px; margin-top: 0; color: var(--walnut);">${recipe.name}</h1>
                <p style="font-size: 20px; color: #555;">${recipe.description}</p>
                
                <h3 style="margin-top: 20px;">Course: <span style="text-transform: capitalize; font-weight: normal;">${recipe.course}</span></h3>
                
                <div style="display: flex; align-items: center; gap: 20px; margin: 20px 0;">
                    <strong style="font-size: 20px;">Rating: <span id="avgRating-${recipe.id}">${avgRating}</span> / 5.0 ⭐</strong>
                    <button onclick="toggleFavorite(${recipe.id}, this)" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
                        ${fav ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                    </button>
                </div>
                
                <div id="ratingSection-${recipe.id}" style="background: rgba(0,0,0,0.03); padding: 15px; border-radius: 12px; display: inline-block;">
                    <p style="margin-top: 0;"><strong>Rate this recipe:</strong></p>
                    ${starsHtml}
                </div>
            </div>
        </div>

        <hr style="opacity: 0.3; margin: 40px 0;">

        <div style="display: flex; gap: 40px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 300px;">
                <h2 style="border-bottom: 2px solid var(--clay); padding-bottom: 10px; margin-bottom: 20px;">Ingredients</h2>
                <ul style="font-size: 18px; line-height: 1.8;">
                    ${(recipe.ingredients || []).map(i => `<li><strong>${i.name}</strong> - ${i.quantity}</li>`).join('')}
                </ul>
            </div>
            <div style="flex: 2; min-width: 300px;">
                <h2 style="border-bottom: 2px solid var(--clay); padding-bottom: 10px; margin-bottom: 20px;">Preparation Steps</h2>
                <ol style="font-size: 18px; line-height: 1.8;">
                    ${(recipe.steps || []).map(s => `<li style="margin-bottom: 10px;">${s}</li>`).join('')}
                </ol>
                <div style="margin-top: 30px; font-size: 22px;"><strong>Bon Appetit! 🍽️</strong></div>
            </div>
        </div>
    `;
});
