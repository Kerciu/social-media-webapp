from rest_framework import serializers

from .models import CustomUser


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
