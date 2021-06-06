from django.contrib import admin

from .models import Note, MetricRec

# Register your models here.
admin.site.register(MetricRec)
admin.site.register(Note)
