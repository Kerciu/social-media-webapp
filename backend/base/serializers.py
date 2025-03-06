from rest_framework import serializers

from .models import CustomUser


class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'password'
        ]

    def create(self, credentials):
        user = CustomUser(
            username=credentials['username'],
            email=credentials['email'],
            first_name=credentials['first_name'],
            last_name=credentials['last_name']
        )
        user.set_password(credentials['password'])
        user.save()
        return user


class CustomUserSerializer(serializers.ModelSerializer):

    follower_count = serializers.SerializerMethodField('get_follower_count')
    following_count = serializers.SerializerMethodField('get_following_count')

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'bio',
            'profile_img',
            'follower_count',
            'following_count'
        ]

    def get_follower_count(self, obj):
        return obj.followers_list.count()

    def get_following_count(self, obj):
        return obj.following.count()
