from django.urls import re_path

from .members import ChatMembers

websocket_urlpatterns = [
    re_path(r'ws/chat-room/(?P<room_name>\w+)/$', ChatMembers.as_asgi()),
]