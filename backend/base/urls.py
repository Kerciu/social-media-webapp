from django.urls import path

from django.conf import settings
from django.conf.urls.static import static

from .views import (
    get_user_profile_data,
    register_user,
    authenticated,
    toggle_follow,
    get_user_posts,
    toggle_like,
    CustomTokenObtainPairView,
    CustomTokenRefreshView
)

urlpatterns = [
    path('user-data/<str:username>/', get_user_profile_data),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user),
    path('authenticated/', authenticated),
    path('toggle-follow/', toggle_follow),
    path('user-posts/<str:username>/', get_user_posts),
    path('like-post/', toggle_like)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
