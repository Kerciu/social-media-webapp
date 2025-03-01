from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['GET'])
def get_routes_view(request):

    routes = [
        '/api/auth/token',
        '/api/auth/token/refresh',
    ]

    return Response(routes)
