from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class RefreshToken(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    token = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.user}'


class ChatRoom(models.Model):
    # admin = models.ForeignKey( User, on_delete = models.CASCADE)
    room_name = models.CharField(max_length = 30)
    room_size = models.IntegerField(default=5)
    room_code = models.CharField(max_length=5)
    members = models.ManyToManyField(User)
    creation_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk}-{self.room_name}'


class Message(models.Model):
    room_name = models.ForeignKey(ChatRoom,
                    on_delete= models.CASCADE)
    sender_name = models.ForeignKey(User, 
                    on_delete=models.CASCADE)
    text = models.TextField(max_length=500)
    sent_status = models.BooleanField()

    def __str__(self):
        return f'{self.sender_name}'