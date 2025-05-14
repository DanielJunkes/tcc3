from django.urls import path
from api_htmx import htmx_views
from . import views

urlpatterns = [
    path('', views.get_itens, name='get_itens'),
]

htmx_patterns = [
    path('create_item', htmx_views.create_item, name='create_item'),
]

urlpatterns += htmx_patterns