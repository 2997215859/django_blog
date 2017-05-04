# coding=utf-8
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from api_note.models import Note
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

def index(request):
    return render(request, 'note/index3.html')

def album(request):
    return render(request, 'note/album.html')

def note_detail(request, note_id):
    try:
        note = Note.objects.get(NoteId=note_id)
    except Note.DoesNotExist:
        return Response({'status': 'this note does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    cur_notebook_id = note.NotebookId
    return render(request, 'note/index3.html', {"cur_id": note_id, "cur_notebook_id": cur_notebook_id})