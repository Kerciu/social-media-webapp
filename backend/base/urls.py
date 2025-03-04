from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from posts.views import posts_list_view, post_details_view
from .views import get_user_profile_data

urlpatterns = [
    path('user-data/<str:username>/', get_user_profile_data)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
