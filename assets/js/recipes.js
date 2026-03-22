// recipes.js — Shared recipe data management (localStorage)
// Recipes are organized by course: breakfast (appetizers), lunch/dinner (main course), dessert

// Seed default recipes if none exist
function seedRecipes() {
    if (localStorage.getItem('wfm_recipes')) return;
    const defaults = [
        {
            id: 1, name: 'Falafel', course: 'breakfast',
            description: 'Falafel is a famous Middle Eastern street food made from chickpeas and spices.',
            ingredients: [
                { id: 1, name: 'Dried chickpeas (soaked overnight)', quantity: '1 cup' },
                { id: 2, name: 'Small onion (chopped)', quantity: '1' },
                { id: 3, name: 'Garlic cloves', quantity: '2' },
                { id: 4, name: 'Fresh parsley', quantity: '1/2 cup' },
                { id: 5, name: 'Cumin', quantity: '1 tsp' },
                { id: 6, name: 'Coriander', quantity: '1 tsp' },
                { id: 7, name: 'Flour', quantity: '1 tbsp' },
                { id: 8, name: 'Salt and pepper', quantity: 'to taste' },
                { id: 9, name: 'Oil for frying', quantity: 'as needed' }
            ],
            steps: [
                'Soak the chickpeas in water overnight.',
                'Drain the chickpeas and place them in a food processor.',
                'Add onion, garlic, parsley, cumin, coriander, salt, and pepper.',
                'Blend until a coarse paste forms.',
                'Add flour and mix well.',
                'Shape into small balls.',
                'Heat oil in a deep pan.',
                'Fry falafel balls until golden brown and crispy.',
                'Serve hot with pita bread, salad, and tahini sauce.'
            ],
            image: 'assets/images/tortilla-wrap-with-falafel-fresh-salad-vegan-tacos-vegetarian-healthy-food.jpg'
        },
        {
            id: 2, name: 'Pancakes', course: 'breakfast',
            description: 'Pancakes are a popular breakfast dish made from a simple batter of flour, eggs, and milk.',
            ingredients: [
                { id: 1, name: 'Flour', quantity: '1 cup' },
                { id: 2, name: 'Milk', quantity: '1 cup' },
                { id: 3, name: 'Egg', quantity: '1' },
                { id: 4, name: 'Sugar', quantity: '2 tbsp' },
                { id: 5, name: 'Baking powder', quantity: '1 tsp' },
                { id: 6, name: 'Butter', quantity: '1 tbsp' },
                { id: 7, name: 'Chocolate sauce', quantity: 'for topping' }
            ],
            steps: [
                'Mix flour, sugar, and baking powder in a bowl.',
                'Add milk and egg, mix until smooth.',
                'Heat butter in a pan over medium heat.',
                'Pour batter onto pan.',
                'Cook until bubbles appear, then flip.',
                'Cook the other side until golden brown.',
                'Serve with chocolate sauce.'
            ],
            image: 'assets/images/pancakes-topped-with-nuts-chocolate.jpg'
        },
        {
            id: 3, name: 'Pasta', course: 'lunch',
            description: 'Pasta is a versatile Italian staple made from unleavened dough.',
            ingredients: [
                { id: 1, name: 'Spaghetti', quantity: '1/2 lb' },
                { id: 2, name: 'Butter', quantity: '2 tbsp' },
                { id: 3, name: 'Olive oil', quantity: '2 tsp' },
                { id: 4, name: 'Garlic (minced)', quantity: '4 cloves' },
                { id: 5, name: 'Heavy cream', quantity: '3/4 cup' },
                { id: 6, name: 'Grated Parmesan cheese', quantity: '1 cup' },
                { id: 7, name: 'Dried parsley', quantity: '1.5 tbsp' },
                { id: 8, name: 'Salt and black pepper', quantity: 'to taste' }
            ],
            steps: [
                'Cook spaghetti in boiling salted water until al dente.',
                'Reserve 1/2 cup pasta water before draining.',
                'Heat olive oil and butter in a large pan, add garlic for 1-2 minutes.',
                'Add heavy cream, parmesan, and parsley; stir until smooth.',
                'Toss drained pasta in sauce, adding pasta water as needed.',
                'Season and serve immediately with extra Parmesan.'
            ],
            image: 'assets/images/pasta.jpg'
        },
        {
            id: 4, name: 'Pizza', course: 'lunch',
            description: 'Pizza is a popular Italian dish with flattened dough topped with tomatoes and cheese.',
            ingredients: [
                { id: 1, name: 'All-purpose flour', quantity: '2 cups' },
                { id: 2, name: 'Active dry yeast', quantity: '1 tsp' },
                { id: 3, name: 'Warm water', quantity: '3/4 cup' },
                { id: 4, name: 'Salt', quantity: '1 tsp' },
                { id: 5, name: 'Olive oil', quantity: '2 tbsp' },
                { id: 6, name: 'Tomato sauce', quantity: '1/2 cup' },
                { id: 7, name: 'Mozzarella cheese', quantity: '1 cup shredded' }
            ],
            steps: [
                'Mix warm water, sugar, and yeast; let sit until foamy.',
                'Combine with flour, salt, and olive oil; knead 5-7 minutes.',
                'Let dough rise 60-90 minutes until doubled.',
                'Preheat oven to its highest temperature.',
                'Stretch dough into a 10-12 inch circle.',
                'Spread sauce and cheese, add toppings.',
                'Bake 8-12 minutes until crust is golden and cheese is bubbly.'
            ],
            image: 'assets/images/pizza.jpg'
        },
        {
            id: 5, name: 'Kunafa with Pistachio', course: 'dessert',
            description: 'Kunafa is a traditional Middle Eastern dessert with crispy layers and sweet flavor.',
            ingredients: [
                { id: 1, name: 'Kunafa dough (shredded)', quantity: '250g' },
                { id: 2, name: 'Unsalted butter (melted)', quantity: '100g' },
                { id: 3, name: 'Sweet cheese or clotted cream', quantity: '200g' },
                { id: 4, name: 'Crushed pistachios', quantity: '100g' },
                { id: 5, name: 'Sugar', quantity: '200g' },
                { id: 6, name: 'Water', quantity: '120ml' },
                { id: 7, name: 'Lemon juice', quantity: '1 tsp' },
                { id: 8, name: 'Rose water', quantity: '1 tsp (optional)' }
            ],
            steps: [
                'Preheat oven to 180°C (350°F).',
                'Boil sugar and water with lemon juice for 5-7 mins; add rose water. Cool.',
                'Mix shredded dough with melted butter.',
                'Spread half the dough in a greased baking tray.',
                'Add cheese/cream filling on top.',
                'Cover with remaining dough and press gently.',
                'Bake 25-30 minutes until golden.',
                'Pour syrup over hot kunafa and garnish with pistachios.'
            ],
            image: 'assets/images/turkish-dessert-kunefe-topped-with-pistachio.jpg'
        },
        {
            id: 6, name: 'Umm Ali', course: 'dessert',
            description: 'Umm Ali is a famous Egyptian warm, creamy pastry pudding enjoyed especially in Winter.',
            ingredients: [
                { id: 1, name: 'Puff pastry or phyllo dough', quantity: '200g' },
                { id: 2, name: 'Milk', quantity: '1 liter' },
                { id: 3, name: 'Sugar', quantity: '150g' },
                { id: 4, name: 'Mixed nuts (almonds, pistachios, cashews)', quantity: '100g' },
                { id: 5, name: 'Raisins', quantity: '50g' },
                { id: 6, name: 'Desiccated coconut', quantity: '50g' },
                { id: 7, name: 'Vanilla extract', quantity: '1 tsp' },
                { id: 8, name: 'Butter', quantity: '50g' }
            ],
            steps: [
                'Preheat oven to 180°C (350°F).',
                'Break pastry into small pieces and bake with butter until golden.',
                'Heat milk with sugar and vanilla until warm.',
                'Place baked pastry in a baking dish.',
                'Sprinkle nuts, raisins, and coconut over pastry.',
                'Pour warm milk mixture over everything.',
                'Bake 20-25 minutes until top is slightly golden.',
                'Serve warm, optionally with extra nuts or cinnamon.'
            ],
            image: 'assets/images/porridge-with-honey-tea.jpg'
        },
        {
            id: 7, name: 'Steak Fajita Power Bowls', course: 'dinner',
            description: 'A nutritious, high-protein meal with seared marinated steak, sauteed bell peppers, and rice.',
            ingredients: [
                { id: 1, name: 'Lean steak (cut into strips)', quantity: '1 pound' },
                { id: 2, name: 'Fresh lime juice', quantity: '1/2 cup' },
                { id: 3, name: 'Ground black pepper', quantity: '1/2 tbsp' },
                { id: 4, name: 'Fresh cilantro (chopped)', quantity: '1 tbsp' },
                { id: 5, name: 'Vegetable oil', quantity: '2 tbsp' },
                { id: 6, name: 'Large onion (thin strips)', quantity: '1' },
                { id: 7, name: 'Green bell pepper (julienned)', quantity: '1' },
                { id: 8, name: 'Lemons (quartered)', quantity: '2' }
            ],
            steps: [
                'Combine olive oil, lime juice, and spices; marinate steak for 15-30 minutes.',
                'Cook rice; stir in lime juice, cilantro, and salt.',
                'Saute peppers and onions in oil for 5-7 minutes. Remove from pan.',
                'Cook steak 3-5 minutes per side; rest 5 minutes before slicing.',
                'Assemble bowls: rice, vegetables, sliced steak.',
                'Garnish with guacamole, salsa, black beans, or lime crema.'
            ],
            image: 'assets/images/Steak.jpg'
        },
        {
            id: 8, name: 'Turkey Lavash Wraps', course: 'dinner',
            description: 'Light Middle Eastern flatbread filled with deli turkey, fresh vegetables, and spreads.',
            ingredients: [
                { id: 1, name: 'Fresh lavash bread', quantity: '1 sheet' },
                { id: 2, name: 'Sliced deli turkey', quantity: 'as needed' },
                { id: 3, name: 'Cream cheese or Greek yogurt', quantity: 'as needed' },
                { id: 4, name: 'Romaine lettuce or spinach', quantity: 'a handful' },
                { id: 5, name: 'Goat cheese, dill, scallions', quantity: 'to taste' }
            ],
            steps: [
                'Mix scallion, goat cheese, yogurt, and oil; season with salt and pepper.',
                'Toss arugula, dill, lemon juice, and oil in a bowl.',
                'Lay lavash flat; spread cheese mixture, add turkey, peppers, cucumbers, arugula.',
                'Roll like a burrito, tuck in ends to seal. Cut in half before serving.'
            ],
            image: 'assets/images/wrap.jpg'
        }
    ];
    localStorage.setItem('wfm_recipes', JSON.stringify(defaults));
}

