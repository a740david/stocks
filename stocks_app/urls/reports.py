from rest_framework.routers import DefaultRouter

from stocks_app.views.reports import ReportsView

# automatically defining urls for StocksViewSet
router = DefaultRouter()
router.register('', ReportsView)

urlpatterns = []

# adding stocks urls to urlpatterns
urlpatterns.extend(router.urls)