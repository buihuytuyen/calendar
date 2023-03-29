from django.contrib import admin
from .models import user, event, eAttendee# Register your models here.

class userAdmin(admin.ModelAdmin):
    list_display = ('userName', 'email', 'password', 'status')
class eventAdmin(admin.ModelAdmin):
    list_display = ('title', 'startTimeUtc', 'endTimeUtc', 'isAllDay', 'location', 'update', 'createdBy', 'decryption', 'status')

class eAttendeeAdmin(admin.ModelAdmin):
    list_display = ('title', 'userCreatedId', 'eventId', 'listUser')

admin.site.register(user)
admin.site.register(event)
admin.site.register(eAttendee)

