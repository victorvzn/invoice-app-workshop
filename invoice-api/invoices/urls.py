from django.urls import path
from .views import InvoicesView

urlpatterns = [
    path('invoices', InvoicesView.as_view()),
]