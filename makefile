SHELL = /bin/sh

all:
	python manage.py runserver

install:
	pip install -r ./requirements.txt