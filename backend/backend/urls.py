from django.contrib import admin
from django.urls import path, include

from posts.views import posts_list_view, post_details_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', posts_list_view),
    path('api/posts/<int:id>/', post_details_view),
    path('api/auth/', include('api.urls'))
]
