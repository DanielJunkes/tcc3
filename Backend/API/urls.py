from django.urls import path
from . import views

urlpatterns = [
    path('get_itens/', views.get_itens, name='get_itens'),
    path('create_item/', views.create_item, name='create_item'),
    path('get_item/<str:item>/', views.get_item, name='get_item'),
    path('update_item/<str:item>/', views.update_item, name='update_item'),
    path('delete_item/<str:item>/', views.delete_item, name='delete_item'),
]
