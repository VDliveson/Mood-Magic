from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from app.models import AppUser,UserMood

admin.site.register(AppUser, UserAdmin)
admin.site.register(UserMood)