# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-27 07:37
from __future__ import unicode_literals

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('NoteId', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('UserId', models.CharField(max_length=50)),
                ('CreatedUserId', models.CharField(default='', max_length=50)),
                ('NotebookId', models.CharField(max_length=50)),
                ('Title', models.CharField(max_length=30)),
                ('Desc', models.TextField()),
                ('Src', models.CharField(default='', max_length=50)),
                ('ImgSrc', models.CharField(default='', max_length=50)),
                ('Tags', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=10), size=30)),
                ('IsTrash', models.BooleanField(default=False)),
                ('IsBlog', models.BooleanField(default=False)),
                ('UrlTitle', models.CharField(max_length=100)),
                ('IsRecommend', models.BooleanField(default=False)),
                ('IsTop', models.BooleanField(default=False)),
                ('HasSelfDefined', models.BooleanField(default=False)),
                ('ReadNum', models.IntegerField(default=0)),
                ('LikeNum', models.IntegerField(default=0)),
                ('CommentNum', models.IntegerField(default=0)),
                ('IsMarkdown', models.BooleanField()),
                ('AttachNum', models.IntegerField(default=0)),
                ('CreatedTime', models.DateTimeField(auto_now_add=True)),
                ('UpdatedTime', models.DateTimeField(auto_now_add=True)),
                ('RecommendTime', models.DateTimeField(default='0001-01-01T00:00:00Z')),
                ('PublicTime', models.DateTimeField()),
                ('UpdatedUserId', models.CharField(max_length=50)),
                ('Usn', models.IntegerField(default=11879)),
                ('IsDeleted', models.BooleanField(default=False)),
                ('IsPublicShare', models.BooleanField(default=False)),
                ('Content', models.TextField(default='')),
                ('Abstract', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='Notebook',
            fields=[
                ('NotebookId', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('UserId', models.CharField(max_length=50)),
                ('ParentNotebookId', models.CharField(max_length=50)),
                ('Seq', models.IntegerField()),
                ('Title', models.CharField(max_length=20)),
                ('UrlTitle', models.CharField(max_length=20)),
                ('NumberNotes', models.IntegerField(default=0)),
                ('IsTrash', models.BooleanField()),
                ('IsBlog', models.BooleanField()),
                ('CreatedTime', models.DateTimeField(auto_now_add=True)),
                ('UpdatedTime', models.DateTimeField(auto_now_add=True)),
                ('IsWX', models.BooleanField()),
                ('Usn', models.IntegerField()),
                ('IsDeleted', models.BooleanField()),
                ('Subs', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=50), size=30)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('TagId', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('UserId', models.CharField(max_length=50)),
                ('Tag', models.CharField(max_length=20)),
                ('Usn', models.IntegerField()),
                ('Count', models.IntegerField()),
                ('CreatedTime', models.DateTimeField(auto_now_add=True)),
                ('UpdatedTime', models.DateTimeField(auto_now_add=True)),
                ('IsDeleted', models.BooleanField(default=False)),
            ],
        ),
    ]
