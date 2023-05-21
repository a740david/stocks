from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Stock(models.Model):

    name = models.CharField(db_column='name', max_length=256, null=False)
    pe_ratio = models.DecimalField(db_column='P/E ratio', max_digits=14, decimal_places=2, null=True,blank=True)
    mkt_cap = models.DecimalField(db_column='mkt_cap', max_digits=18, decimal_places=2, null=False )
    price = models.DecimalField(db_column='price', max_digits=20, decimal_places=2, null=False)
    symbol = models.CharField(db_column='symbol', max_length=10, validators=[RegexValidator(r'^[A-Z\d]+$')], null=False )
    date = models.DateField(db_column='date', null=False,auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'stocks'
        ordering = ['id']

class FavoriteStocks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)


    class Meta:
        db_table = 'favorite_stocks'
#
class Reports(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.RESTRICT)
    date = models.DateField(db_column='date', null=False )
    eps = models.DecimalField(db_column='eps', max_digits=20, decimal_places=2, null=False)
    revenue = models.DecimalField(db_column='revenue',max_digits=20, decimal_places=2 ,null=False)

    class Meta:
        db_table = 'reports'

class Dividend(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.RESTRICT)
    x_day = models.DateField(db_column='x_day', null=False,blank=False)
    price = models.DecimalField(db_column='price', max_digits=10, decimal_places=2, null=False)
    yield_year = models.DecimalField(db_column='yield_year', max_digits=6, decimal_places=2, null=False)
    date_of_payment = models.DateField(db_column='date_of_payment', null=False,)

    class Meta:
        db_table = 'dividend'

class Sector(models.Model):
    name = models.CharField(db_column='name', max_length=100, null=False)

    class Meta:
        db_table = 'sector'


class News(models.Model):
    date = models.DateField(db_column='date', null=False)
    text_news=models.TextField(db_column='text_news' ,null=False)
    stocks = models.ManyToManyField(Stock, through='News_Analysis')
    sector = models.ManyToManyField(Sector, through='News_Analysis')



class News_Analysis(models.Model):
    news=models.ForeignKey(News, on_delete=models.CASCADE)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE, null=True,blank=True)
    stocks = models.ForeignKey(Stock, on_delete=models.CASCADE, null=True,blank=True)
    sentiment= models.CharField(db_column='sentiment', max_length=256, null=False)
    class Meta:
        db_table = 'news_analysis'


