from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('recipes/', views.home, name='recipes'),
    path('recipe/<int:recipe_id>/', views.recipe_detail_view, name='recipe_detail'),

    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),

    path('profile/', views.profile_view, name='profile'),
    path('add-recipe/', views.add_recipe_view, name='add_recipe'),
    path('edit-recipe/<int:recipe_id>/', views.edit_recipe_view, name='edit_recipe'),

    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('contact/success/', views.contact_success_view, name='contact_success'),
    path('favourites/', views.favourites_view, name='favourites'),
   path('favourites/toggle/<int:recipe_id>/', views.toggle_favourite, name='toggle_favourite'),

    path('admin-recipes/', views.home, name='admin_recipes'),
]
