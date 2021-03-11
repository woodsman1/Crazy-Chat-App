from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import secrets
import string
from .models import RefreshToken, ChatRoom
from rest_framework.authtoken.models import Token


@receiver(post_save, sender = User)
def create_Token(sender, instance=None, created=False, **kwarg):
    if created:
        Token.objects.create(user=instance)

# @receiver(post_save, sender = ChatRoom)
# def create_room_code(sender,instance=None, created=False,**kwarg):
#     if created:
#         room_code = generate_random_token(length=5)


def get_unique_room_code():
    while True:
        code = generate_random_token(length=5)
        obj = ChatRoom.objects.filter(room_code=code)
        flag = True
        for x in obj:
            flag=False
            break
        if flag:
            return code


def generate_random_token(length=20):
    # length=20
    res = ''.join(secrets.choice(string.ascii_letters + string.digits) for x in range(length))
    return res

def get_refresh_token(user):
    user_object = RefreshToken.objects.filter(user=user)
    i=0
    while i<10:
        token = generate_random_token(length=20)
        obj = RefreshToken.objects.filter(token=token)
        if obj.count() == 0:      # error here obj.count  is always zero (solve later)
            for x in user_object:
                x.user = user
                x.token = token
                x.save()
                return token
            temp=RefreshToken(user=user, token=token)
            temp.save()
            return token
        i+=1
    return None
        