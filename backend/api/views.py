from django.http import JsonResponse

# Create your views here.


def get_routes_view(request):

    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return JsonResponse(routes, safe=False)
