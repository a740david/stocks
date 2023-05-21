"""
URL configuration for stocks project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from stocks_app import views

from django.urls import path, include

from stocks_app.views.favorite_stocks import toggle_favorite_stock
from stocks_app.views.reports import  ReportsView

from stocks_app.views.stock_functions import get_stock
urlpatterns = [
    path('api/auth/', include('stocks_app.urls.auth')),
    path('api/stocks/', include('stocks_app.urls.stocks')),
    path('api/favorite-stocks/<str:symbol>/', toggle_favorite_stock, name='toggle_favorite_stock'),
    path('api/stock/<str:symbol>/', get_stock ,name='get_stock'),
    path('api/reports/<str:symbol>/', ReportsView.as_view(), name='reports'),

]
