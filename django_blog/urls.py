"""django_blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

from api_note.views import NotebookViewSet, NoteViewSet, TagViewSet, AlbumViewSet
from user_group.views import UserViewSet, GroupViewSet

api_router = DefaultRouter()
api_router.register(r'tag', TagViewSet)
api_router.register(r'notebook', NotebookViewSet)
api_router.register(r'user', UserViewSet)
api_router.register(r'group', GroupViewSet)
api_router.register(r'note', NoteViewSet)
api_router.register(r'album', AlbumViewSet)



schema_view = get_schema_view(title='Pastebin API')
urlpatterns = [
    url(r'^api/', include(api_router.urls)),
    url(r'^note/', include('note.urls', namespace='note')),
    url(r'^schema/$', schema_view),
    url(r'blog/', include('blog.urls', namespace = 'blog')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
]

