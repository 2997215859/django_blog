from django.conf.urls import url
from django.contrib import admin

from . import views
urlpatterns = [
    url(r'^index/$', views.index, name = "index"),
    url(r'^article/(?P<article_id>\d+)$', views.article_page, name = 'article_page'),
    url(r'^archive/$', views.archive, name = 'archive'),
    url(r'^tag/(?P<tag_name>\w+)$', views.search_tag, name = "search_tag"),
    url(r'^aboutme/$', views.about_me, name = "about_me"),
    url(r'^search/$', views.search_str, name = "search"),
    url(r'^feed/$', views.RSSFeed(), name = "RSS")
]
