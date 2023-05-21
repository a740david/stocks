from rest_framework import serializers
from stocks_app.models import  FavoriteStocks



class FavoriteStocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteStocks
        fields = '__all__'
class CreateFavoriteStocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteStocks
        exclude = ['user']