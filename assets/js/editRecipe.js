requireAdmin();

function addIngredientRow(name = '', qty = '') {
    const container = document.getElementById('ingredientsContainer');
    const row = document.createElement('div');
    row.className = 'ingredient-row';
    row.style.marginBottom = '10px';
    row.innerHTML = `
        <input type="text" placeholder="Ingredient Name" class="ing-name" value="${name}" required>
        <input type="text" placeholder="Quantity" class="ing-qty" value="${qty}" required>
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(row);
}

function addStepRow(desc = '') {
    const container = document.getElementById('stepsContainer');
    const row = document.createElement('div');
    row.className = 'step-row';
    row.style.marginBottom = '10px';
    row.innerHTML = `
        <textarea rows="2" placeholder="Step description" class="step-desc" required style="width: 80%;">${desc}</textarea>
        <button type="button" onclick="this.parentElement.remove()" style="vertical-align: top;">Remove</button>
    `;
    container.appendChild(row);
}

function handleFormSubmission(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('recipeId').value, 10);
    const r = getRecipeById(id);
    if (!r) return;

    r.name = document.getElementById('recipeName').value;
    r.course = document.getElementById('recipeCourse').value;
    r.description = document.getElementById('recipeDescription').value;

    const ingredientRows = document.querySelectorAll('.ingredient-row');
    let ingredients = [];
    ingredientRows.forEach((row, index) => {
        const iName = row.querySelector('.ing-name').value;
        const iQty = row.querySelector('.ing-qty').value;
        ingredients.push({ id: index + 1, name: iName, quantity: iQty });
    });
    r.ingredients = ingredients;

    const stepRows = document.querySelectorAll('.step-row');
    let steps = [];
    stepRows.forEach((row) => {
        steps.push(row.querySelector('.step-desc').value);
    });
    r.steps = steps;

    updateRecipe(r.id, r);
    showToast('Recipe updated successfully!', 'success');
    setTimeout(() => window.location.href = 'adminDashboard.html', 1500);
}

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    const recipe = getRecipeById(parseInt(idParam, 10));

    if (recipe) {
        document.getElementById('editRecipeForm').style.display = 'block';
        document.getElementById('recipeId').value = recipe.id;
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeCourse').value = recipe.course;
        document.getElementById('recipeDescription').value = recipe.description;

        (recipe.ingredients || []).forEach(i => addIngredientRow(i.name, i.quantity));
        if (!recipe.ingredients || recipe.ingredients.length === 0) addIngredientRow();

        (recipe.steps || []).forEach(s => addStepRow(s));
        if (!recipe.steps || recipe.steps.length === 0) addStepRow();

    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
};
