from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .models import CustomUser
from .serializers import CustomUserSerializer


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
        except Exception as e:
            return Response({'success': False, 'error': str(e)})


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
        except Exception as e:
            return Response({'success': False, 'error': str(e)})


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

        return Response(serializer.data)

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=404
        )
