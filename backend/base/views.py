from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .models import CustomUser, Post
from .serializers import (
    CustomUserSerializer,
    UserRegisterSerializer,
    PostSerializer
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def authenticated(request):
    return Response('authenticated')


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            tokens = super().post(request, *args, **kwargs).data
            access_token = tokens['access']
            refresh_token = tokens['refresh']
            res = Response()

            res.data = {'success': True}
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )

            return res
        except Exception:
            return Response({'success': False})


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens['access']

            res = Response()
            res.data = {'success': True}
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )

            return res
        except Exception:
            return Response({'success': False})


@api_view(['POST'])
def register_user(request):
    try:
        data = request.data
        serializer = UserRegisterSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

    except Exception as e:
        return Response(
            {'error': 'User while registering user: ' + str(e)},
            status=404
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile_data(request, username):
    try:
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'User does not exist'},
                status=404
            )

        serializer = CustomUserSerializer(user, many=False)

        data = serializer.data
        data['is_logged_user'] = request.user.username == username
        data['is_following'] = request.user in user.followers_list.all()

        return Response(data)

    except Exception as e:
        return Response(
            {'error': 'User while getting user data: ' + str(e)},
            status=404
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_follow(request):
    try:
        username_to_follow = request.data.get('username')
        if not username_to_follow:
            return Response({'error': 'Username is required'}, status=400)

        user = request.user
        try:
            user_to_follow = CustomUser.objects.get(username=username_to_follow)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)

        if user == user_to_follow:
            return Response({'error': 'You cannot follow yourself'}, status=400)

        if user in user_to_follow.followers_list.all():
            user_to_follow.followers_list.remove(user)
            return Response({'success': 'User unfollowed', 'now_following': False}, status=200)
        else:
            user_to_follow.followers_list.add(user)
            return Response({'success': 'User followed', 'now_following': True}, status=200)

    except KeyError:
        return Response({'error': 'Invalid request data'}, status=400)
    except Exception as e:
        return Response({'error': f'An error occurred: {str(e)}'}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(request, username):
    try:
        try:
            user = CustomUser.objects.get(username=username)
            logged_user = CustomUser.objects.get(username=request.user.username)

        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'User does not exist'},
                status=404
            )

        posts = user.posts.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)

        data = [
            {**post, 'liked': logged_user.username in post['likes']}
            for post in serializer.data
        ]

        return Response(data)

    except Exception as e:
        return Response(
            {'error': 'User while getting user posts: ' + str(e)},
            status=404
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request):
    try:
        try:
            post = Post.objects.get(id=request.data.get('id'))
            user = request.user

        except Post.DoesNotExist:
            return Response(
                {'error': 'Post does not exist'},
                status=404
            )

        if user in post.likes.all():
            post.likes.remove(user)
            return Response({'liked': False}, status=200)

        post.likes.add(user)
        return Response({'liked': True}, status=200)

    except Exception as e:
        return Response(
            {'error': 'Failed to like the post: ' + str(e)},
            status=404
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    try:
        data = request.data

        try:
            user = CustomUser.objects.get(username=request.user.username)
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'User does not exist'},
                status=404
            )

        post = Post.objects.create(
            user=user,
            description=data['description']
        )

        serializer = PostSerializer(post, many=False)
        return Response(serializer.data)

    except Exception as e:
        return Response(
            {'error': 'Failed to create the post: ' + str(e)},
            status=404
        )
