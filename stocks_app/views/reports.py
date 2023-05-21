import requests
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from stocks_app.models import Reports, Stock
from stocks_app.serializers.reports import ReportsSerializer

class ReportsView(APIView):
    def get(self, request, symbol):
        # Retrieve the stock based on the symbol
        stocks = Stock.objects.filter(symbol=symbol)
        if not stocks.exists():
            return Response({'error': 'Stock not found'}, status=404)

        stock = stocks.first()

        # Check if reports already exist in the database
        existing_reports = Reports.objects.filter(stock=stock)
        if existing_reports.exists():
            serializer = ReportsSerializer(existing_reports, many=True)
            return Response(serializer.data)

        # Fetch reports from the external API
        url = f"https://financialmodelingprep.com/api/v3/income-statement/{symbol}?limit=120&apikey=aaec36143e8f180a441333aa5d08bd6c"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()

            if isinstance(data, list):
                reports_data = data[:3]  # Retrieve the last 3 years of reports
            else:
                reports_data = data.get('financials', [])[:3]

            if not reports_data:
                return Response({'error': 'No reports found for the stock'}, status=404)

            reports = []
            for report_data in reports_data:
                date_str = report_data.get('date')
                eps = report_data.get('eps')
                revenue = report_data.get('revenue')

                # Convert date string to Python date object
                date = datetime.strptime(date_str, '%Y-%m-%d').date()

                # Create a Reports instance
                report = Reports(stock=stock, date=date, eps=eps, revenue=revenue)
                reports.append(report)

            # Remove existing reports for the stock
            Reports.objects.filter(stock=stock).delete()

            # Save the new reports to the database
            Reports.objects.bulk_create(reports)

            serializer = ReportsSerializer(reports, many=True)
            return Response(serializer.data)

        return Response({'error': 'Failed to fetch reports from the API'}, status=500)
