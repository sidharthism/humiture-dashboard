from django.urls import path
from .views import MetricRecView, NoteListCreateView, NoteDeleteView, siteverify

urlpatterns = [
    path('metrics/', MetricRecView.as_view()),
    path('notes/', NoteListCreateView.as_view()),
    path('note/<int:pk>/', NoteDeleteView.as_view()),
    path('siteverify/', siteverify)
]
