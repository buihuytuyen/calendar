from django.shortcuts import render
from .models import user, event, subscribeUser
from .serializers import userSerializer, eventSerializer, eventAttendee
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status 
import json
from datetime import datetime
import pandas as pd
import csv
import math
## TEST API

# class userView(viewsets.ModelViewSet):
#     serializer_class = userSerializer
#     queryset = user.objects.all()

# @api_view(['GET', 'POST'])
# def userlist(request):
#     if request.method == 'GET':
#         data = user.objects.all()

#         serializer = userSerializer(data, context={'request': request}, many=True)

#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = userSerializer(data=request.data)

#         if serializer.is_valid():

#             serializer.save()
#             return Response(status=status.HTTP_201_CREATED)
#         print(request.data)
#         return Response(status=status.HTTP_204_NO_CONTENT);

        
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['PUT', 'DELETE'])
# def detail_list(request):
#     try:
#         body_unicode = request.body.decode('utf-8')
#         body = json.loads(body_unicode)
#         id = body['id']
#         User = user.objects.get(id=id)
#     except User.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'PUT':
#         serializer = userSerializer(User, data = request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         User.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

## END TEST API

## API FOR SIGNUP

@api_view(['GET', 'POST'])
def signup(request):
    if request.method == 'GET':
        data = user.objects.all()

        serializer = userSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        userName = request.data['name']
        email = request.data['email']
        password = request.data['password']
        confirmedPassword = request.data['confirmedPassword']

        
        if(user.objects.filter(email=email)).exists():
            return Response("email is existed",status=status.HTTP_400_BAD_REQUEST)
        elif(user.objects.filter(userName=userName)).exists():
            return Response("Username is existed", status=status.HTTP_400_BAD_REQUEST)
        else:
            User = user(userName=userName, email=email, password=password)
            User.save()

    return Response(status=status.HTTP_200_OK)

## API FOR LOGIN

@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'GET':
        data = user.objects.all()

        serializer = userSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    elif request.method == "POST":
        email = request.data['email']
        password = request.data['password']

        if(user.objects.filter(email = email) and user.objects.get(email=email).password == password):
            num = user.objects.get(email = email).id
            username = user.objects.get(email=email).userName
            return Response({num, username}, status=status.HTTP_200_OK)
        else:
            return Response("email or password isn't valid", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def eventCRUD(request):
    if request.method == 'GET':
        data = event.objects.all()

        serializer = eventSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        title = request.data['title']
        startTimeUtc = request.data['startTimeUtc']
        endTimeUtc = request.data['endTimeUtc']
        created = request.data['created']
        isAllDay = request.data['isAllDay']
        location = request.data['location']
        update = datetime.now()
        decryption = request.data['decryption']
        eventStatus = request.data['eventStatus']

        print(startTimeUtc, endTimeUtc)
        Event = event(title = title, startTimeUtc = startTimeUtc, endTimeUtc = endTimeUtc, isAllDay = isAllDay,
                    createdBy=created,location = location, update = update, decryption = decryption, status = eventStatus)
        Event.save()

        # EventAttendee = eAttendee()
        # EventAttendee.userCreatedId = created
        # EventAttendee.title = title
        # EventAttendee.eventId = Event.id
        # EventAttendee.listUser = created
        # EventAttendee.save()
        # print(EventAttendee.title)
        return Response(status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        id = request.data["id"]
        Event = event.objects.get(id=id)
        Event.update = datetime.now()
        serializer = eventSerializer(Event, data = request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        id = request.data["id"]
        Event = event.objects.get(id=id)
        Event.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def exportEvent(request):
    if request.method == 'GET':
        userId = request.data['userId']
        Event = event.objects.filter(createdBy = userId)
        User = user.objects.get(id = userId)
        df = pd.DataFrame()
        df.to_csv(r'F:\Calendar_export.csv', index=False, header=True)
        f = open('F:\Calendar_export.csv', 'w')
        writer = csv.writer(f)
        header = ['Id', 'Title', 'StartTime', 'EndTime', 'AllDay', 'Location', 'Update', "CreatedBy", 'Decryption', 'Status']
        writer.writerow(header)
        
        print(User.userName)

        for e in Event:
            writer.writerow([e.id, e.title, e.startTimeUtc, e.endTimeUtc, e.isAllDay, e.location,
                            e.update, User.userName, e.decryption, e.status])
        return Response('File have been created', status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def importEvent(request):
    if request.method == 'POST':
        userId = request.POST['userId']
        f = request.FILES['file']
        df = pd.read_csv(f, delimiter=',')
        
        list_of_csv = [row for row in df.values]
        i = 0
        for mem in list_of_csv:
            for item in mem:
                if str(item) == 'nan':
                    del list_of_csv[i]
                    break
            i += 1
        for mem in list_of_csv:
            data = []
            for item in mem:
                data.append(item)
            Event = event(title = data[0], startTimeUtc = data[1], endTimeUtc = data[2],
                        isAllDay = data[3], location = data[4], update = datetime.now(), 
                        createdBy=userId, decryption = data[7], status = data[8])
            Event.save() 

    message = 'Import Success'
    return Response(message, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def subscribe(request):
    if request.method == "POST":
        userId = request.data['userId']
        title = request.data['title']
        name = request.data['username']

        Event = event.objects.filter(title=title)
        User = user.objects.get(userName=name)

        if(Event is not None and User is not None):
            for e in Event:
                if(e.createdBy == User.id):
                    eAtt = subscribeUser()
                    eAtt.title = title
                    eAtt.userCreatedId = User.id
                    eAtt.eventId = e.id
                    eAtt.subscribeUser = userId
                    eAtt.save()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND) 

@api_view(['GET', 'POST'])
def sendEvent(request):

    if request.method == "GET":
        Event = event.objects.all()
        eAtt = subscribeUser.objects.all()
        userId = request.data['userId']
        array = []
        # print(userId)

        for e in Event:
            if e.createdBy == int(userId):
                array.append(e)             
        for e in eAtt:
            if e.subscribeUser == int(userId):
                array.append(e)
        jsonList = json.dumps([o.dump()  for o in array], indent = 3, sort_keys=True, default=str)
        print(jsonList)
        return Response(jsonList, status=status.HTTP_200_OK)