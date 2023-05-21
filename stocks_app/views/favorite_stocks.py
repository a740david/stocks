from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import BasePermission

from stocks_app.models import FavoriteStocks
from stocks_app.serializers.favorite_stocks import FavoriteStocksSerializer, CreateFavoriteStocksSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from stocks_app.models import FavoriteStocks, Stock
from stocks_app.serializers.favorite_stocks import FavoriteStocksSerializer
class FavoriteStocksPermissions(BasePermission):

    def has_permission(self, request, view):
        print('Called has_permission')
        if request.method in ['POST', 'GET']:
            return request.user.is_authenticated
        return True

    def has_object_permission(self, request, view, obj):
        print('Called has_object_permission')
        if request.method in ['PATCH', 'PUT', 'DELETE']:
            return request.user.is_authenticated and request.user.id == obj.user_id
        return True

class FavoriteStocksViewSet(viewsets.ModelViewSet):

    queryset = FavoriteStocks.objects.all()
    serializer_class = FavoriteStocksSerializer
    permission_classes = [FavoriteStocksPermissions]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateFavoriteStocksSerializer
        return self.serializer_class

    def get_queryset(self):
        qs = self.queryset
        if self.action == 'list':
            if 'user' in self.request.query_params and self.request.query_params['user'] == 'me':
                qs = qs.filter(user=self.request.user)
        return qs

    def perform_create(self, serializer):
        user = self.request.user
        stock = serializer.validated_data['stock']

        if FavoriteStocks.objects.filter(user=user, stock=stock).exists():
            raise ValidationError(detail="User can create only one favorite stock per stock")

        serializer.save(user=user)



@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])  # Add the IsAuthenticated permission class
def toggle_favorite_stock(request, symbol):
    user = request.user

    try:
        stock = Stock.objects.get(symbol=symbol)
    except Stock.DoesNotExist:
        return Response({'message': 'Stock not found.'}, status=404)

    if request.method == 'POST':
        favorite_stock = FavoriteStocks.objects.filter(user=user, stock=stock).first()

        if favorite_stock is None:
            favorite_stock = FavoriteStocks.objects.create(user=user, stock=stock)
            created = True
        else:
            created = False
        if created:
            serializer = FavoriteStocksSerializer(favorite_stock)
            return Response(serializer.data, status=201)
        else:
            return Response({'message': 'Stock already added to favorites.'}, status=200)

    elif request.method == 'DELETE':
        favorite_stock = FavoriteStocks.objects.filter(user=user, stock=stock)
        favorite_stock.delete()
        return Response({'message': 'Stock removed from favorites.'}, status=200)
