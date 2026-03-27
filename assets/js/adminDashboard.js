requireAdmin();

function renderTable() {
    const recipes = getRecipes();
    const tbody = document.getElementById('recipesTable');
    if (recipes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No recipes found.</td></tr>';
        return;
    }
    tbody.innerHTML = recipes.map(r => `
    <tr>
        <td data-label="ID">${r.id}</td>
        <td data-label="Recipe Name">${r.name}</td>
        <td data-label="Course">${r.course}</td>
        <td data-label="Actions">
            <a href="editRecipe.html?id=${r.id}"><button>Edit</button></a>
            &nbsp;
            <button class="btn-delete" onclick="handleDelete(${r.id})">Delete</button>
        </td>
    </tr>
`).join('');
}

function handleDelete(id) {
    const overlay = document.getElementById('confirmOverlay');
    overlay.classList.add('active');
    document.getElementById('confirmDeleteBtn').onclick = function () {
        deleteRecipe(id);
        renderTable();
        closeConfirm();
        showToast('Recipe deleted.', 'info');
    };
}

function closeConfirm() {
    document.getElementById('confirmOverlay').classList.remove('active');
}

// Close on overlay click
document.getElementById('confirmOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeConfirm();
});

renderTable();
