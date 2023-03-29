"""ggcalendar URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from core import views
from django.views.decorators.csrf import csrf_exempt


##router = routers.DefaultRouter()
##router.register(r'userlist', views.userView, 'core')

urlpatterns = [
    path('admin/', admin.site.urls),
    ##path('', TemplateView.as_view(template_name='index.html')),
    ##path('api/', include(router.urls)),
    # re_path('api/content/$', views.userlist),
    # re_path('api/change/$', views.detail_list),
    re_path('api/signup', views.signup),
    re_path('api/login', views.login),
    re_path('api/event', views.eventCRUD),
    re_path('api/export', views.exportEvent),
    re_path('api/import', csrf_exempt(views.importEvent)),
    re_path('api/subscribe', views.subscribe),
    re_path('api/home', views.sendEvent),
]
