"""
URL configuration for recipe_project project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

# Redirects for old static .html files so they don't 404
html_redirects = [
    path('login.html',        RedirectView.as_view(pattern_name='login',       permanent=True)),
    path('register.html',     RedirectView.as_view(pattern_name='register',    permanent=True)),
    path('home.html',         RedirectView.as_view(pattern_name='home',        permanent=True)),
    path('ourRecipes.html',   RedirectView.as_view(pattern_name='our_recipes', permanent=True)),
    path('aboutUs.html',      RedirectView.as_view(pattern_name='about',       permanent=True)),
    path('contactUs.html',    RedirectView.as_view(pattern_name='contact',     permanent=True)),
    path('addRecipe.html',    RedirectView.as_view(pattern_name='add_recipe',  permanent=True)),
    path('profilePage.html',  RedirectView.as_view(pattern_name='profile',     permanent=True)),
    path('adminDashboard.html', RedirectView.as_view(pattern_name='admin_recipes', permanent=True)),
    path('breakfast_recipes.html', RedirectView.as_view(pattern_name='breakfast', permanent=True)),
    path('lunch_recipes.html',     RedirectView.as_view(pattern_name='lunch',     permanent=True)),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
] + html_redirects

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
