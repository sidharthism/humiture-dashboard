from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
# from rest_framework import status
import os
import json
import requests

from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView

from .serializers import UserSerializer, MetricRecSerializer, NoteSerializer
from .models import Note, MetricRec


class UserCreateView(APIView):
    permission_classes = [AllowAny, ]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)

        if(serializer.is_valid()):
            user = serializer.save()
            return Response(user)
        else:
            return Response(serializer.errors)


class MetricRecView(ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, ]
    serializer_class = MetricRecSerializer
    queryset = MetricRec.objects.all()


class NoteListCreateView(ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, ]
    serializer_class = NoteSerializer

    def get_queryset(self):
        queryset = Note.objects.filter(owner=self.request.user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class NoteDeleteView(DestroyAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny, IsAuthenticated]
    serializer_class = NoteSerializer

    def get_queryset(self):
        queryset = Note.objects.filter(id=self.kwargs['pk'])
        return queryset


@api_view(["POST", ])
@permission_classes([AllowAny, ])
def siteverify(req, *args, **kwargs):
    SECRET_KEY = os.environ.get("RECAPTCHA_SECRET_KEY")
    token = json.loads(req.body.decode("utf-8"))["token"]
    cres = requests.post(
        "https://www.google.com/recaptcha/api/siteverify?secret="+SECRET_KEY+"&response="+token)
    cres_json = cres.json()
    return Response(cres_json)
