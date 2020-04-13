from django.contrib.auth.models import User
from rest_framework import generics, serializers, permissions
from rest_framework.response import Response

from .models import Record, Habit
from .serializers import RecordSerializer, HabitSerializer


class RecordListView(generics.ListCreateAPIView):
    serializer_class = RecordSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Record.objects.filter(account=self.request.user)
        return queryset


class HabitListView(generics.ListCreateAPIView):
    serializer_class = HabitSerializer
    # permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Habit.objects.filter(account=self.request.user)
        return queryset
