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

import json

class NotebookViewSet(viewsets.ModelViewSet):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (permissions.IsAuthenticated,)

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @list_route(methods=['post'])
    def move_note(self, request):
        notebook_id = request.POST.getlist("notebookId")[0]
        note_ids = request.POST.getlist("noteIds[]", [])
        move_num = 0

        for note_id in note_ids:
            try:
                note = Note.objects.get(NoteId=note_id)
                pre_notebook = Notebook.objects.get(NotebookId=note.NotebookId)
            except Note.DoesNotExist:
                return Response({"status": "query info is not found"}, status=status.HTTP_404_NOT_FOUND)
            except Notebook.DoesNotExist:
                return Response({"status": "query info is not found"}, status=status.HTTP_404_NOT_FOUND)

            pre_notebook.NumberNotes -= 1
            pre_notebook.save()
            note.NotebookId = notebook_id
            note.save()
            move_num = move_num + 1

        try:
            notebook = Notebook.objects.get(NotebookId=notebook_id)
        except Notebook.DoesNotExist:
            return Response({"status": "query info is not found"}, status=status.HTTP_404_NOT_FOUND)

        notebook.NumberNotes += move_num
        notebook.save()

        return Response(True)

    @list_route(methods=['post'])
    def trash_note(self, request):
        note_ids = request.POST.getlist('noteIds[]', [])
        for note_id in note_ids:
            try:
                note = Note.objects.get(NoteId = note_id)
            except Note.DoesNotExist:
                return Response({"status": "query info is not found"}, status=status.HTTP_404_NOT_FOUND)
            note.IsTrash = True
            note.save()
        return Response(True)

    @list_route(methods=['get'])
    def trash_list(self, request):
        try:
            notes = Note.objects.filter(IsTrash=True)
        except Note.DoesNotExist:
            return Response({"status": "query info is not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = NoteSerializer(notes, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

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

