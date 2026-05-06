from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('recipes/', views.home, name='recipes'),
    path('login/', views.home, name='login'),
    path('register/', views.home, name='register'),
    path('logout/', views.home, name='logout'),
    path('profile/', views.profile_view, name='profile'),
    path('add-recipe/', views.add_recipe_view, name='add_recipe'),
    path('edit-recipe/<int:recipe_id>/', views.edit_recipe_view, name='edit_recipe'),
    path('about/', views.home, name='about'),
    path('contact/', views.home, name='contact'),
    path('favourites/', views.home, name='favourites'),
    path('admin-recipes/', views.home, name='admin_recipes'),
]