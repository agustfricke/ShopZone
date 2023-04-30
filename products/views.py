from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from backend.permissions import IsOwnerOrReadOnly

from . models import Product, Review
from . serializers import ProductSerializer, ReviewSerializer
from backend.pagination import CustomPagination 

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomPagination
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET', 'PUT', 'DELETE'])
def prod_detail(request, pk):
    try:
        prod = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(prod)
        return Response(serializer.data)

    elif request.method == 'PUT':
        if request.user.is_staff:
            serializer = ProductSerializer(prod, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    elif request.method == 'DELETE':
        if request.user.is_staff:
            prod.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

# Poner esto dentro de la clase ProductList??
@api_view(['GET'])
def search(request):
    query = request.query_params.get('query')
    if query == None:
        query = ''
    prod = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(prod, many=True)
    return Response({ 'prod': serializer.data })

class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
