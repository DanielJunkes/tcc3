from django.urls import path
from api_htmx import htmx_views
from . import views

urlpatterns = [
    path('', views.get_itens, name='list_itens'),
]

htmx_patterns = [
    path('create_item', htmx_views.create_item, name='create_item'),
    path('delete_item/<int:item_id>/', htmx_views.delete_item, name='delete_item'),
    path('toggle-status/<int:item_id>/', htmx_views.toggle_status, name='toggle_status'),
    path('edit-item-form/<int:item_id>/', htmx_views.edit_item_form, name='edit_item_form'),
    path('update-item/<int:item_id>/', htmx_views.update_item, name='update_item'),
    path('get-item/<int:item_id>/', htmx_views.get_item, name='get_item'),
]

urlpatterns += htmx_patterns