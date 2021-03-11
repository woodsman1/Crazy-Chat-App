from django.urls import path
from rest_framework.authtoken import views
from .views import *

app_name = "frontend"

urlpatterns = [
    path("", index, name='index'),
    path("login/", index, name='index'),
    path("sign-up/", index, name='index'),
    path("logout/", index, name='index'),
    path("create-room/", index, name='index'),
    
]