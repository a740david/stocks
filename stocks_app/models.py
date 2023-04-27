from django.core.validators import RegexValidator
from django.db import models


# Create your models here.
class Stock(models.Model):
    name = models.CharField(db_column='name', max_length=256, null=False)
    pe_ratio = models.DecimalField(db_column='P/E ratio', max_digits=6, decimal_places=2, null=True)
    mkt_cap = models.DecimalField(db_column='mkt_cap', max_digits=10, decimal_places=2, null=False)
    price = models.DecimalField(db_column='price', max_digits=10, decimal_places=2, null=False)
    symbol = models.CharField(db_column='symbol', max_length=10, validators=[RegexValidator(r'^[A-Z\d]+$')], null=False)
    date = models.DateField(db_column='date', null=False)

    class Meta:
        db_table = 'stocks'


class Dividend(models.Model):
    stock = models.ForeignKey('Stock', on_delete=models.RESTRICT)
    x_day = models.DateField(db_column='x_day', null=False)
    price = models.DecimalField(db_column='price', max_digits=10, decimal_places=2, null=False)
    yield_year = models.DecimalField(db_column='yield_year', max_digits=6, decimal_places=2, null=False)
    date_of_payment = models.DateField(db_column='date_of_payment', null=False)

    class Meta:
        db_table = 'dividend'


class User(models.Model):
    name = models.CharField(db_column='name', max_length=100, null=False)
    email = models.EmailField(db_column='email', max_length=100, unique=True, null=False)
    password = models.CharField(db_column='password', max_length=256, null=False)

    stock = models.ManyToManyField(Stock, through='FavoriteStocks')
    class Meta:
        db_table = 'users'


class FavoriteStocks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    is_marked = models.BooleanField(db_column='is_marked', default=False)

    class Meta:
        db_table = 'favorite stocks'

class Sector(models.Model):
    name = models.CharField(db_column='name', max_length=100, null=False)
    stock = models.ForeignKey('Stock', on_delete=models.RESTRICT)
    stock = models.ManyToManyField(Stock, through='News_Analysis')
    class Meta:
        db_table = 'sector'

class Reports(models.Model):
    stock = models.ForeignKey('Stock', on_delete=models.RESTRICT)
    date = models.DateField(db_column='date', null=False)
    eps = models.DecimalField(db_column='eps', max_digits=10, decimal_places=2, null=False)
    revenue = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        db_table = 'reports'

class News(models.Model):
    date = models.DateField(db_column='date', null=True)
    text_news=models.TextField(db_column='text_news' ,null=True)
    sector = models.ManyToManyField(Stock, through='News_Analysis')
    class Meta:
        db_table = 'news'

class News_Analysis(models.Model):
    news=models.ForeignKey(News, on_delete=models.CASCADE)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    sentiment= models.CharField(db_column='sentiment', max_length=256, null=False)
    class Meta:
        db_table = 'news_analysis'


