# -*- coding:utf-8 -*-

from models import Notebook, Note, Tag
from serializers import NotebookSerializer, NoteSerializer, TagSerializer, TrashNoteSerializer
from rest_framework import permissions

from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import list_route, detail_route
from rest_framework import status


class NotebookViewSet(viewsets.ModelViewSet):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (permissions.IsAuthenticated,)

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @detail_route(methods=['put'])
    def trash(self, request, pk=None):
        note = self.get_object()
        serializer = TrashNoteSerializer(data=request.data)
        if serializer.is_valid():
            note.IsTrash = serializer.data['IsTrash']
            note.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get'])
    def sub_list(self, request, *args, **kwargs):
        notebook_id = request.GET["notebookId"]
        try:
            # notes = Note.objects.filter(NotebookId="583d31a22638431de7000000")
            notes = Note.objects.filter(NotebookId=notebook_id, IsTrash=False, IsDeleted=False)
        except Note.DoesNotExist:
            return Response({"status": "query info is not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = NoteSerializer(notes, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


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

