from api_htmx.models import Item
from django.shortcuts import render

def create_item(request):
    item_request = request.POST.get('item')

    item = Item(item = item_request, status = False)
    item.save()
    itens = Item.objects.all()

    return render(request, 'partials/htmx_components/itens.html', {'itens': itens})

def delete_item(request, item_id):
    item = Item.objects.get(id=item_id)
    item.delete()

    itens = Item.objects.all()

    return render(request, 'partials/htmx_components/itens.html', {'itens': itens})

def toggle_status(request, item_id):
    item = Item.objects.get(id=item_id)
    
    item.status = not item.status
    item.save()
    
    itens = Item.objects.all()
    
    return render(request, 'partials/htmx_components/itens.html', {'itens': itens})

def edit_item_form(request, item_id):
    item = Item.objects.get(id=item_id)
    
    return render(request, 'partials/htmx_components/edit_item_form.html', {'item': item})

def update_item(request, item_id):
    item = Item.objects.get(id=item_id)
    item.item = request.POST.get('item_name')
    
    item.save()
    
    itens = Item.objects.all()
    return render(request, 'partials/htmx_components/itens.html', {'itens': itens})

def get_item(request, item_id):
    item = Item.objects.get(id=item_id)
    
    return render(request, 'partials/htmx_components/item.html', {'item': item})