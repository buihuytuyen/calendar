# Generated by Django 4.1.3 on 2023-02-04 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_eventattendee'),
    ]

    operations = [
        migrations.CreateModel(
            name='subscribeUser',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=30)),
                ('userCreatedId', models.IntegerField()),
                ('eventId', models.IntegerField()),
                ('subscribeUser', models.IntegerField()),
            ],
        ),
        migrations.DeleteModel(
            name='eventAttendee',
        ),
    ]
