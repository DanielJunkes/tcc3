
from django.http import HttpResponse
from api_htmx.models import Item

def create_item(request):
    item_request = request.POST.get('item')
    
    item = Item(item_request, False)

    print(item)
    
    return HttpResponse('aaaaaaaaaaaaa')