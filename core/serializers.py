from rest_framework import serializers
from .models import user, event, eAttendee

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id', 'userName', 'email', 'password', 'status')

class eventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event
        fields = ('id', 'title', 'startTimeUtc', 'endTimeUtc', 'isAllDay', 'location', 'update', 'createdBy', 'decryption', 'status')

class eventAttendee(serializers.ModelSerializer):
    class Meta:
        model = eAttendee
        fields = ('id', 'title', 'userCreatedId', 'eventId', 'listUser')