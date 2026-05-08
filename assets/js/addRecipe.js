
function addIngredientRow() {
    const container = document.getElementById('ingredientsContainer');
    const row = document.createElement('div');
    row.className = 'ingredient-row';
    row.style.marginBottom = '10px';
    row.innerHTML = `
        <input type="text" placeholder="Ingredient Name" class="ing-name" required>
        <input type="text" placeholder="Quantity" class="ing-qty" required>
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(row);
}

function addStepRow() {
    const container = document.getElementById('stepsContainer');
    const row = document.createElement('div');
    row.className = 'step-row';
    row.style.marginBottom = '10px';
    row.innerHTML = `
        <textarea rows="2" placeholder="Step description" class="step-desc" required style="width: 80%;"></textarea>
        <button type="button" onclick="this.parentElement.remove()" style="vertical-align: top;">Remove</button>
    `;
    container.appendChild(row);
}

function handleFormSubmission(e) {
    e.preventDefault();

    const name = document.getElementById('recipeName').value;
    const course = document.getElementById('recipeCourse').value;
    const desc = document.getElementById('recipeDescription').value;

    const ingredientRows = document.querySelectorAll('.ingredient-row');
    let ingredients = [];
    ingredientRows.forEach((row, index) => {
        const iName = row.querySelector('.ing-name').value;
        const iQty = row.querySelector('.ing-qty').value;
        ingredients.push({ id: index + 1, name: iName, quantity: iQty });
    });

    const stepRows = document.querySelectorAll('.step-row');
    let steps = [];
    stepRows.forEach((row) => {
        steps.push(row.querySelector('.step-desc').value);
    });

    const fileInput = document.getElementById('recipeImage');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const newRecipe = {
                name: name,
                course: course,
                description: desc,
                ingredients: ingredients,
                steps: steps,
                image: event.target.result
            };
            addRecipe(newRecipe);
            showToast('Recipe added successfully!', 'success');
            setTimeout(() => window.location.href = 'adminDashboard.html', 1500);
        };
        reader.readAsDataURL(file);
    } else {
        const newRecipe = {
            name: name,
            course: course,
            description: desc,
            ingredients: ingredients,
            steps: steps,
            image: ''
        };
        addRecipe(newRecipe);
        showToast('Recipe added successfully!', 'success');
        setTimeout(() => window.location.href = 'addRecipe.html', 1500);
    }
}
