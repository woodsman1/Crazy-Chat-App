# Generated by Django 3.1.5 on 2021-01-30 07:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat_app', '0004_auto_20210129_1709'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatroom',
            name='members',
        ),
        migrations.AddField(
            model_name='chatroom',
            name='members',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
