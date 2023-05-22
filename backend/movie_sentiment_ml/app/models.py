from datetime import date, datetime
from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

# # Create your models here.




class AppUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    dob = models.DateField(blank = True, null = True)
    
    # class Meta:
    #     ordering = ['created_at']
        
class UserMood(models.Model):
    
    mood_id = models.AutoField(primary_key = True) 
    user_id = models.OneToOneField(AppUser,on_delete = models.CASCADE)
    current_mood = models.CharField(max_length= 511)
    set_time = models.DateTimeField(auto_now_add=True)