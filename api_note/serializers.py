from rest_framework import serializers
from models import Notebook, Note, Tag
from django.contrib.auth.models import User

class NotebookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Notebook
        fields = ("url", "NotebookId", "UserId", "ParentNotebookId", "Seq", "Title", "UrlTitle", "NumberNotes", "IsTrash", "IsBlog", "CreatedTime", "UpdatedTime", "IsWX", "Usn", "IsDeleted", "Subs")

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ("NoteId","url","IsTrash","CommentNum","Title","Usn","Tags","AttachNum","ImgSrc","CreatedTime","IsBlog","LikeNum","IsRecommend","UpdatedUserId","HasSelfDefined","IsPublicShare","ReadNum","UserId","PublicTime","IsTop","UpdatedTime","IsDeleted","Desc","Src","RecommendTime","NotebookId","IsMarkdown","CreatedUserId","UrlTitle", "Content")

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ("url", "Count","UpdatedTime","Tag","CreatedTime","Usn","TagId","UserId","IsDeleted")


class TrashNoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ("NoteId", "IsTrash")

