from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenObtainPairSerializer
)

from .models import CustomUser
from .serializers import CustomUserSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
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
        except:
            return Response({'success': False})


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


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

    except:
        return Response(
            {'error': 'User while getting user data'},
            status=404
        )
