from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
# Create your models here.
User = get_user_model()

class user(models.Model):
    id = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=16)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.userName

class event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30)
    startTimeUtc = models.DateTimeField()
    endTimeUtc = models.DateTimeField()
    isAllDay = models.BooleanField(default=False)
    location = models.CharField(max_length=30)
    update = models.DateTimeField()
    createdBy = models.IntegerField()
    decryption = models.CharField(max_length=100)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def dump(self):
        return {"Event": {'id': self.id, 'title': self.title, 'StartTime': self.startTimeUtc,
                        'EndTime': self.endTimeUtc, 'AllDay': self.isAllDay, 'Location': self.location,
                        'Update': self.update, 'Created': self.createdBy, 'decryption': self.decryption, 'Status': self.status}}

# class event_attendee(models.Model):
#     id = models.AutoField(primary_key=True)
#     userCreatedId = models.IntegerField()
#     eventId = models.IntegerField()
#     listUser = models.JSONField()


#     def __str__(self):
#         self.listUser

class eAttendee(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30)
    userCreatedId = models.IntegerField()
    eventId = models.IntegerField()
    listUser = models.CharField(max_length=1000)
    
    def __str__(self):
        return self.title

# class eventAttendee(models.Model):
#     id = models.AutoField(primary_key=True)
#     title = models.CharField(max_length=30)
#     userCreatedId = models.IntegerField()
#     eventId = models.IntegerField()
#     subscribeUser = models.IntegerField()
    
#     def __str__(self):
#         return self.title

class subscribeUser(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30)
    userCreatedId = models.IntegerField()
    eventId = models.IntegerField()
    subscribeUser = models.IntegerField()
    
    def __str__(self):
        return self.title