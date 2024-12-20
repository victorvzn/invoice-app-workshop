from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Client, InvoiceItem, Invoice

class ClientsSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ItemsSerializer(ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = '__all__'

class InvoicesSerializer(ModelSerializer):
    client = ClientsSerializer(read_only=True)
    items = ItemsSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'