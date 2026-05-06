from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Recipe, Favourite
from .forms import RecipeForm


# ─────────────────────────────
#  Home
# ─────────────────────────────
def home(request):
    recipes = Recipe.objects.all().order_by('-created_at')[:8]
    context = {
        'recipes': recipes,
    }
    return render(request, 'main/home.html', context)


# ─────────────────────────────
#  Profile  
# ─────────────────────────────
@login_required
def profile_view(request):

    favourite_recipes = Favourite.objects.filter(
        user=request.user
    ).select_related('recipe').order_by('-created_at')

    context = {
        'favourite_recipes': favourite_recipes,
    }
    return render(request, 'main/profile.html', context)


# ─────────────────────────────
#  Add Recipe 
# ─────────────────────────────
@login_required
def add_recipe_view(request):
    if request.method == 'POST':
        form = RecipeForm(request.POST, request.FILES)
        if form.is_valid():
            recipe = form.save(commit=False)
            recipe.author = request.user   
            recipe.save()
            messages.success(request, 'Recipe added successfully! 🎉')
            return redirect('home')
        else:
            messages.error(request, 'Please fix the errors below.')
    else:
        form = RecipeForm()

    return render(request, 'main/add_recipe.html', {'form': form})


# ─────────────────────────────
#  Edit Recipe  
# ─────────────────────────────
@login_required
def edit_recipe_view(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)

    if recipe.author != request.user and not request.user.is_staff:
        messages.error(request, "You don't have permission to edit this recipe.")
        return redirect('home')

    if request.method == 'POST':
        form = RecipeForm(request.POST, request.FILES, instance=recipe)
        if form.is_valid():
            form.save()
            messages.success(request, 'Recipe updated successfully! ✅')
            return redirect('home')
        else:
            messages.error(request, 'Please fix the errors below.')
    else:
        form = RecipeForm(instance=recipe)

    return render(request, 'main/edit_recipe.html', {'form': form, 'recipe': recipe})