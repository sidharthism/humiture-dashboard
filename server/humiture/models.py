from django.contrib.auth.models import User
from django.db import models

# @TODO Add notes field to user


class Note(models.Model):
    content = models.TextField(max_length=300)
    owner = models.ForeignKey(
        User, related_name="notes", on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        ordering = ['-created']
