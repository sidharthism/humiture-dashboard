from django.urls import path
from .views import NoteListCreateView, NoteDeleteView

urlpatterns = [
    path('notes/', NoteListCreateView.as_view()),
    path('note/<int:pk>/', NoteDeleteView.as_view())
]
