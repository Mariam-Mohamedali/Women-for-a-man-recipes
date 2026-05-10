from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from .forms import ContactForm, LoginForm, RecipeForm, RegisterForm
from .models import Favourite, Recipe


def home(request):
    recipes = Recipe.objects.select_related('author', 'category').all().order_by('-created_at')
    favourite_recipe_ids = []

    if request.user.is_authenticated:
        favourite_recipe_ids = list(
            Favourite.objects.filter(user=request.user).values_list('recipe_id', flat=True)
        )

    return render(request, 'main/home.html', {
        'recipes': recipes,
        'favourite_recipe_ids': favourite_recipe_ids,
    })


def about_view(request):
    return render(request, 'main/aboutUs.html')


def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your message was sent successfully. Thank you for contacting us!')
            return redirect('contact_success')
        messages.error(request, 'Please fix the errors below.')
    else:
        form = ContactForm()

    return render(request, 'main/contactUs.html', {'form': form})

def contact_success_view(request):
    return render(request, 'main/contact_success.html')


def register_view(request):
    if request.user.is_authenticated:
        return redirect('login')

    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, f'Welcome {user.username}! 🎉')
            return redirect('login')
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
            next_url = request.GET.get('next', 'home')
            return redirect(next_url)
        messages.error(request, 'Invalid username or password.')
    else:
        form = LoginForm(request)

    return render(request, 'accounts/login.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('login')


@login_required
def profile_view(request):
    favourite_recipes = Favourite.objects.filter(
        user=request.user
    ).select_related('recipe', 'recipe__author', 'recipe__category').order_by('-added_at')

    return render(request, 'main/profile.html', {
        'favourite_recipes': favourite_recipes,
    })


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
            return redirect('home')
        messages.error(request, 'Please fix the errors below.')
    else:
        form = RecipeForm(instance=recipe)

    return render(request, 'main/edit_recipe.html', {'form': form, 'recipe': recipe})


def recipe_detail_view(request, recipe_id):
    recipe = get_object_or_404(
        Recipe.objects.select_related('author', 'category'),
        id=recipe_id,
    )
    is_favourite = False

    if request.user.is_authenticated:
        is_favourite = Favourite.objects.filter(user=request.user, recipe=recipe).exists()

    return render(request, 'main/recipe_detail.html', {
        'recipe': recipe,
        'favourite_recipe_ids': [recipe.id] if is_favourite else [],
    })


@login_required
def favourites_view(request):
    favourites = Favourite.objects.filter(
        user=request.user
    ).select_related('recipe', 'recipe__author', 'recipe__category').order_by('-added_at')

    favourite_recipe_ids = list(favourites.values_list('recipe_id', flat=True))

    return render(request, 'main/favourites.html', {
        'favourites': favourites,
        'favourite_recipe_ids': favourite_recipe_ids,
    })


@login_required
@require_POST
def toggle_favourite(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    favourite, created = Favourite.objects.get_or_create(user=request.user, recipe=recipe)

    if created:
        is_favourite = True
    else:
        favourite.delete()
        is_favourite = False

    return JsonResponse({
        'success': True,
        'is_favourite': is_favourite,
        'count': Favourite.objects.filter(recipe=recipe).count(),
    })
