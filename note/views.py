from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext

def index(request):
    return render(request, 'note/index3.html')

def album(request):
    return render(request, 'note/album.html')