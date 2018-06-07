from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Results(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    download = models.FloatField(null=False)
    upload = models.FloatField(null=False)
    expire_date = models.DateTimeField(null=True)
