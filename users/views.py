from rest_framework_simplejwt.views import TokenObtainPairView
from . serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
