from django.http import JsonResponse
from django.shortcuts import render
from api_htmx.models import Item
import json


# Create your views here.
def get_itens(request):
    return render(request, 'list_itens.html')