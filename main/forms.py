from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User, Recipe

# ─────────────────────────────
#  Auth Forms 
# ─────────────────────────────
class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'
            field.widget.attrs['placeholder'] = field.label


class LoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'


# ─────────────────────────────
#  Recipe Form 
# ─────────────────────────────
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
