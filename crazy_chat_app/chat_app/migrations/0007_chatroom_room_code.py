# Generated by Django 3.1.5 on 2021-03-06 05:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0006_refreshtoken'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatroom',
            name='room_code',
            field=models.CharField(default='Abc', max_length=5),
            preserve_default=False,
        ),
    ]
