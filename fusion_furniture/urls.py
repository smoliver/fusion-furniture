from django.conf.urls import include, url
from django.contrib import admin
from fusion_furniture import views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.base),
    url(r'^image/(?P<hash>\w*)/$', views.image),
    url(r'^raw/(?P<hash>\w*)/$', views.raw),
]
