# -*- coding:utf-8 -*-

from models import Notebook, Note, Tag
from serializers import NotebookSerializer, NoteSerializer, TagSerializer
from rest_framework import permissions

from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework import permissions

class NotebookViewSet(viewsets.ModelViewSet):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated,)

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permissions_class = (permissions.IsAuthenticated)
# class NotebookList(generics.ListCreateAPIView):
#     """
#     列出所有的notebook,或者新建一个新的notebook
#     """
#     queryset = Notebook.objects.all()
#     serializer_class = NotebookSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#     def get(self, request, *args, **kwarg):
#         return self.list(request, *args, **kwarg)
#
#     def post(self, request, *args, **kwarg):
#         return self.create(request, *args, **kwarg)
#
#     def perform_create(self, serializer):
#         serializer.save(Owner=self.request.user)
#
# class NotebookDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Notebook.objects.all()
#     serializer_class = NotebookSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)
#
#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)
#
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)

