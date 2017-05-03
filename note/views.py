from django.shortcuts import render
from django.http import HttpResponseRedirect
def index(request):
    return render(request, 'note/index3.html')

def album(request):
    return render(request, 'note/album.html')