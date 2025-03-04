from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True, primary_key=True)

    bio = models.CharField(max_length=500, null=True, blank=True)

    profile_img = models.ImageField(
        upload_to='profile_images/',
        null=True,
        blank=True
    )

    followers_list = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False,
        related_name='following'
    )

    def __str__(self):
        return self.username
