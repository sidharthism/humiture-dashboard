from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import serializers

from .models import Note, MetricRec


class UserSerializer(serializers.ModelSerializer):
    passwordConfirm = serializers.CharField(write_only=True)
    # notes = serializers.PrimaryKeyRelatedField(
    #     many=True, queryset=Note.objects.all())

    class Meta:
        model = User
        fields = ['username', 'password', 'passwordConfirm']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(username=self.validated_data['username'])
        password = self.validated_data['password']
        passwordConfirm = self.validated_data['passwordConfirm']

        if(password != passwordConfirm):
            raise serializers.ValidationError(
                {'password': "Passwords should match"})
        user.set_password(password)
        user.save()
        token = Token.objects.create(user=user)
        return {'username': user.username, 'token': token.key}


class MetricRecSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricRec
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "content"]
