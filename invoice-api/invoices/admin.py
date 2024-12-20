from django.contrib import admin

from .models import Client, Invoice, InvoiceItem

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'country', 'city')

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
  list_display = ('description', 'date', 'paymentTerms', 'status', 'total', 'client')

@admin.register(InvoiceItem)
class InvoiceItemAdmin(admin.ModelAdmin):
  list_display = ('name', 'quantity', 'price')
