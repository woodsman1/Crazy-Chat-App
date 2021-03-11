from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser

from .models import ChatRoom, Message
from .serializers import *
from .signals import get_refresh_token


# xxxxxxxxxx temperory views xxxxxxxxxxxxxxxxxxxxxxxxxxx
def index(request):
    return render(request, 'frontend/index.html')




def room(request, room_name):
    return render(request, 'chat_app/room.html', {
        'room_name': room_name,
        'username': request.user,
    })

# xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


class UsersDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        _ , token = request.META.get('HTTP_AUTHORIZATION').split(" ")
        user = get_object_or_404(Token, key=token).user
        if user is not None:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response("Invalid token")



class UserRegistrationApi(APIView):

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['created'] = 1
            data["id"] = user.pk
            data["username"] = user.username
            data["email"] = user.email
            data["token"] = Token.objects.get(user=user).key
            data["refresh_token"] = get_refresh_token(user=user)
        else:
            data['created'] = 0
            data["error"] = serializer.errors
        return Response(data)


class CustomAuthToken(ObtainAuthToken, APIView):

    def post(self, request):
        
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
            
        Token.objects.filter(user=user).delete()
        refresh_token = get_refresh_token(user=user)
        token, created = Token.objects.get_or_create(user=user)

        
        data = {
            "id": user.pk,
            "username" : user.username,
            "token":token.key,
            "refresh_token": refresh_token,
        }

        return Response(data)


class getAccessToken(APIView):

    def get(self, request):
        refresh_token = request.COOKIES.get('refresh_token',None)
        if refresh_token is None:
            return Response({"error" : "No refresh token detected"})
        obj = RefreshToken.objects.filter(token= refresh_token)
        if obj.count()==0:
            return Response({"error" : "Not a valid token"})
        else:
            token = Token.objects.get(user = obj[0].user)
            return Response({"token" : token.key})


class ChatRoomDetailsApi(APIView):

    permission_classes = (IsAuthenticated,)

    # only the member of the room can see the details of the room    
    def get(self, request, pk):
        user = self.get_user(request)
        room = get_object_or_404(ChatRoom, pk=pk)
        users = room.members.all()
        if user in users:
            serializer = ChatRoomSerializer(room)
            return Response(serializer.data)
        else:
            return Response({"error": "Not a member of the room"})


    def put(self, request, pk):
        user = self.get_user(request)
        room = get_object_or_404(ChatRoom, pk=pk)
        users = room.members.all()
        if user in users:
            serializer = ChatRoomSerializer(room, data = request.data)
            if serializer.is_valid():
                return Response(serializer.data)
            else:
                return Response(serializer.errors)
        else:
            return Response({"error": "Not a member of the room"})

        return Response({f"{users}"})

    def delete(self, request, pk):
        user = self.get_user(request)
        room = get_object_or_404(ChatRoom, pk=pk)
        users = room.members.all()
        if user in users:
            room.delete()
        else:
            return Response({"error": "Not a member of the room"})
        

    def get_user(self, request):
        _, token = request.META.get('HTTP_AUTHORIZATION').split(' ')
        user = get_object_or_404(Token, key=token).user
        return user
        


# create in members pass only one int value that is creaters
# id else will give error
class GetOrCreateRoomApi(APIView):

    permission_classes = (IsAuthenticated,)

    # get the rooms in which the user is enrolled
    def get(self, request):
        user = self.get_user(request)
        rooms = user.chatroom_set.all()
        serializer = ChatRoomSerializer(rooms, many=True)
        # serializer.is_valid(raise_exception=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = ChatRoomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def get_user(self, request):
        _, token = request.META.get('HTTP_AUTHORIZATION').split(' ')
        user = get_object_or_404(Token, key=token).user
        return user

class JoinRoomApi(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = AddUserToRoomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        res = serializer.save()
        if res is None:
            return Response({"error":"Can not Register You to Room"})
        return Response(serializer.data)