# Generated by Django 4.2 on 2023-05-04 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocks_app', '0002_alter_news_analysis_sector_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='date',
            field=models.DateField(auto_now_add=True, db_column='date'),
        ),
    ]