function _migrateRecipesData() {
    let recipes = JSON.parse(localStorage.getItem('wfm_recipes') || '[]');
    let changed = false;
    
    // Normal max ID for sequential assignments
    let maxNormalId = recipes.reduce((max, r) => (r.id < 100000 ? Math.max(max, r.id) : max), 0);

    for (let r of recipes) {
        // Fix course names
        if (r.category) {
            r.course = r.category;
            delete r.category;
            changed = true;
        } else if (r.course === 'appetizers') {
            r.course = 'breakfast';
            changed = true;
        } else if (r.course === 'main course') {
            r.course = 'lunch'; // default if no category
            changed = true;
        }

        // Fix huge IDs
        if (r.id > 100000) {
            maxNormalId++;
            r.id = maxNormalId;
            changed = true;
        }
    }

    if (changed) {
        localStorage.setItem('wfm_recipes', JSON.stringify(recipes));
    }
}

function getRecipes() {
    seedRecipes();
    _migrateRecipesData();
    return JSON.parse(localStorage.getItem('wfm_recipes') || '[]');
}

function getRecipesByCategory(category) {
    return getRecipes().filter(r => r.course === category);
}

function saveRecipes(recipes) {
    localStorage.setItem('wfm_recipes', JSON.stringify(recipes));
}

