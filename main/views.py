from django.shortcuts import render
from .models import Recipe

def home(request):
    recipes = Recipe.objects.all().order_by('-created_at')[:8]  
    context = {
        'recipes': recipes,
    }
    return render(request, 'main/home.html', context)