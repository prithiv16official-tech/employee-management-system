from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    search_fields = ['first_name', 'last_name', 'email', 'employee_id']
    ordering_fields = ['first_name', 'last_name', 'department', 'salary', 'hire_date']
    filterset_fields = ['department', 'status']

    def get_queryset(self):
        queryset = Employee.objects.all()
        search = self.request.query_params.get('search', None)
        department = self.request.query_params.get('department', None)
        status_filter = self.request.query_params.get('status', None)

        if search:
            from django.db.models import Q
            queryset = queryset.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(email__icontains=search) |
                Q(employee_id__icontains=search)
            )

        if department:
            queryset = queryset.filter(department=department)

        if status_filter:
            queryset = queryset.filter(status=status_filter)

        return queryset

    @action(detail=False, methods=['get'])
    def departments(self, request):
        departments = [choice[0] for choice in Employee.DEPARTMENT_CHOICES]
        return Response(departments)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        total = Employee.objects.count()
        active = Employee.objects.filter(status='active').count()
        inactive = Employee.objects.filter(status='inactive').count()
        departments = Employee.objects.values('department').distinct().count()
        return Response({
            'total_employees': total,
            'active_employees': active,
            'inactive_employees': inactive,
            'total_departments': departments,
        })
