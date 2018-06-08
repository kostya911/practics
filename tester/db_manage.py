from django.http import JsonResponse
from . import models


def save(request):
    upload = float(request.POST["upload"])
    download = float(request.POST["download"])

    user = None
    if request.user.is_authenticated:
        user = request.user

    var = models.Results(user=user, upload=upload, download=download, expire_date=None)
    var.save()
    return JsonResponse("Success", safe=False)


def get_data(request):
    upload = float(request.POST['upload'])
    download = float(request.POST['download'])
    expire_date = '-'
    if request.POST['expire_date'] is not None:
        expire_date = request.POST['expire']



