from django.conf.urls import url, include
from . import views
urlpatterns = [
    url(r'^index/$', views.index),
]
# getNoteContent?noteId = 5848
# ecbf26384336a4000001