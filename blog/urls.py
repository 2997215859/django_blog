from django.conf.urls import url
from django.contrib import admin

from . import views
urlpatterns = [
    url(r'^index/$', views.index),
    url(r'^article/(?P<article_id>\d+)$', views.article_page, name='article_page')
]