function addRecipe(recipe) {
    const recipes = getRecipes();
    // Auto-increment ID based on max existing ID
    const maxId = recipes.reduce((max, r) => Math.max(max, r.id || 0), 0);
    recipe.id = maxId + 1;
    // Initialize empty ratings array
    recipe.ratings = [];
    recipes.push(recipe);
    saveRecipes(recipes);
}

function updateRecipe(id, updated) {
    const recipes = getRecipes();
    const idx = recipes.findIndex(r => r.id == id);
    if (idx !== -1) { recipes[idx] = { ...recipes[idx], ...updated }; saveRecipes(recipes); }
}

function deleteRecipe(id) {
    const recipes = getRecipes().filter(r => r.id != id);
    saveRecipes(recipes);
}

function getRecipeById(id) {
    return getRecipes().find(r => r.id == id);
}

// Search recipes by name or ingredient
function searchRecipes(query) {
    const lq = query.toLowerCase();
    return getRecipes().filter(r => {
        const nameMatch = r.name.toLowerCase().includes(lq);
        const ingMatch = (r.ingredients || []).some(ing => ing.name.toLowerCase().includes(lq));
        return nameMatch || ingMatch;
    });
}

// Favorites
function getFavorites() {
    const user = JSON.parse(localStorage.getItem('wfm_user') || 'null');
    if (!user) return [];
    return JSON.parse(localStorage.getItem('wfm_fav_' + user.id) || '[]');
}

