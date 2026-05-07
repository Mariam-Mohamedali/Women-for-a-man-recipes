from django.shortcuts import render, redirect, get_object_or_404
from .models import Recipe, Favourite
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import RegisterForm, LoginForm, RecipeForm


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
#  Auth Views
# ─────────────────────────────
def register_view(request):
    if request.user.is_authenticated:
        return redirect('login')

    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, f'Welcome {user.username}! 🎉')
            return redirect('login')
        else:
            messages.error(request, 'Please fix the errors below.')
    else:
        form = RegisterForm()

    return render(request, 'accounts/register.html', {'form': form})


def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f'Welcome back, {user.username}! ')
            next_url = request.GET.get('next', 'home')
            return redirect(next_url)
        else:
            messages.error(request, 'Invalid username or password.')
    else:
        form = LoginForm(request)

    return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('login')


# ─────────────────────────────
#  Profile 
# ─────────────────────────────
@login_required
def profile_view(request):
    favourite_recipes = Favourite.objects.filter(
        user=request.user
    ).select_related('recipe').order_by('-added_at')

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
