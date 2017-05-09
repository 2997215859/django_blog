# -*- coding:utf-8 -*-

from models import Notebook, Note, Tag, Album, Image
from serializers import NotebookSerializer, NoteSerializer, TagSerializer, TrashNoteSerializer, AlbumSerializer, ImageSerializer, GetNoteContentSerializer
from rest_framework import permissions
from django.http import HttpResponse
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import list_route, detail_route
from rest_framework import status
from django.db.models import Q

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

import json, os
import hashlib
import time
from django.utils.http import urlquote

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

def get_file_sha1(filepath):
    with open(filepath,'rb') as f:
        sha1obj = hashlib.sha1()
        sha1obj.update(f.read())
        hash = sha1obj.hexdigest()
        print(hash)
        return hash

def get_file_md5(filepath_or_file):
    if isinstance(filepath_or_file, str):
        with open(filepath_or_file,'rb') as f:
            md5obj = hashlib.md5()
            md5obj.update(f.read())
            hash = md5obj.hexdigest()
            print("test1 : " + hash)
            return hash
    else:
        md5obj = hashlib.md5()
        md5obj.update(filepath_or_file.read())
        hash = md5obj.hexdigest()
        print("test2 : " + hash)
        return hash


#大文件的MD5值
def get_super_file_md5(filename):
    if not os.path.isfile(filename):
        return
    myhash = hashlib.md5()
    f = file(filename,'rb')
    while True:
        b = f.read(8096)
        if not b :
            break
        myhash.update(b)
    f.close()
    return myhash.hexdigest()

