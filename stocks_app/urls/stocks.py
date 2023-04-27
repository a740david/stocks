from django.urls import path
from rest_framework.routers import DefaultRouter

from stocks_app.views.stocks import StocksViewSet

# automatically defining urls for StocksViewSet
router = DefaultRouter()
router.register('', StocksViewSet)

urlpatterns = []

# adding stocks urls to urlpatterns
urlpatterns.extend(router.urls)