function addFavorite(recipeId) {
    const user = JSON.parse(localStorage.getItem('wfm_user') || 'null');
    if (!user) { alert('Please log in to save favorites.'); return; }
    const favs = getFavorites();
    if (!favs.includes(recipeId)) { favs.push(recipeId); localStorage.setItem('wfm_fav_' + user.id, JSON.stringify(favs)); }
}

function removeFavorite(recipeId) {
    const user = JSON.parse(localStorage.getItem('wfm_user') || 'null');
    if (!user) return;
    const favs = getFavorites().filter(id => id !== recipeId);
    localStorage.setItem('wfm_fav_' + user.id, JSON.stringify(favs));
}

function isFavorite(recipeId) {
    return getFavorites().includes(recipeId);
}

// Ratings
function rateRecipe(recipeId, stars) {
    const user = JSON.parse(localStorage.getItem('wfm_user') || 'null');
    if (!user) { alert('Please log in to rate recipes.'); return; }
    
    if (stars < 1 || stars > 5) return; // Invalid rating

    const recipes = getRecipes();
    const recipe = recipes.find(r => r.id == recipeId);
    if (!recipe) return;

    if (!recipe.ratings) recipe.ratings = [];
    
    // Check if user already rated
    const existingIndex = recipe.ratings.findIndex(r => r.userId === user.id);
    if (existingIndex >= 0) {
        recipe.ratings[existingIndex].stars = stars; // Update rating
    } else {
        recipe.ratings.push({ userId: user.id, stars: stars }); // New rating
    }
    
    saveRecipes(recipes);
}

function getAverageRating(recipe) {
    if (!recipe.ratings || recipe.ratings.length === 0) return 0;
    const sum = recipe.ratings.reduce((acc, r) => acc + r.stars, 0);
    return (sum / recipe.ratings.length).toFixed(1);
}

