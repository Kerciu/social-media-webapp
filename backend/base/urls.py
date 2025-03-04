from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from posts.views import posts_list_view, post_details_view

urlpatterns = [
    path('api/posts/', posts_list_view),
    path('api/posts/<int:id>/', post_details_view),
    path('api/auth/', include('api.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
