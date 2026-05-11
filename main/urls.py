# main/urls.py

from django.urls import path
from . import views

urlpatterns = [

    # ───────────────── HOME ─────────────────
    path('', views.home, name='home'),

    # ───────────────── RECIPES ─────────────────
    path('recipes/', views.recipes_view, name='recipes'),

    path('recipe/<int:recipe_id>/',
         views.recipe_detail_view,
         name='recipe_detail'),

    path('recipes/breakfast/',
         views.breakfast_view,
         name='breakfast'),

    path('recipes/lunch/',
         views.lunch_view,
         name='lunch'),

    path('recipes/dinner/',
         views.dinner_view,
         name='dinner'),

    path('recipes/dessert/',
         views.dessert_view,
         name='dessert'),

    path('search/',
         views.search_view,
         name='search'),

    # ───────────────── AUTH ─────────────────
    path('login/',
         views.login_view,
         name='login'),

<<<<<<< HEAD
    path('recipe/<int:recipe_id>/',      views.recipe_detail_view,   name='recipe_detail'),
    path('recipes/breakfast/',           views.breakfast_view,        name='breakfast'),
    path('recipes/lunch/',               views.lunch_view,            name='lunch'),
    path('admin-dashboard/',             views.admin_dashboard_view,  name='admin_dashboard'),
    path('delete-recipe/<int:recipe_id>/', views.delete_recipe_view, name='delete_recipe'),
    path('favourite/<int:recipe_id>/',   views.toggle_favourite_view, name='toggle_favourite'),
    path('favourites/',                  views.favourites_view,       name='favourites'),
]
=======
    path('register/',
         views.register_view,
         name='register'),
>>>>>>> e3dbe52 (update)

    path('logout/',
         views.logout_view,
         name='logout'),

    # ───────────────── USER ─────────────────
    path('profile/',
         views.profile_view,
         name='profile'),

    path('add-recipe/',
         views.add_recipe_view,
         name='add_recipe'),

    path('edit-recipe/<int:recipe_id>/',
         views.edit_recipe_view,
         name='edit_recipe'),

    path('delete-recipe/<int:recipe_id>/',
         views.delete_recipe_view,
         name='delete_recipe'),

    # ───────────────── CONTACT ─────────────────
    path('about/',
         views.about_view,
         name='about'),

    path('contact/',
         views.contact_view,
         name='contact'),

    path('contact/success/',
         views.contact_success_view,
         name='contact_success'),

    # ───────────────── FAVOURITES ─────────────────
    path('favourites/',
         views.favourites_view,
         name='favourites'),

    path('favourites/toggle/<int:recipe_id>/',
         views.toggle_favourite,
         name='toggle_favourite'),

    path('favourite/<int:recipe_id>/',
         views.toggle_favourite_view,
         name='toggle_favourite_view'),

    # ───────────────── ADMIN DASHBOARD ─────────────────
    path('admin-dashboard/',
         views.admin_dashboard_view,
         name='admin_dashboard'),

    # ───────────────── ADMIN RECIPES ─────────────────
    path('admin/recipes/',
         views.admin_recipes_view,
         name='admin_recipes'),

    path('admin/recipes/add/',
         views.admin_add_recipe_view,
         name='admin_add_recipe'),

    path('admin/recipes/edit/<int:recipe_id>/',
         views.admin_edit_recipe_view,
         name='admin_edit_recipe'),

    path('admin/recipes/delete/<int:recipe_id>/',
         views.admin_delete_recipe_view,
         name='admin_delete_recipe'),

    # ───────────────── USER MANAGEMENT ─────────────────
    path('users/',
         views.users_list,
         name='users_list'),

    path('users/delete/<int:user_id>/',
         views.delete_user_view,
         name='delete_user'),

    path('users/make-admin/<int:user_id>/',
         views.make_admin_view,
         name='make_admin'),

    path('users/remove-admin/<int:user_id>/',
         views.remove_admin_view,
         name='remove_admin'),
]