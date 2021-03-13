# Crazy-Chat-App
A simple Chat App that uses django-rest-Framwork as backend and Reactjs as Frontend. And django-channels with redis is used on server side and javascript Websokets on User Side or Sockets connections.

## Django Installation

* Create virtual environment 

```
virtualenv venv
source ./venv/bin/activate
```

* Install Requirements
```
pip install -r requirements.txt
```

* Create .env file for storing Screat key

First Create `.env` in your Base folder

* Generate Secret Key by this command
```
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```
* Run the initial migrations
```
python manage.py migrate
```

Copy the generated key and paste in the `.env` folder same as shown in `.env.example`

## Installing React Dependencies

* Change your directory

```
cd crazy_chat_app/frontend
```

* Install all the Dependencies (make sure you have installed nodejs on your machine)

```
npm install
```

## Running Server 

* Make sure you are in the same directory as of manage.py file. Then run the command 

```
python manage.py runserver
```

### Now are your Done with Installation 