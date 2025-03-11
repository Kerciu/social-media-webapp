from rest_framework import serializers

from .models import CustomUser, Post


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

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken.")
        return value

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value


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


class PostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField('get_username')
    like_count = serializers.SerializerMethodField('get_like_count')
    formatted_date = serializers.SerializerMethodField('get_formatted_date')

    class Meta:
        model = Post
        fields = [
            'id',
            'username',
            'description',
            'formatted_date',
            'likes',
            'like_count'
        ]

    def get_username(self, obj):
        return obj.user.username

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_formatted_date(self, obj):
        return obj.created_at.strftime('%b %d, %Y')
