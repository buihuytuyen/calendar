# Generated by Django 4.1.3 on 2023-01-27 05:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_delete_event_attendee_alter_eattendee_listuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eattendee',
            name='listUser',
            field=models.CharField(max_length=1000),
        ),
    ]
