# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-23 11:47
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_note', '0010_auto_20170423_1946'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notebook',
            name='Owner',
        ),
    ]