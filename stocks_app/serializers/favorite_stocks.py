from rest_framework import serializers

from stocks_app.models import Stock



class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = '__all__'


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        exclude = ['user']