class NotebookViewSet(viewsets.ModelViewSet):
    queryset = Notebook.objects.all()
    serializer_class = NotebookSerializer
    permission_classes = (permissions.IsAuthenticated,)

    res = {"Ok": False,
           "Code": 0,
           "Id": "",
           "Item": None,
           "List": None,
           "Msg": ""
           }
    @list_route(methods=['post'])
    def update_notebook_title(self, request, *args, **kwargs):
        notebook_id = request.POST.get('notebookId')
        title = request.POST.get('title')
        try:
            notebook = Notebook.objects.get(NotebookId=notebook_id)
        except Notebook.DoesNotExist:
            return Response(False, status=status.HTTP_404_NOT_FOUND)

        notebook.Title = title
        notebook.save()
        return Response(True, status=status.HTTP_200_OK)

    @list_route(methods=['post'])
    def add_notebook(self, request, *args, **kwargs):

        data = {}
        data["NotebookId"] = request.POST.get("notebookId")
        data["Title"] = request.POST.get("title")
        data["UrlTitle"] = request.POST.get("title")
        data["ParentNotebookId"] = request.POST.get("parentNotebookId")
        serializer = NotebookSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception, e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @list_route(methods=['get'])
    def delete_notebook(self, request, *args, **kwargs):

        notebook_id = request.GET.get("notebookId")
        try:
            notebook = Notebook.objects.get(NotebookId=notebook_id)
        except Notebook.DoesNotExist:
            self.res["Ok"] = False
            return Response(self.res, status=status.HTTP_404_NOT_FOUND)


        try:
            notebook.IsDeleted = True
            notebook.delete()
            self.res["Ok"] = True
            return Response(self.res, status=status.HTTP_200_OK)
        except Exception, e:
            self.res["Ok"] = False
            return Response(self.res, status=status.HTTP_400_BAD_REQUEST)

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
                return Response(False, status=status.HTTP_404_NOT_FOUND)
            except Notebook.DoesNotExist:
                return Response(False, status=status.HTTP_404_NOT_FOUND)

            pre_notebook.NumberNotes -= 1
            pre_notebook.save()
            note.NotebookId = notebook_id
            note.save()
            move_num = move_num + 1

        try:
            notebook = Notebook.objects.get(NotebookId=notebook_id)
        except Notebook.DoesNotExist:
            return Response(False, status=status.HTTP_404_NOT_FOUND)

        notebook.NumberNotes += move_num
        notebook.save()

        return Response(True, status=status.HTTP_200_OK)

    @list_route(methods=['post'])
    def trash_note(self, request):
        note_ids = request.POST.getlist('noteIds[]', [])


        for note_id in note_ids:
            try:
                note = Note.objects.get(NoteId = note_id)
            except Note.DoesNotExist:
                return Response({"status": "query info is not found"}, status=status.HTTP_404_NOT_FOUND)

            try:
                notebook = Notebook.objects.get(NotebookId=note.NotebookId)
            except Notebook.DoesNotExist:
                self.res["Ok"] = False
                return Response(self.res, status=status.HTTP_404_NOT_FOUND)
            notebook.NumberNotes = notebook.NumberNotes - 1
            notebook.save()

            note.IsTrash = True
            note.save()
        return Response(True)

    @list_route(methods=['post'])
    def update_note_or_content(self, request, *args, **kwargs):
        # updateNoteOrContent
        is_new = request.POST.get('IsNew')
        if is_new == "true":
            serializer = NoteSerializer(data=request.data,context={'request': request})

            try:
                notebook = Notebook.objects.get(NotebookId=request.POST.get("NotebookId"))
            except Notebook.DoesNotExist:
                self.res["Ok"] = False
                return Response(self.res, status=status.HTTP_404_NOT_FOUND)

            notebook.NumberNotes = notebook.NumberNotes + 1
            notebook.save()

        else:
            note_id = request.POST.get('NoteId')
            note = Note.objects.get(NoteId=note_id)
            # note.UpdatedTime =
            serializer = NoteSerializer(note, data=request.data, context={'request': request})

        if serializer.is_valid():
            en_tags = request.POST.get('Tags', "").split(',')
            zh_tags = []
            print en_tags
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
            print zh_tags
            if is_new == "true":
                serializer.save(Tags=zh_tags, UrlTitle=urlquote(request.POST.get("title")))
            else:
                serializer.save(Tags=zh_tags)
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

    @list_route(methods=['get'])
    def get_note_content(self, request, *args, **kwargs):
        note_id = request.GET.get('noteId')
        try:
            note = Note.objects.get(NoteId=note_id)
        except Note.DoesNotExist:
            return Response({"status": "query info is not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = GetNoteContentSerializer(note, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @list_route(methods=['get'])
    def latest_note(self, request, *args, **kwargs):
        query_num = 50
        if Note.objects.all().count() < query_num:
            serializer = NoteSerializer(Note.objects.all(), many=True, context={'request': request});
        else:
            serializer = NoteSerializer(Note.objects.all().order_by("UpdatedTime")[:query_num], many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @list_route(methods=['post'])
    def set_note_to_blog(self, request, *args, **kwargs):
        note_ids = request.POST.getlist("noteIds[]", [])
        is_blog = request.POST.get('isBlog')
        if is_blog == "true":
            is_blog = True
        elif is_blog == "false":
            is_blog = False
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

        for note_id in note_ids:
            try:
                note = Note.objects.get(NoteId=note_id)
            except Note.DoesNotExist:
                return Response(False, status=status.HTTP_404_NOT_FOUND)
            note.IsBlog = is_blog
            # if note.UrlTitle == "":
            #     print "url title is null null null null null null"
            #     note.UrlTitle = urlquote(note.Title)
            #     print note.UrlTitle
            note.save()
        return Response(True, status=status.HTTP_200_OK)

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
    def get_album(self, request, *args, **kwargs):
        try:
            albums = Album.objects.filter(~Q(AlbumId= ""))
        except Album.DoesNotExist:
            return Response([])

        serializer = AlbumSerializer(albums, many=True,context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


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
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permissions_class = (permissions.IsAuthenticated)

    res = {"Ok": False,
           "Code": 1,
           "Id": "",
           "Item": None,
           "List": None,
           "Msg": ""
           }

    image_res = {
        "Count":0,
        "CurPage":0,
        "List":None,
        "PerPageSize":0,
        "TotalPage":0
    }
    @list_route(methods=["POST"])
    def upload_image(self, request):
        photo = request.FILES.get('file')
        album_id = request.POST.get('albumId')
        file_id = get_file_md5(photo) + str(int(time.time()))
        title = request.POST.get('title', '无标题')
        if album_id=="" or album_id is None:
            is_default_album = True
        else:
            is_default_album = False

        new_img = Image(
            Photo=photo,
            AlbumId=album_id ,
            FileId=file_id,
            Name=photo.name,
            Title=title,
            IsDefaultAlbum = is_default_album,
            Size=photo.size
            )
        new_img.save()
        new_img.Path = new_img.Photo.path.decode('utf8')
        new_img.Name = new_img.Photo.name.decode('utf8')
        try:
            new_img.save()
        except Exception, e:
            print e

        new_img = Image.objects.get(FileId=file_id)
        serializer = ImageSerializer(new_img)
        self.res['Id'] = new_img.FileId
        self.res['List'] = serializer.data
        self.res['Ok'] = True
        return Response(self.res, status=status.HTTP_200_OK)

    @list_route(methods=["GET"])
    def get_images(self, request):
        album_id = request.GET.get("albumId")
        page = request.GET.get("page", 1)
        page_size = request.GET.get('page_size', 12)
        images = Image.objects.filter(AlbumId=album_id)

        paginator = Paginator(images, page)

        try:
            images = paginator.page(page)
        except PageNotAnInteger:
            images = paginator.page(1)
        except EmptyPage:
            images = paginator.page(paginator.num_pages) # paginator.num_pages 总页数

        serializer = ImageSerializer(images, many=True)  # 序列化操作
        self.image_res["Count"] = images.number
        self.image_res["List"] = serializer.data
        return Response(self.image_res, status=status.HTTP_200_OK)

    @list_route(methods=['get'])
    def get_image(self,request,*args,**kwargs):
        file_id = request.GET.get('fileId')
        image = Image.objects.get(FileId=file_id)
        # serializer = ImageSerializer(image)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(image.Path)
        f = open(image.Path, 'rb')
        return HttpResponse(f.read(), content_type='image/jpg')

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

