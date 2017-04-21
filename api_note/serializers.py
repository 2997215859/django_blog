from rest_framework import serializers
from models import Notebook, Note, Tag
from django.contrib.auth.models import User

class NotebookSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="Owner.username")
    class Meta:
        model = Notebook
        fields = ("url", "owner", "id", "NotebookId", "UserId", "ParentNotebookId", "Seq", "Title", "UrlTitle", "NumberNote", "IsTrash", "IsBlog", "CreatedTime", "UpdateTime", "IsWX", "Usn", "IsDeleted", "Subs")

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ("url", "NoteId","IsTrash","CommentNum","Title","Usn","Tags","AttachNum","ImgSrc","CreatedTime","IsBlog","LikeNum","IsRecommend","UpdatedUserId","HasSelfDefined","IsPublicShare","ReadNum","UserId","PublicTime","IsTop","UpdatedTime","IsDeleted","Desc","Src","RecommendTime","NotebookId","IsMarkdown","CreatedUserId","UrlTitle")

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ("url", "Count","UpdatedTime","Tag","CreatedTime","Usn","TagId","UserId","IsDeleted")