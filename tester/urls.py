from django.urls import path
from . import views, db_manage

urlpatterns = [
    path('test/', views.test, name='test'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('history/', views.history, name='history'),
    path('save/', db_manage.save, name='dbmanage'),
    path('get/', db_manage.get_data, name='getdata')
]
