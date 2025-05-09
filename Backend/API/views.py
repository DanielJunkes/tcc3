from django.http import JsonResponse
from models import Item

def create_item(request):
    item = request.POST.get('item')
    status = request.POST.get('status')
    
    # Crie um novo item com os dados fornecidos
    item = Item(item=item, status=status) 
    item.save()
    
    return JsonResponse({'message': 'Item criado com sucesso!'})
    
def get_itens():
    
    itens = Item.objects.all().values()
    
    return JsonResponse({'itens': list(itens)})

def get_item(request, item):
    try:
        item = Item.objects.get(item = item)
        return JsonResponse({'item': item.item, 'status': item.status})
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item não encontrado'}, status=404)
    
def update_item(request, item):
    try:
        item = Item.objects.get(item = item)
        
        item.item = request.POST.get('item')
        item.status = request.POST.get('status')
        
        item.save()
        return JsonResponse({'message': 'Item atualizado com sucesso!'})
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item não encontrado'}, status=404)
    
def delete_item(request, item):
    try:
        item = Item.objects.get(item = item)
        item.delete()
        return JsonResponse({'message': 'Item deletado com sucesso!'})
    except Item.DoesNotExist:
        return JsonResponse({'error': 'Item não encontrado'}, status=404)