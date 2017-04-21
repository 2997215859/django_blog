from django.shortcuts import render

def index(request):
    return render(request, 'note/index3.html')