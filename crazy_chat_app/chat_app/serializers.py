from django.contrib.auth.models import User
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .signals import get_unique_room_code


from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'email', 'first_name', 'last_name',
            'last_login',
        ]


class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', "email", "password"]
        extra_kwargs = {'password': {"write_only":True}}

    def save(self):
        user = User(
            username = self.validated_data['username'],
            email = self.validated_data['email']
        )
        user.set_password(self.validated_data['password'])
        user.save()
        return user
        


class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['room_name', 'room_size','room_code', 'members']

    def save(self, **kwargs):
        room = ChatRoom(
            room_name = self.validated_data['room_name'],
            room_size = self.validated_data['room_size'],
            room_code = get_unique_room_code(),
        )
        room.save()
        print(self.validated_data['members'])
        user = self.validated_data['members']
        username = user[0].username
        user = get_object_or_404(User, username=username)
        room.members.add(user)
        # room.save()
        return room

        
class AddUserToRoomSerializer(serializers.ModelSerializer):
    userid = serializers.IntegerField()

    class Meta:
        model = ChatRoom
        fields = ['room_code', 'userid']

    def save(self, **kwargs):
        try:
            room=ChatRoom.objects.get(room_code=self.validated_data['room_code'])
            user = User.objects.get(pk=self.validated_data["userid"])
            room.members.add(user)
            return room
        except:
            return None


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'




