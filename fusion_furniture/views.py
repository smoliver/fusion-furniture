from django.http import HttpResponse, Http404
from django.shortcuts import render


def base (request):
	return render(request, 'base.html')
