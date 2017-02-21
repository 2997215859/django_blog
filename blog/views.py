from django.shortcuts import render
from models import Article
from django.http import Http404
# Create your views here.
def index(request):
    articles = Article.objects.all()
    return render(request, 'blog/index.html',{'articles': articles})

def article_page(request, article_id):
    try:
        article = Article.objects.get(id=str(article_id))
    except Article.DoesNotExist:
        raise Http404
    return render(request, 'blog/article_page.html', {'article': article})