from rest_framework import serializers
from . models import Product, Review

class ReviewSerializer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField(source='user.avatar.url')
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Review
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url


class ProductSerializer(serializers.ModelSerializer):

    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

