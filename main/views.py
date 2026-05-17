from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import get_user_model
User = get_user_model()
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


# ─────────────────────────────
#  All Recipes
# ─────────────────────────────
def recipes_view(request):
    recipes = Recipe.objects.all().order_by('-created_at')
    return render(request, 'main/recipes.html', {'recipes': recipes})


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


# ─────────────────────────────
#  Profile
# ─────────────────────────────

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
            return redirect('recipes')
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
        return redirect('recipes')

    if request.method == 'POST':
        form = RecipeForm(request.POST, request.FILES, instance=recipe)
        if form.is_valid():
            form.save()
            messages.success(request, 'Recipe updated successfully! ✅')
            return redirect('recipes')
        messages.error(request, 'Please fix the errors below.')
    else:
        form = RecipeForm(instance=recipe)

    return render(request, 'main/edit_recipe.html', {'form': form, 'recipe': recipe})


# ─────────────────────────────
#  Recipe Detail
# ─────────────────────────────
def recipe_detail_view(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    is_favourite = False
    if request.user.is_authenticated:
        is_favourite = Favourite.objects.filter(
            user=request.user, recipe=recipe
        ).exists()
    return render(request, 'main/recipe_detail.html', {
        'recipe': recipe,
        'is_favourite': is_favourite,
        'favourite_recipe_ids': [recipe.id] if is_favourite else [],
    })


# ─────────────────────────────
#  Breakfast Category
# ─────────────────────────────
def breakfast_view(request):
    from .models import Category
    category = Category.objects.filter(name__iexact='breakfast').first()
    recipes = Recipe.objects.filter(category=category).order_by('-created_at') if category else Recipe.objects.none()
    return render(request, 'main/breakfast.html', {
        'recipes': recipes,
        'category': category,
    })


# ─────────────────────────────
#  Lunch Category
# ─────────────────────────────
def lunch_view(request):
    from .models import Category
    category = Category.objects.filter(name__iexact='lunch').first()
    recipes = Recipe.objects.filter(category=category).order_by('-created_at') if category else Recipe.objects.none()
    return render(request, 'main/lunch.html', {
        'recipes': recipes,
        'category': category,
    })

# ─────────────────────────────
#  Dinner Category
# ─────────────────────────────
def dinner_view(request):
    from .models import Category
    category = Category.objects.filter(name__iexact='dinner').first()
    recipes = Recipe.objects.filter(category=category).order_by('-created_at') if category else Recipe.objects.none()
    return render(request, 'main/dinner.html', {
        'recipes': recipes,
        'category': category,
    })

# ─────────────────────────────
#  Desserts Category
# ─────────────────────────────
def dessert_view(request):
    from .models import Category
    category = Category.objects.filter(name__iexact='dessert').first()
    recipes = Recipe.objects.filter(category=category).order_by('-created_at') if category else Recipe.objects.none()
    return render(request, 'main/dessert.html', {
        'recipes': recipes,
        'category': category,
    })

# ─────────────────────────────
#  Our Recipes (User's Own Recipes)
# ─────────────────────────────
@login_required
def our_recipes_view(request):
    recipes = Recipe.objects.filter(author=request.user).order_by('-created_at')
    return render(request, 'main/recipes.html', {'recipes': recipes})
    
# ─────────────────────────────
#  Search
# ─────────────────────────────
def search_view(request):
    query = request.GET.get('q', '')
    recipes = Recipe.objects.filter(
        title__icontains=query
    ).select_related('author', 'category').order_by('-created_at') if query else Recipe.objects.all().select_related('author', 'category').order_by('-created_at')
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return render(request, 'main/search.html', {
            'recipes': recipes,
            'query': query,
        })
        
    return render(request, 'main/recipes.html', {
        'recipes': recipes,
        'query': query,
    })

# ─────────────────────────────
#  Admin
# ─────────────────────────────
def admin_recipes_view(request):
    if not request.user.is_staff:
        messages.error(request, "Access denied.")
        return redirect('home')
    recipes = Recipe.objects.all().select_related('author', 'category').order_by('-created_at')
    return render(request, 'main/admin_recipes.html', {'recipes': recipes})

def admin_add_recipe_view(request):
    if not request.user.is_staff:
        messages.error(request, "Access denied.")
        return redirect('home')

    if request.method == 'POST':
        form = RecipeForm(request.POST, request.FILES)
        if form.is_valid():
            recipe = form.save(commit=False)
            recipe.author = request.user
            recipe.save()
            messages.success(request, 'Recipe added successfully! 🎉')
            return redirect('admin_recipes')
        messages.error(request, 'Please fix the errors below.')
    else:
        form = RecipeForm()

    return render(request, 'main/admin_add_recipe.html', {'form': form})

def admin_edit_recipe_view(request, recipe_id):
    if not request.user.is_staff:
        messages.error(request, "Access denied.")
        return redirect('home')

    recipe = get_object_or_404(Recipe, id=recipe_id)

    if request.method == 'POST':
        form = RecipeForm(request.POST, request.FILES, instance=recipe)
        if form.is_valid():
            form.save()
            messages.success(request, 'Recipe updated successfully! ✅')
            return redirect('admin_recipes')
        messages.error(request, 'Please fix the errors below.')
    else:
        form = RecipeForm(instance=recipe)

    return render(request, 'main/admin_edit_recipe.html', {'form': form, 'recipe': recipe})

def admin_delete_recipe_view(request, recipe_id):
    if not request.user.is_staff:
        messages.error(request, "Access denied.")
        return redirect('home')

    recipe = get_object_or_404(Recipe, id=recipe_id)

    if request.method == 'POST':
        recipe.delete()
        messages.success(request, 'Recipe deleted successfully.')
        return redirect('admin_recipes')

    return redirect('admin_recipes')



# ─────────────────────────────
#  Users List (Admin Only)
# ─────────────────────────────
@login_required
def users_list(request):
    if not request.user.is_staff:
        messages.error(request, "Access denied.")
        return redirect('home')

    User = get_user_model()

    users = User.objects.all().order_by('-date_joined')

    return render(request, 'main/users_list.html', {
        'users': users
    })


@staff_member_required
def delete_user_view(request, user_id):
    user = get_object_or_404(User, id=user_id)

    # prevent deleting yourself
    if user == request.user:
        messages.error(request, "You cannot delete your own account.")
        return redirect('users_list')

    if request.method == 'POST':
        user.delete()
        messages.success(request, f'User "{user.username}" deleted successfully.')

    return redirect('users_list')

@login_required
@require_POST
def make_admin_view(request, user_id):
    user = get_object_or_404(User, id=user_id)

    user.is_staff = True
    user.save()

    return redirect('users_list')


@staff_member_required
@require_POST
def remove_admin_view(request, user_id):
    user = get_object_or_404(User, id=user_id)

    # prevent removing yourself
    if user == request.user:
        messages.error(request, "You cannot remove your own admin access.")
        return redirect('users_list')

    user.is_staff = False
    user.save()
    messages.success(request, f'Admin removed from {user.username}.')

    return redirect('users_list')
    
# ─────────────────────────────
#  Admin Dashboard
# ─────────────────────────────
@login_required
def admin_dashboard_view(request):
    if not request.user.is_staff:
        messages.error(request, "Access denied.")
        return redirect('home')
    recipes = Recipe.objects.all().select_related('author', 'category').order_by('-created_at')
    return render(request, 'main/admin_dashboard.html', {'recipes': recipes})


# ─────────────────────────────
#  Delete Recipe
# ─────────────────────────────
@login_required
def delete_recipe_view(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    if not request.user.is_staff and recipe.author != request.user:
        messages.error(request, "Permission denied.")
        return redirect('home')
    if request.method == 'POST':
        recipe.delete()
        messages.success(request, 'Recipe deleted successfully.')
        return redirect('admin_dashboard')
    return redirect('admin_dashboard')


# ─────────────────────────────
#  Toggle Favourite (form-based)
# ─────────────────────────────
@login_required
def toggle_favourite_view(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    fav, created = Favourite.objects.get_or_create(user=request.user, recipe=recipe)
    if not created:
        fav.delete()
        messages.info(request, f'Removed "{recipe.title}" from favourites.')
    else:
        messages.success(request, f'Added "{recipe.title}" to favourites!')
    next_url = request.POST.get('next', request.META.get('HTTP_REFERER', 'home'))
    return redirect(next_url)


# ─────────────────────────────
#  Favourites Page
# ─────────────────────────────

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


# ─────────────────────────────
#  Toggle Favourite (AJAX)
# ─────────────────────────────
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
