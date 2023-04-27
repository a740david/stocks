from rest_framework import viewsets, mixins
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework.permissions import IsAuthenticated, IsAdminUser, BasePermission, SAFE_METHODS
from rest_framework.viewsets import GenericViewSet

from stocks_app.models import Stock
from stocks_app.serializers.stocks import StockSerializer


class StocksPaginationClass(PageNumberPagination):
    page_size = 3


class StocksPermissions(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['POST', 'PUT', 'PATCH','DELETE']:
            return request.user.is_staff
        return True




class StocksViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):

    queryset = Stock.objects.all()

    permission_classes = [StocksPermissions]
    # authentication_classes = [JWTAuthentication]

    # we need different serializers for different actions
    serializer_class = StockSerializer

    # pagination is defined either using DEFAULT_PAGINATION_CLASS in settings.py
    # or you can specify one here

    pagination_class = StocksPaginationClass




















