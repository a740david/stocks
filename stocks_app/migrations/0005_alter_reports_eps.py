# Generated by Django 4.2 on 2023-06-19 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocks_app', '0004_rename_stocks_favoritestocks_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reports',
            name='eps',
            field=models.DecimalField(db_column='eps', decimal_places=2, max_digits=20),
        ),
    ]