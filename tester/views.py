from django.shortcuts import render


def test(request):
    return render(request, 'tester/test.html')
def history(request):
    return render(request, 'tester/history.html')
def signin(request):
    return render(request, 'tester/signin.html')
def signup(request):
    return render(request, 'tester/signup.html')

