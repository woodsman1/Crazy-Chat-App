from django.urls import path
from rest_framework.authtoken import views
from .views import *

app_name = "chat_app"

urlpatterns = [
    
    path("register/", UserRegistrationApi.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view()),
    path('user-detail/', UsersDetailView.as_view()),
    path('chat-room-detail/<int:pk>/', ChatRoomDetailsApi.as_view()),
    path('get-or-create-room/', GetOrCreateRoomApi.as_view()),
    path('get-access-token/', getAccessToken.as_view()),
    path('join-room/', JoinRoomApi.as_view()),

    path("", index, name='index'),
    path("<str:room_name>/", room, name="room"),

]
