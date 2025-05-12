from django.http import JsonResponse
from API.models import Item
import json

def create_item(request):
    dados = json.loads(request.body)
    item = dados.get('item')
    status = dados.get('status')

    item = Item(item=item, status=status)
    item.save()
    
    return JsonResponse({'message': 
    'Item criado com sucesso!', 
    'item': {'id': item.id, 'item': item.item, 
    'status': item.status}})
    
def get_itens(request):
    
    itens = Item.objects.all().values()
    
    return JsonResponse({'itens': list(itens)})

def update_item(request, id):
    try:
        item = Item.objects.get(id = id)
        dados = json.loads(request.body)
        
        item.item = dados.get('item')
        item.status = dados.get('status')
        
        item.save()
        return JsonResponse({'message': 
            'Item atualizado com sucesso!'})
    except Item.DoesNotExist:
        return JsonResponse({'error': 
            'Item não encontrado'}, status=404)
    
def delete_item(request, id):
    try:
        item = Item.objects.get(id = id)
        item.delete()
        return JsonResponse({'message': 
            'Item deletado com sucesso!'})
    except Item.DoesNotExist:
        return JsonResponse({'error': 
            'Item não encontrado'}, status=404)