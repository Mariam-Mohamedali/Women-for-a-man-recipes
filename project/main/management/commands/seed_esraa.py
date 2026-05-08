"""
Run:  python manage.py seed_esraa
Creates (or updates) the Esraa staff account.
Esraa handles: Search, remaining categories, and all user management.
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Create / update Esraa as a staff (admin) user'

    def handle(self, *args, **options):
        username = 'Esraa'
        email = 'esraa@wfm.com'
        password = 'esraa1234'   # change after first login

        user, created = User.objects.get_or_create(
            username=username,
            defaults={'email': email}
        )
        user.is_staff = True          # can access admin-only views
        user.is_superuser = False     # not a Django superuser
        user.set_password(password)
        user.save()

        action = 'Created' if created else 'Updated'
        self.stdout.write(
            self.style.SUCCESS(
                f'{action} staff user "{username}" '
                f'(email: {email}, password: {password})'
            )
        )
