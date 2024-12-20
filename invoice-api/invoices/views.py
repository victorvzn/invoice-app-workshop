
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from .serializers import ClientsSerializer, ItemsSerializer, InvoicesSerializer
from .models import Client, InvoiceItem, Invoice

class InvoicesView(APIView):

  def get(self, request: Request):
    invoices = Invoice.objects.all()

    paginator = PageNumberPagination()
    paginated_invoices = paginator.paginate_queryset(invoices, request)

    serializer = InvoicesSerializer(paginated_invoices, many=True)

    return paginator.get_paginated_response(serializer.data)

  def post(self, request: Request):

    clientData = {
      'name': request.data.get('name'),
      'email': request.data.get('email'),
      'address': request.data.get('address'),
      'city': request.data.get('city'),
      'zipCode': request.data.get('zipCode'),
      'country': request.data.get('country'),
    }

    invoiceData = {
      'date': request.data.get('date'),
      'paymentTerms': request.data.get('paymentTerms'),
      'description': request.data.get('description'),
    }

    itemsData = request.data.get('items')

    # Save client
    clientSerializador = ClientsSerializer(data=clientData)

    print('clientSerializador', clientSerializador)

    clientSaved = None

    if clientSerializador.is_valid():
      clientSaved = clientSerializador.save()

      print(clientSaved)
    else:
      return Response(data={
        'message': 'Error creating client',
        'content': clientSerializador.errors
      }, status=status.HTTP_400_BAD_REQUEST)
    
    # Save items and get their ids
    
    itemIdsSaved = []

    total = 0

    for item in itemsData:
      itemSerializer = ItemsSerializer(data=item)
      if itemSerializer.is_valid():
        item_instance = itemSerializer.save()

        itemIdsSaved.append(item_instance)

        total += item_instance.price * item_instance.quantity
      else:
        return Response(data={
          'message': 'Error creating item',
          'content': itemSerializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    # Save invoice manually asociated with client

    invoice = Invoice(
        date=invoiceData['date'],
        paymentTerms=invoiceData['paymentTerms'],
        description=invoiceData['description'],
        status=Invoice.StatusChoices.DRAFT, # default is DRAFT
        client=clientSaved,
        total=total,
    )

    invoice.save()

    # Relate items to the invoice

    invoice.items.set(itemIdsSaved)
    invoice.save()

    invoiceSerializador = InvoicesSerializer(invoice)

    return Response(data={
      'message': 'Invoice created successfully',
      'content': invoiceSerializador.data,
    }, status=status.HTTP_201_CREATED)