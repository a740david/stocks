from rest_framework import serializers
from stocks_app.models import Reports

class ReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reports
        fields = ['stock', 'date', 'eps', 'revenue']
