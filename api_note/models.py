from __future__ import unicode_literals

from django.db import models

class Notebook(models.Model):
    NotebookId = models.CharField(max_length=50)
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
    Subs = models.CharField(max_length=50)

class Note(models.Model):
    NoteId = models.CharField(max_length=50)
    UserId = models.CharField(max_length=50)
    CreatedUserId = models.CharField(max_length=50, default="")
    NotebookId = models.CharField(max_length=50)
    Title = models.CharField(max_length=30)
    Desc = models.TextField()
    Src = models.CharField(max_length=50, default="")
    ImgSrc = models.CharField(max_length=50, default="")
    Tags = models.CharField(max_length=100)
    IsTrash = models.BooleanField(default=False)
    IsBlog = models.BooleanField(default=False)
    UrlTitle = models.CharField(max_length=100)
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
    PublicTime = models.DateTimeField()
    UpdatedUserId = models.CharField(max_length=50)
    Usn = models.IntegerField(default=11879)
    IsDeleted = models.BooleanField(default=False)
    IsPublicShare = models.BooleanField(default=False)
    Content = models.TextField(default="")
    Abstract = models.TextField(default="")

class Tag(models.Model):
    TagId = models.CharField(max_length=50)
    UserId = models.CharField(max_length=50)
    Tag = models.CharField(max_length=20)
    Usn = models.IntegerField()
    Count = models.IntegerField()
    CreatedTime = models.DateTimeField(auto_now_add=True)
    UpdatedTime = models.DateTimeField(auto_now_add=True)
    IsDeleted = models.BooleanField(default=False)







