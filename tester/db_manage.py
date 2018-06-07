from . import models

def save(request):
    upload = request.POST["upload"]
    download = request.POST["download"]

    user = request.user
    if user == "AnonymousUser":
        user = None

    var = models.Results(user=user,upload=upload, download=download, exipire_date=None)
    var.save()

def get_data(request):
    upload = float(request.POST['upload'])
    download = float(request.POST['download'])
    expire_date = '-'
    if request.POST['expire_date'] is not None:
        expire_date = request.POST['expire']



