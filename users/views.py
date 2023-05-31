from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, IsAuthenticated

from . serializers import (
        MyTokenObtainPairSerializer,
        MyUserSerializer,
        UserSerializer
        )
from . models import User
from . permissions import IsOwnerOrReadOnly
from backend.pagination import CustomPagination


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    paginator = CustomPagination()
    paginated_users = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(paginated_users, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
            )
    serializer = MyUserSerializer(user, many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
