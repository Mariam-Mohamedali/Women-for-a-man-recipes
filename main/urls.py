from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('recipes/', views.home, name='recipes'),

    # Auth (Shaza)
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),

    # Profile & Recipes (Mariam)
    path('profile/', views.profile_view, name='profile'),
    path('add-recipe/', views.add_recipe_view, name='add_recipe'),
    path('edit-recipe/<int:recipe_id>/', views.edit_recipe_view, name='edit_recipe'),

    # Placeholders for other team members
    path('about/', views.home, name='about'),
    path('contact/', views.home, name='contact'),
    path('favourites/', views.home, name='favourites'),
    path('admin-recipes/', views.home, name='admin_recipes'),
]