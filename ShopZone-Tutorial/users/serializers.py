from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from . models import User

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['username', 'email', 'avatar', 'is_staff', 'id']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['avatar'] = user.avatar.url
        token['is_staff'] = user.is_staff

        return token
