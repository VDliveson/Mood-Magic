from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from app.models import AppUser,UserMood

class UserMoodAdmin(admin.ModelAdmin):
    list_display = ('current_mood', 'set_time', 'mood_id','user_id')

admin.site.register(AppUser, UserAdmin)
admin.site.register(UserMood,UserMoodAdmin)