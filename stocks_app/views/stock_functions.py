import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from stocks_app.models import Stock


@csrf_exempt
def get_stock(request, symbol):
    stocks = Stock.objects.filter(symbol=symbol)
    if stocks.exists():
        stock = stocks.first()
        data = {
            'name': stock.name,
            'symbol': stock.symbol,
            'price': stock.price,
            'pe_ratio': stock.pe_ratio,
            'mkt_cap': stock.mkt_cap,
            'date':stock.date
        }
    else:
        # Fetch from the external API
        url = f"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols={symbol}"
        headers = {
            "X-RapidAPI-Key": "9b8601fc54msh9daf9ad8150ed7ep1690f8jsn49adbb58750c",  # Replace with your actual API key
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            # Extract the necessary information from the API response
            # Assuming the structure is {"quoteResponse": {"result": [...]}}
            stock_data = data.get("quoteResponse", {}).get("result", [])
            if stock_data:
                stock_data = stock_data[0]
                data = {
                    'name': stock_data.get("longName"),
                    'symbol': stock_data.get("symbol"),
                    'price': stock_data.get("regularMarketPrice"),
                    'pe_ratio': stock_data.get("trailingPE"),
                    'mkt_cap': stock_data.get("marketCap")
                }
                # Save the stock data to the database if it doesn't exist
                stock, created = Stock.objects.get_or_create(symbol=data['symbol'], defaults=data)
                if not created and stock.price != data['price']:
                    stock.price = data['price']
                    stock.save()
            else:
                return JsonResponse({'error': 'Failed to fetch stock data from the API'}, status=500)
        else:
            return JsonResponse({'error': 'Failed to fetch stock data from the API'}, status=500)

    return JsonResponse(data)
