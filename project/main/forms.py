from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User, Recipe


# ─────────────────────────────
#  Auth Forms
# ─────────────────────────────
class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True, label='E-mail Address')
    is_admin = forms.ChoiceField(
        choices=[('false', 'Regular User'), ('true', 'Admin')],
        widget=forms.RadioSelect,
        initial='false',
        required=True,
        label='Account Type',
    )

    class Meta(UserCreationForm.Meta):
        model = User
        # Only list actual model fields here — password1/password2 are
        # added automatically by UserCreationForm as extra form fields,
        # NOT as Meta fields. Listing them here causes silent failures.
        fields = ('username', 'email')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove usable_password field added in Django 4.2+ — not needed
        self.fields.pop('usable_password', None)
        for name, field in self.fields.items():
            if not isinstance(field.widget, forms.RadioSelect):
                field.widget.attrs['class'] = 'form-control'

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if self.cleaned_data.get('is_admin') == 'true':
            user.is_staff = True
        if commit:
            user.save()
        return user


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
