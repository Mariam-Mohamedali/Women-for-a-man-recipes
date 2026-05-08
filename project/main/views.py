from django.shortcuts import render, redirect, get_object_or_404
from .models import Recipe, Favourite, Category
from django.contrib.auth import login, logout
from django.contrib import messages
from .forms import RegisterForm, LoginForm, RecipeForm
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import User
from django.db.models import Q
from django.views.decorators.http import require_POST


# ─────────────────────────────
#  Home
# ─────────────────────────────
def home(request):
    recipes = Recipe.objects.all().order_by('-created_at')[:8]
    return render(request, 'main/home.html', {'recipes': recipes})


# ─────────────────────────────
#  Auth
# ─────────────────────────────
def register_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)          # log the user in immediately after register
            messages.success(request, f'Welcome {user.username}! 🎉 Your account has been created.')
            return redirect('home')
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
            messages.success(request, f'Welcome back, {user.username}!')
            next_url = request.GET.get('next', None)
            return redirect(next_url) if next_url else redirect('home')
        else:
            messages.error(request, 'Invalid username or password. Please try again.')
    else:
        form = LoginForm(request)
    return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out. See you soon!')
    return redirect('login')


# ─────────────────────────────
#  Profile
# ─────────────────────────────
@login_required
def profile_view(request):
    favourite_recipes = Favourite.objects.filter(
        user=request.user
    ).select_related('recipe').order_by('-added_at')
    return render(request, 'main/profile.html', {'favourite_recipes': favourite_recipes})


# ─────────────────────────────
#  Favourites Toggle
# ─────────────────────────────
@login_required
@require_POST
def toggle_favourite(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    fav, created = Favourite.objects.get_or_create(user=request.user, recipe=recipe)
    if not created:
        fav.delete()
        return JsonResponse({'status': 'removed'})
    return JsonResponse({'status': 'added'})


# ─────────────────────────────
#  Add / Edit / Delete Recipe
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
            return redirect('recipe_details', recipe_id=recipe.id)
        else:
            messages.error(request, 'Please fix the errors below.')
    else:
        form = RecipeForm(instance=recipe)
    return render(request, 'main/edit_recipe.html', {'form': form, 'recipe': recipe})


@login_required
@require_POST
def delete_recipe_view(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    if recipe.author != request.user and not request.user.is_staff:
        messages.error(request, "You don't have permission to delete this recipe.")
        return redirect('home')
    recipe.delete()
    messages.success(request, 'Recipe deleted successfully.')
    return redirect('profile')


# ─────────────────────────────
#  Recipe Category Pages
# ─────────────────────────────
def our_recipes(request):
    recipes = Recipe.objects.all().order_by('-created_at')
    return render(request, 'main/our_recipes.html', {'recipes': recipes})


def breakfast(request):
    recipes = Recipe.objects.filter(category__name__iexact='Breakfast')
    return render(request, 'main/breakfast.html', {'recipes': recipes})


def lunch(request):
    recipes = Recipe.objects.filter(category__name__iexact='Lunch')
    return render(request, 'main/lunch.html', {'recipes': recipes})


def dinner(request):
    recipes = Recipe.objects.filter(category__name__iexact='Dinner')
    return render(request, 'main/dinner.html', {'recipes': recipes})


def dessert(request):
    recipes = Recipe.objects.filter(category__name__iexact='Dessert')
    return render(request, 'main/dessert.html', {'recipes': recipes})


def recipe_details(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    is_favourite = False
    if request.user.is_authenticated:
        is_favourite = Favourite.objects.filter(user=request.user, recipe=recipe).exists()
    return render(request, 'main/recipe_details.html', {
        'recipe': recipe,
        'is_favourite': is_favourite,
    })


# ─────────────────────────────
#  Search
# ─────────────────────────────
def search_recipes(request):
    query = request.GET.get('q', '').strip()
    if query:
        recipes = Recipe.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(category__name__icontains=query)
        ).distinct()
    else:
        recipes = Recipe.objects.none()

    data = [
        {
            'id': r.id,
            'title': r.title,
            'image': r.image.url if r.image else '',
        }
        for r in recipes
    ]
    return JsonResponse(data, safe=False)


# ─────────────────────────────
#  Admin — Users
# ─────────────────────────────
@user_passes_test(lambda u: u.is_staff)
def users_list(request):
    from .models import User as AppUser
    users = AppUser.objects.all().order_by('username')
    return render(request, 'main/users_list.html', {'users': users})


@require_POST
@user_passes_test(lambda u: u.is_staff)
def delete_user(request, user_id):
    from .models import User as AppUser
    user = get_object_or_404(AppUser, id=user_id)
    if user == request.user:
        messages.error(request, "You cannot delete your own account.")
        return redirect('users_list')
    username = user.username
    user.delete()
    messages.success(request, f'User "{username}" deleted successfully.')
    return redirect('users_list')
