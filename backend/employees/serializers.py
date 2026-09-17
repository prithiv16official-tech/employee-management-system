import re

from rest_framework import serializers

from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'id', 'employee_id', 'first_name', 'last_name', 'email',
            'phone', 'position', 'department', 'salary', 'hire_date',
            'status', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_employee_id(self, value):
        if not re.match(r'^[A-Za-z0-9]+$', value):
            raise serializers.ValidationError('Employee ID must be alphanumeric.')
        return value

    def validate_first_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError('First name must contain only letters.')
        return value

    def validate_last_name(self, value):
        if not value.isalpha():
            raise serializers.ValidationError('Last name must contain only letters.')
        return value

    def validate_phone(self, value):
        digits = re.sub(r'\D', '', value)
        if len(digits) < 10 or len(digits) > 15:
            raise serializers.ValidationError('Phone number must contain 10-15 digits.')
        return value

    def validate_salary(self, value):
        if value < 0:
            raise serializers.ValidationError('Salary must be a positive number.')
        return value

    def validate_hire_date(self, value):
        from datetime import date
        if value > date.today():
            raise serializers.ValidationError('Hire date cannot be in the future.')
        return value
