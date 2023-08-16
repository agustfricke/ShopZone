from django.contrib import admin
from . models import Order, Orderitem, ShippingAddress

admin.site.register(Order)
admin.site.register(Orderitem)
admin.site.register(ShippingAddress)
