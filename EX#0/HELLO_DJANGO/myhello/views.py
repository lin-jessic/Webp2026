from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def myIndex(request):
    my_name = request.GET.get('name', "CGU")
    return HttpResponse("Hello " + my_name)