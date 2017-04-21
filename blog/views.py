from django.shortcuts import render
from models import Article
from django.http import Http404
from django.contrib.syndication.views import Feed
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

class RSSFeed(Feed) :
    title = "RSS feed - article"
    link = "feeds/posts/"
    description = "RSS feed - blog posts"

    def items(self):
        return Article.objects.order_by('-pub_time')

    def item_title(self, item):
        return item.title

    def item_pubdate(self, item):
        return item.pub_time

    def item_description(self, item):
        return item.content

# Create your views here.
def index(request):
    articles = Article.objects.all()
    paginator = Paginator(articles, 200)
    page = request.GET.get('page')
    try:
        current_articles = paginator.page(page)
    except PageNotAnInteger:
        current_articles = paginator.page(1)
    except EmptyPage:
        current_articles = paginator.page(paginator.num_pages)

    for current_article in current_articles:
        current_article.tags = current_article.category.split(",")
    return render(request, 'blog/index.html', {'articles': current_articles})

def article_page(request, article_id):
    try:
        article = Article.objects.get(id=str(article_id))
    except Article.DoesNotExist:
        raise Http404
    return render(request, 'blog/article_page.html', {'article': article})

def archive(request):
    try:
        articles = Article.objects.all()
    except Article.DoesNotExist:
        raise Http404
    return render(request, 'blog/archive.html', {'articles': articles})

def search_tag(request, tag_name):
    try:
        articles = Article.objects.filter(category=tag_name)
    except Article.DoesNotExist:
        raise Http404
    return render(request, 'blog/tag.html', {'articles': articles, 'error': False})

def about_me(request):
    return render(request, 'blog/about_me.html')

def search_str(request):
    is_find = False
    if 'search_str' in request.POST:
        search_str = request.POST['search_str']
        if not search_str:
            return render(request, 'blog/index.html')
        else:
            articles = Article.objects.filter(title__icontains=search_str)
            if len(articles) != 0:
                is_find = True
        return render(request, 'blog/search.html', {'articles': articles})

    return render(request, 'blog/index.html')
