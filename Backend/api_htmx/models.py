from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class Item(models.Model):
    item = models.CharField(max_length=255)
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return f'item: {self.item}, status: {self.status}'