from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('recipes/', views.home, name='recipes'),
    path('about/', views.home, name='about'),
    path('contact/', views.home, name='contact'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
   
    path('profile/', views.home, name='profile'),
    path('favourites/', views.home, name='favourites'),
    path('add-recipe/', views.home, name='add_recipe'),
    path('admin-recipes/', views.home, name='admin_recipes'),   
]