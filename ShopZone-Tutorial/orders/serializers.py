from rest_framework import serializers
from .models import Order, Orderitem, ShippingAddress

class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orderitem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField(source='product.image.url')
    user = serializers.ReadOnlyField(source='user.username')
    #???
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    # def get_image(self, obj):
    #     return obj.product.image.url

    # Se puede hacer mejor??
    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    # Se puede hacer mejor??
    def get_shipping_address(self, obj):
        try:
            address = ShippingSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

