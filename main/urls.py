# main/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # ── Home ────────────────────────────────────────────────
    path('', views.home, name='home'),
   path('recipes/', views.recipes_view, name='recipes'),


    # ── Auth ────────────────────────────────────────────────
    path('login/',    views.login_view,    name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/',   views.logout_view,   name='logout'),

    # ── User ────────────────────────────────────────────────
    path('profile/',                     views.profile_view,     name='profile'),
    path('add-recipe/',                  views.add_recipe_view,  name='add_recipe'),
    path('edit-recipe/<int:recipe_id>/', views.edit_recipe_view, name='edit_recipe'),


    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('contact/success/', views.contact_success_view, name='contact_success'),
    path('favourites/', views.favourites_view, name='favourites'),
   path('favourites/toggle/<int:recipe_id>/', views.toggle_favourite, name='toggle_favourite'),


  
    path('admin-recipes/', views.home, name='admin_recipes'),


    path('recipe/<int:recipe_id>/',      views.recipe_detail_view,   name='recipe_detail'),
    path('recipes/breakfast/',           views.breakfast_view,        name='breakfast'),
    path('recipes/lunch/',               views.lunch_view,            name='lunch'),
    path('admin-dashboard/',             views.admin_dashboard_view,  name='admin_dashboard'),
    path('delete-recipe/<int:recipe_id>/', views.delete_recipe_view, name='delete_recipe'),
    path('favourite/<int:recipe_id>/',   views.toggle_favourite_view, name='toggle_favourite'),
    path('favourites/',                  views.favourites_view,       name='favourites'),
]

