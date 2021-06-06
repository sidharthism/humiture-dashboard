from django.contrib.auth.models import User
from django.db import models

# @TODO Add notes field to user


class MetricRec(models.Model):
    Time = models.CharField(max_length=64)
    Temperature = models.CharField(max_length=32)
    Humidity = models.CharField(max_length=32)
    Day = models.CharField(max_length=64)

    def __str__(self):
        return self.Day + ' ' + self.Time


class Note(models.Model):
    content = models.TextField(max_length=300)
    owner = models.ForeignKey(
        User, related_name="notes", on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        ordering = ['-created']
