from django.db import models

class Client(models.Model):
  id = models.AutoField(primary_key=True, unique=True)

  name = models.TextField(null=False)
  email = models.EmailField(null=False)
  address = models.TextField(null=False)
  city = models.TextField(null=False)
  zipCode = models.TextField(null=False)
  country = models.TextField(null=False)

  def __str__(self):
    return self.name

class InvoiceItem(models.Model):
  id = models.AutoField(primary_key=True, unique=True)

  name = models.TextField(null=False)
  quantity = models.IntegerField(null=False)
  price = models.DecimalField(max_digits=10, decimal_places=2, null=False)

  def __str__(self):
    return "{} - {} x {}".format(self.name, self.price, self.quantity)

class Invoice(models.Model):
  class StatusChoices(models.TextChoices):
    DRAFT = 'draft','Draft'
    PENDING = 'pending','Pending' 
    PAID = 'paid','Paid'

  id = models.AutoField(primary_key=True, unique=True)
  date = models.DateField(null=False)
  paymentTerms = models.TextField(choices=[('15', '15 Days'), ('30', '30 Days'), ('60', '60 Days')])
  description = models.TextField(null=False)
  status = models.CharField(
    'status',
    max_length=7,
    choices=StatusChoices.choices,
    default=StatusChoices.DRAFT
  )
  total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
 
  client = models.ForeignKey(to=Client, on_delete=models.RESTRICT, db_column='client_id')
  items = models.ManyToManyField(to=InvoiceItem)

  def __str__(self):
    return self.description
