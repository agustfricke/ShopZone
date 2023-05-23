from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list),
    path('create/', views.create_porduct),
    path('<str:name>/', views.product_detail),
    path('review/<int:pk>/', views.ReviewList.as_view()),
    path('review/<int:pk>/', views.ReviewDetail.as_view()),
    path('search/', views.search),
]
