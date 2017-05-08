from __future__ import unicode_literals
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Notebook(models.Model):
    NotebookId = models.CharField(max_length=50, primary_key=True)
    UserId = models.CharField(max_length=50, default="57cccf2aab644133ed0714c2")
    ParentNotebookId = models.CharField(max_length=50, default="", blank=True)
    Seq = models.IntegerField(default=-1)
    Title = models.CharField(max_length=20)
    UrlTitle = models.CharField(max_length=20)
    NumberNotes = models.IntegerField(default=0)
    IsTrash = models.BooleanField(default=False)
    IsBlog = models.BooleanField(default=False)
    CreatedTime = models.DateTimeField(auto_now_add=True)
    UpdatedTime = models.DateTimeField(auto_now_add=True)
    IsWX = models.BooleanField(default=False)
    Usn = models.IntegerField(default=0)
    IsDeleted = models.BooleanField(default=False)
    Subs = ArrayField(
        models.CharField(max_length=50, blank=True),
        size = 30,
        default=[]
    )

class Note(models.Model):
    NoteId = models.CharField(max_length=100, primary_key=True)
    UserId = models.CharField(max_length=99, blank=True, default="57cccf2aab644133ed0714c2")
    CreatedUserId = models.CharField(max_length=98, default="")
    NotebookId = models.CharField(max_length=97, blank=True)
    Title = models.CharField(max_length=96, blank=True)
    Desc = models.TextField(blank=True)
    Src = models.CharField(max_length=95, default="")
    ImgSrc = models.CharField(max_length=94, default="")
    Tags = ArrayField(
        models.CharField(max_length=93, blank=True),
        size = 30
    )
    IsTrash = models.BooleanField(default=False)
    IsBlog = models.BooleanField(default=False)
    UrlTitle = models.CharField(max_length=200, blank=True)
    IsRecommend = models.BooleanField(default=False)
    IsTop = models.BooleanField(default=False)
    HasSelfDefined = models.BooleanField(default=False)
    ReadNum = models.IntegerField(default=0)
    LikeNum = models.IntegerField(default=0)
    CommentNum = models.IntegerField(default=0)
    IsMarkdown = models.BooleanField()
    AttachNum = models.IntegerField(default=0)
    CreatedTime = models.DateTimeField(auto_now_add=True)
    UpdatedTime = models.DateTimeField(auto_now=True)
    RecommendTime = models.DateTimeField(default="0001-01-01T00:00:00Z")
    PublicTime = models.DateTimeField(auto_now_add=True)
    UpdatedUserId = models.CharField(max_length=91, blank=True, default="57cccf2aab644133ed0714c2")
    Usn = models.IntegerField(default=11879)
    IsDeleted = models.BooleanField(default=False)
    IsPublicShare = models.BooleanField(default=False)
    Content = models.TextField(default="")
    Abstract = models.TextField(default="")

class Tag(models.Model):
    TagId = models.CharField(max_length=50, primary_key=True)
    UserId = models.CharField(max_length=50, default="57cccf2aab644133ed0714c2")
    Tag = models.CharField(max_length=20)
    Usn = models.IntegerField(default=0)
    Count = models.IntegerField(default=0)
    CreatedTime = models.DateTimeField(auto_now_add=True)
    UpdatedTime = models.DateTimeField(auto_now=True)
    IsDeleted = models.BooleanField(default=False)

class Album(models.Model):
    AlbumId = models.CharField(max_length=50, primary_key=True)
    CreatedTime = models.DateTimeField(auto_now_add=True)
    Name = models.CharField(max_length=50)
    Seq = models.IntegerField(default=-1)
    Type = models.IntegerField(default=0)
    UserId = models.CharField(max_length=50, default="57cccf2aab644133ed0714c2")

class Image(models.Model):
    Photo = models.ImageField(upload_to='imgs/', default='upload_imgs/user-0.jpg')
    AlbumId = models.CharField(max_length=50)
    CreatedTime = models.DateTimeField(auto_now_add=True)
    FileId = models.CharField(max_length=100)
    FromFieldId = models.CharField(max_length=50,default="")
    IsDefaultAlbum = models.BooleanField()
    Name = models.CharField(max_length=50)
    Path = models.CharField(max_length=100, default="")
    QID = models.CharField(max_length=50, default="")
    QKey = models.CharField(max_length=50, default="")
    Size = models.CharField(max_length=50, default="")
    Title = models.CharField(max_length=50)







