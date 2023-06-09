# Generated by Django 4.2 on 2023-05-15 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocks_app', '0002_alter_stock_mkt_cap'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='pe_ratio',
            field=models.DecimalField(blank=True, db_column='P/E ratio', decimal_places=2, max_digits=14, null=True),
        ),
    ]
