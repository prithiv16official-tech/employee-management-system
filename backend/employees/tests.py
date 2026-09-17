import datetime

from django.test import TestCase
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeModelTest(TestCase):
    def setUp(self):
        self.employee = Employee.objects.create(
            employee_id='EMP001',
            first_name='John',
            last_name='Doe',
            email='john.doe@test.com',
            phone='9876543210',
            position='Software Engineer',
            department='IT',
            salary=50000.00,
            hire_date=datetime.date(2024, 1, 15),
            status='active',
        )

    def test_employee_creation(self):
        self.assertEqual(self.employee.employee_id, 'EMP001')
        self.assertEqual(self.employee.first_name, 'John')
        self.assertEqual(self.employee.status, 'active')

    def test_employee_str(self):
        self.assertEqual(str(self.employee), 'EMP001 - John Doe')

    def test_employee_id_unique(self):
        with self.assertRaises(Exception):
            Employee.objects.create(
                employee_id='EMP001',
                first_name='Jane',
                last_name='Smith',
                email='jane.smith@test.com',
                phone='9876543211',
                position='Designer',
                department='Marketing',
                salary=45000.00,
                hire_date=datetime.date(2024, 2, 1),
                status='active',
            )

    def test_email_unique(self):
        with self.assertRaises(Exception):
            Employee.objects.create(
                employee_id='EMP002',
                first_name='Jane',
                last_name='Smith',
                email='john.doe@test.com',
                phone='9876543211',
                position='Designer',
                department='Marketing',
                salary=45000.00,
                hire_date=datetime.date(2024, 2, 1),
                status='active',
            )


class EmployeeSerializerTest(TestCase):
    def setUp(self):
        self.valid_data = {
            'employee_id': 'EMP002',
            'first_name': 'Jane',
            'last_name': 'Smith',
            'email': 'jane.smith@test.com',
            'phone': '9876543211',
            'position': 'Designer',
            'department': 'Marketing',
            'salary': 45000.00,
            'hire_date': '2024-02-01',
            'status': 'active',
        }

    def test_valid_serializer(self):
        serializer = EmployeeSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_phone(self):
        data = self.valid_data.copy()
        data['phone'] = '123'
        serializer = EmployeeSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('phone', serializer.errors)

    def test_invalid_salary(self):
        data = self.valid_data.copy()
        data['salary'] = -1000
        serializer = EmployeeSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('salary', serializer.errors)

    def test_future_hire_date(self):
        data = self.valid_data.copy()
        data['hire_date'] = '2030-01-01'
        serializer = EmployeeSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('hire_date', serializer.errors)


class EmployeeAPITest(APITestCase):
    def setUp(self):
        self.employee_data = {
            'employee_id': 'EMP003',
            'first_name': 'Alice',
            'last_name': 'Johnson',
            'email': 'alice.johnson@test.com',
            'phone': '9876543212',
            'position': 'Manager',
            'department': 'HR',
            'salary': 60000.00,
            'hire_date': '2024-03-01',
            'status': 'active',
        }
        self.employee = Employee.objects.create(**self.employee_data)

    def test_create_employee(self):
        data = {
            'employee_id': 'EMP004',
            'first_name': 'Bob',
            'last_name': 'Williams',
            'email': 'bob.williams@test.com',
            'phone': '9876543213',
            'position': 'Analyst',
            'department': 'Finance',
            'salary': 55000.00,
            'hire_date': '2024-04-01',
            'status': 'active',
        }
        response = self.client.post('/api/employees/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(), 2)

    def test_list_employees(self):
        response = self.client.get('/api/employees/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_employee(self):
        response = self.client.get(f'/api/employees/{self.employee.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'Alice')

    def test_update_employee(self):
        data = {'first_name': 'Alicia'}
        response = self.client.patch(f'/api/employees/{self.employee.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.employee.refresh_from_db()
        self.assertEqual(self.employee.first_name, 'Alicia')

    def test_delete_employee(self):
        response = self.client.delete(f'/api/employees/{self.employee.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Employee.objects.count(), 0)

    def test_search_employees(self):
        response = self.client.get('/api/employees/?search=Alice')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_by_department(self):
        response = self.client.get('/api/employees/?department=HR')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_invalid_employee(self):
        data = {'employee_id': 'EMP005'}
        response = self.client.post('/api/employees/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_nonexistent(self):
        response = self.client.get('/api/employees/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
