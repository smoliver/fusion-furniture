from django.http import HttpResponse, Http404
from django.shortcuts import render
from firebase import firebase
import base64


def base (request):
	serverName = "https://crackling-fire-1294.firebaseio.com/"
	fireApp = firebase.FirebaseApplication(serverName, None)
	URLData = fireApp.get("/Hashes", None)
	return render(request, 'base.html', {"hostName": serverName, "URLData": URLData})


def image (request, hash):
	serverName = "https://crackling-fire-1294.firebaseio.com/" 
	fireApp = firebase.FirebaseApplication(serverName, None)
	URLData = fireApp.get("/CrossSections", hash)['filePayload']
	URLData = URLData[URLData.find(",")+1:]
	pic = base64.b64decode(URLData)
	return HttpResponse(pic,  content_type="image/png")

def raw (request, hash):
	serverName = "https://crackling-fire-1294.firebaseio.com/" 
	fireApp = firebase.FirebaseApplication(serverName, None)
	print(type(fireApp))
	URLData = fireApp.get("/CrossSections", hash)['filePayload']
	URLData = URLData[URLData.find(",")+1:]
	return  HttpResponse(URLData)