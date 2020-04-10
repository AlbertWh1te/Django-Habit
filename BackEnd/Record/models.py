from django.db import models
from django.conf import settings
from enum import Enum


class Status(Enum):
    activate = 1
    suspended = 2


class Habit(models.Model):
    update_time = models.DateField(auto_now_add=True)
    create_time = models.DateField(auto_now=True)
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
    name = models.CharField(max_length=255)
    totall_times = models.IntegerField(default=0)
    current_times = models.IntegerField(default=0)
    status = models.PositiveIntegerField(
        default=1, choices=[(tag, tag.value) for tag in Status]
    )


class Record(models.Model):
    update_time = models.DateField(auto_now_add=True)
    create_time = models.DateField(auto_now=True)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,)
