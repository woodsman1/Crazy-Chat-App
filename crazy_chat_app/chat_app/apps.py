from django.apps import AppConfig


class ChatAppConfig(AppConfig):
    name = 'chat_app'

    def ready(self):
        import chat_app.signals