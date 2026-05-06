from django import forms
from .models import Recipe


class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ['title', 'description', 'ingredients', 'instructions', 'category', 'image']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'e.g. Creamy Mushroom Pasta',
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-input',
                'rows': 3,
                'placeholder': 'A short description of the dish...',
            }),
            'ingredients': forms.Textarea(attrs={
                'class': 'form-input',
                'rows': 5,
                'placeholder': 'One ingredient per line:\n2 cups flour\n1 tsp salt\n...',
            }),
            'instructions': forms.Textarea(attrs={
                'class': 'form-input',
                'rows': 6,
                'placeholder': 'One step per line:\n1. Preheat oven...\n2. Mix ingredients...',
            }),
            'category': forms.Select(attrs={
                'class': 'form-input',
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-file-input',
                'accept': 'image/*',
            }),
        }
        labels = {
            'title': 'Recipe Title',
            'description': 'Short Description',
            'ingredients': 'Ingredients',
            'instructions': 'Instructions',
            'category': 'Category',
            'image': 'Recipe Image',
        }
