# -*- coding:utf-8 -*-

from models import Notebook, Note, Tag, Album
from serializers import NotebookSerializer, NoteSerializer, TagSerializer, TrashNoteSerializer, AlbumSerializer
from rest_framework import permissions

from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import list_route, detail_route
from rest_framework import status
from django.db.models import Q


import json
import hashlib


def get_md5_value(src):
    m = hashlib.md5()
    m.update(src)
    m_digest = m.hexdigest()
    return m_digest


def get_sha1_value(src):
    sha1 = hashlib.sha1()
    sha1.update(src)
    sha1_digest = sha1.hexdigest()
    return sha1_digest

class NotebookViewSet(viewsets.ModelViewSet):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (permissions.IsAuthenticated,)

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    res = {"Ok": False,
           "Code": 0,
           "Id": "",
           "Item": None,
           "List": None,
           "Msg": ""
           }
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

    @list_route(methods=['post'])
    def update_note_or_content(self, request, *args, **kwargs):
        # updateNoteOrContent
        is_new = request.POST.get('IsNew')
        if is_new == "true":
            serializer = NoteSerializer(data=request.data,context={'request': request})
        else:
            note_id = request.POST.get('NoteId')
            note = Note.objects.get(NoteId=note_id)
            # note.UpdatedTime =
            serializer = NoteSerializer(note, data=request.data, context={'request': request})

        if serializer.is_valid():
            en_tags = request.POST.get('Tags').split(',')
            zh_tags = []
            for en_tag in en_tags:
                if en_tag == 'red':
                    zh_tags.append('红色'.decode('utf8'))
                elif en_tag == 'yellow':
                    zh_tags.append('黄色'.decode('utf8'))
                elif en_tag == 'green':
                    zh_tags.append('绿色'.decode('utf8'))
                elif en_tag == 'blue':
                    zh_tags.append('蓝色'.decode('utf8'))
                else:
                    zh_tags.append(en_tag)

            serializer.save(Tags = zh_tags)
            self.res["Ok"] = True
            self.res["Item"] = serializer.data
            return Response(self.res, status=status.HTTP_200_OK)
        else:
            self.res["Ok"] = False
            self.res["Item"] = serializer.errors
            return Response(self.res, status=status.HTTP_400_BAD_REQUEST)

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

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permissions_class = (permissions.IsAuthenticated)

    res = {"Ok": False,
           "Code": 0,
           "Id": "",
           "Item": None,
           "List": None,
           "Msg": ""
           }
    @list_route(methods=['get'])
    def get_album(self, request):
        try:
            albums = Album.objects.get(~Q(AlbumId= ''))
        except Album.DoesNotExist:
            return Response([])

        serializer = AlbumSerializer(data=albums, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def add_album(self, request):
        data = {}
        data["Name"] = request.GET.get('name')
        data["AlbumId"] = get_md5_value(data["Name"])
        print "aaaaaaaaaaaaaaaaaaaaaa"
        # 2b993227b7c83044b6a4d6d578a12dd1                                                                                                # e51432dafa42ef17eb5ba29afac52a6e6a746529
        print get_md5_value(data["Name"]) #pic2 #57cccf2aab644133ed0714c2
        print get_sha1_value(data["Name"])

        serializer = AlbumSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            self.res["Ok"] = False
            self.res["Item"] = serializer.errors
            return Response(self.res, status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get'])
    def update_album(self, request):
        album_id = request.GET.get('albumId')
        name = request.GET.get('name')
        try:
            album = Album.objects.get(AlbumId=album_id)
        except Album.DoesNotExist:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

        album.name = name
        album.save()
        return Response(True, status=status.HTTP_200_OK)

    @list_route(methods=['get'])
    def delete_album(self, request):
        album_id = request.GET.get('albumId')
        try:
            album = Album.objects.get(AlbumId=album_id)
        except Album.DoesNotExist:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

        album.delete()
        try:
            album.save()
            self.res["Ok"] = True
            return Response(self.res, status=status.HTTP_200_OK)
        except Exception, e:
            self.res["Ok"] = False
            return Response(self.res, status=status.HTTP_400_BAD_REQUEST)

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permissions_class = (permissions.IsAuthenticated)

    res = {"Ok": False,
           "Code": 0,
           "Id": "",
           "Item": None,
           "List": None,
           "Msg": ""
           }

    @list_route(methods=["POST"])
    def upload_image(self, request):
        pass

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permissions_class = (permissions.IsAuthenticated)

    res = {"Ok": False,
           "Code": 0,
           "Id": "",
           "Item": None,
           "List": None,
           "Msg": ""
           }

    @list_route(methods=['post'])
    def update_tag(self, request):
        tag = request.POST.get("tag")
        tag_obj = Tag.objects.filter(Tag=tag)
        if tag_obj.count() == 0:
            # 如果沒有该标签
            data = {}
            # tag_str_num = len(tag) # 首先获取要加密的字符串的长度
            # m = md5() # 创建md5对象
            # m.update(str(tag_str_num))
            # TagId = m.hexdigest()
            data["TagId"] = get_md5_value(tag)
            data["Count"] = 1
            data["Tag"] = tag
            serializer = TagSerializer(data=data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                self.res["Ok"] = True
                self.res["Item"] = serializer.data
                return Response(self.res, status=status.HTTP_200_OK)
            else:
                self.res["Ok"] = False
                self.res["Item"] = serializer.errors
                return Response(self.res, status=status.HTTP_400_BAD_REQUEST)
        else:
            # 如果已有该标签
            tag_obj = tag_obj[0]
            tag_obj.count = tag_obj.Count + 1
            tag_obj.save()
            serializer = TagSerializer(tag_obj, context={'request': request})
            self.res["Ok"] = True
            self.res["Item"] = serializer.data
            return Response(self.res,  status=status.HTTP_200_OK)

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

