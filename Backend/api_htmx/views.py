from django.http import JsonResponse
from django.shortcuts import render
from api_htmx.models import Item
import json
from .models import Item

# Create your views here.
def get_itens(request):
    
    itens = Item.objects.all()
    
    return render(request, 'list_itens.html', {'itens': itens})