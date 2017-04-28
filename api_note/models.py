from __future__ import unicode_literals
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Notebook(models.Model):
    NotebookId = models.CharField(max_length=50, primary_key=True)
    UserId = models.CharField(max_length=50)
    ParentNotebookId = models.CharField(max_length=50)
    Seq = models.IntegerField()
    Title = models.CharField(max_length=20)
    UrlTitle = models.CharField(max_length=20)
    NumberNotes = models.IntegerField(default=0)
    IsTrash = models.BooleanField()
    IsBlog = models.BooleanField()
    CreatedTime = models.DateTimeField(auto_now_add=True)
    UpdatedTime = models.DateTimeField(auto_now_add=True)
    IsWX = models.BooleanField()
    Usn = models.IntegerField()
    IsDeleted = models.BooleanField()
    Subs = ArrayField(
        models.CharField(max_length=50, blank=True),
        size = 30
    )

class Note(models.Model):
    NoteId = models.CharField(max_length=100, primary_key=True)
    UserId = models.CharField(max_length=99, blank=True)
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
    UpdatedTime = models.DateTimeField(auto_now_add=True)
    RecommendTime = models.DateTimeField(default="0001-01-01T00:00:00Z")
    PublicTime = models.DateTimeField(blank=True)
    UpdatedUserId = models.CharField(max_length=91, blank=True)
    Usn = models.IntegerField(default=11879)
    IsDeleted = models.BooleanField(default=False)
    IsPublicShare = models.BooleanField(default=False)
    Content = models.TextField(default="")
    Abstract = models.TextField(default="")



class Tag(models.Model):
    TagId = models.CharField(max_length=50, primary_key=True)
    UserId = models.CharField(max_length=50)
    Tag = models.CharField(max_length=20)
    Usn = models.IntegerField()
    Count = models.IntegerField()
    CreatedTime = models.DateTimeField(auto_now_add=True)
    UpdatedTime = models.DateTimeField(auto_now_add=True)
    IsDeleted = models.BooleanField(default=False)







