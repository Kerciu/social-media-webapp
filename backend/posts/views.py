from django.http import JsonResponse
from .models import Post


def posts_list_view(request, *args, **kwargs):
    queryset = Post.objects.all()
    data = list(queryset.values())
    return JsonResponse(data, safe=False)


def post_details_view(request, id, *args, **kwargs):
    data = {'id': id}
    STATUS = 200

    try:
        obj = Post.objects.get(id=id)
        data['title'] = obj.title
        data['body'] = obj.body
        data['image'] = obj.image.url
        data['created_at'] = obj.created_at

    except Post.DoesNotExist:
        data['message'] = 'Not found'
        STATUS = 404

    data = {
        'title': obj.title,
        'body': obj.body,
        'image': obj.image.url,
        'created_at': obj.created_at,
    }

    return JsonResponse(data, status=STATUS)
