from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list),
    path('<int:pk>/', views.product_detail),
    path('review/<int:pk>/', views.ReviewList.as_view()),
    path('review/<int:pk>/', views.ReviewDetail.as_view()),
    path('search/', views.search),
]
