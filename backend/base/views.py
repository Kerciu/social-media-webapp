from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import CustomUser
from .serializers import CustomUserSerializer


@api_view(['GET'])
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
