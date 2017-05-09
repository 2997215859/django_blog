from django.shortcuts import render
from api_note.models import Note
from django.http import Http404
from django.contrib.syndication.views import Feed
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# class RSSFeed(Feed) :
#     title = "RSS feed - article"
#     link = "feeds/posts/"
#     description = "RSS feed - blog posts"
#
#     def items(self):
#         return Article.objects.order_by('-pub_time')
#
#     def item_title(self, item):
#         return item.title
#
#     def item_pubdate(self, item):
#         return item.pub_time
#
#     def item_description(self, item):
#         return item.content

# Create your views here.
# {% if $.curIsIndex %}
#     {% $.blogInfo.Title % %} }
# {% else if $.curIsCate %}
#     分类-{% $.curCateTitle %}
# {% else if $.curIsSearch %}
#     搜索-{% $.keywords %}
# {% else if $.curIsTags %}
#     我的标签
# {% else if $.curIsTagPosts %}
#     标签-{% $.curTag %}
# {% else if $.curIsPost %}
# 	{% $.post.Title %}
# {% else if $.curIsSingle %}
# 	{% $.single.Title %}
# {% else if $.curIsArchive %}
# 	归档
# {% endif %}

def index(request):
    notes = Note.objects.filter(IsBlog=True).order_by('UpdatedTime')
    paginator = Paginator(notes, 10)
    page = request.GET.get('page')
    hf = object()
    user_info = object()
    hf.curIsIndex = True
    hf.blogInfo.Title = "I am title"
    # header.curIsPost = False
    # header.curIsSingle = False
    user_info.Username = "I am username"
    hf.indexUrl = "http://127.0.0.1:8000/2997215859"
    hf.blogInfo.Logo = True
    hf.blogInfo.Logo = "http://leanote.com/public/upload/712/57cccf2aab644133ed0714c2/images/logo/a8797f65fa1ffd93d83dfefee572b898.jpg"
    hf.blogInfo.Title = "但愿常醉不愿醒 的 博客"
    hf.blogInfo.SubTitle = "Stay hungry, stay foolish!"
    index_url = "http://blog.leanote.com/2997215859"

    hf.singles = []
    hf.singleUrl = "http://blog.leanote.com/single/2997215859/"
    hf.curSingleId = ""
    about_me = object()
    about_me.UrlTitle = "About-Me"
    about_me.Title = "About Me"
    hf.singles.append(about_me)

    hf.curIsArchive = False
    hf.archiveUrl = "http://blog.leanote.com/archives/2997215859"

    hf.curIsTags = False
    hf.tagsUrl = "http://blog.leanote.com/tags/2997215859"

    keywords = ""


    try:
        current_articles = paginator.page(page)
    except PageNotAnInteger:
        current_articles = paginator.page(1)
    except EmptyPage:
        current_articles = paginator.page(paginator.num_pages)

    for current_article in current_articles:
        current_article.tags = current_article.category.split(",")
    return render(request, 'blog/index2.html', {
        'articles': current_articles,
        'hf': hf,
        'userInfo': user_info,
        'indexUrl': index_url,
        'keywords': keywords
    })

# def index(request):
#     articles = Note.objects.all()
#     paginator = Paginator(articles, 200)
#     page = request.GET.get('page')
#     try:
#         current_articles = paginator.page(page)
#     except PageNotAnInteger:
#         current_articles = paginator.page(1)
#     except EmptyPage:
#         current_articles = paginator.page(paginator.num_pages)
#
#     for current_article in current_articles:
#         current_article.tags = current_article.category.split(",")
#     return render(request, 'blog/index.html', {'articles': current_articles})

# def article_page(request, article_id):
#     try:
#         article = Article.objects.get(id=str(article_id))
#     except Article.DoesNotExist:
#         raise Http404
#     return render(request, 'blog/article_page.html', {'article': article})
#
# def archive(request):
#     try:
#         articles = Article.objects.all()
#     except Article.DoesNotExist:
#         raise Http404
#     return render(request, 'blog/archive.html', {'articles': articles})
#
# def search_tag(request, tag_name):
#     try:
#         articles = Article.objects.filter(category=tag_name)
#     except Article.DoesNotExist:
#         raise Http404
#     return render(request, 'blog/tag.html', {'articles': articles, 'error': False})
#
# def about_me(request):
#     return render(request, 'blog/about_me.html')
#
# def search_str(request):
#     is_find = False
#     if 'search_str' in request.POST:
#         search_str = request.POST['search_str']
#         if not search_str:
#             return render(request, 'blog/index.html')
#         else:
#             articles = Article.objects.filter(title__icontains=search_str)
#             if len(articles) != 0:
#                 is_find = True
#         return render(request, 'blog/search.html', {'articles': articles})
#
#     return render(request, 'blog/index.html')
