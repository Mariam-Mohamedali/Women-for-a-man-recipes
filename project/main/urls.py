from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),

    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),

    path('profile/', views.profile_view, name='profile'),
    path('add-recipe/', views.add_recipe_view, name='add_recipe'),
    path('edit-recipe/<int:recipe_id>/', views.edit_recipe_view, name='edit_recipe'),
    path('delete-recipe/<int:recipe_id>/', views.delete_recipe_view, name='delete_recipe'),

    path('favourite/<int:recipe_id>/', views.toggle_favourite, name='toggle_favourite'),

    path('about/', views.home, name='about'),
    path('contact/', views.home, name='contact'),
    path('favourites/', views.profile_view, name='favourites'),
    path('admin-recipes/', views.our_recipes, name='admin_recipes'),

    # Recipe categories
    path('our-recipes/', views.our_recipes, name='our_recipes'),
    path('breakfast/', views.breakfast, name='breakfast'),
    path('lunch/', views.lunch, name='lunch'),
    path('dinner/', views.dinner, name='dinner'),
    path('dessert/', views.dessert, name='dessert'),
    path('recipe/<int:recipe_id>/', views.recipe_details, name='recipe_details'),

    # Search
    path('search/', views.search_recipes, name='search_recipes'),

    # User management
    path('users/', views.users_list, name='users_list'),
    path('delete-user/<int:user_id>/', views.delete_user, name='delete_user'),
]
