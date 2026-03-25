from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import logging

from .models import Course_table

logger = logging.getLogger('django')


@api_view(['GET'])
def add_course(request):
    department = request.GET.get('Department', '')
    coursetitle = request.GET.get('CourseTitle', '')
    instructor = request.GET.get('Instructor', '')

    if department and coursetitle and instructor:
        new_course = Course_table()
        new_course.Department = department
        new_course.CourseTitle = coursetitle
        new_course.Instructor = instructor
        new_course.save()

        logger.debug("************* add_course: " + coursetitle)

        return Response(
            {
                "Department": department,
                "CourseTitle": coursetitle,
                "Instructor": instructor,
                "result": "insert success"
            },
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"res": "parameter is missing"},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
def list_course(request):
    courses = Course_table.objects.all().values()
    return JsonResponse(list(courses), safe=False)