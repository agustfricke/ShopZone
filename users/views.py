from rest_framework_simplejwt.views import TokenObtainPairView
from . serializers import MyTokenObtainPairSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from . models import User
from rest_framework import generics

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
