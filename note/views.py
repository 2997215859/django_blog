from django.shortcuts import render
from django.http import HttpResponseRedirect
def index(request):
    return render(request, 'note/index3.html')

def api_note_redirect(request):
    note_id = request.data['note_id']
    return HttpResponseRedirect('http://127.0.0.1:8000/api/note/' + note_id)