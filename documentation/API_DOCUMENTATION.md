# API Documentation - Employee Management System

## Base URL
```
http://localhost:8000/api
```

## Authentication
Currently no authentication required. Future versions will include JWT authentication.

---

## Endpoints

### 1. List All Employees
**GET** `/api/employees/`

**Query Parameters:**
| Parameter  | Type   | Description                |
|------------|--------|----------------------------|
| search     | string | Search by name/email/ID    |
| department | string | Filter by department       |
| status     | string | Filter by status           |
| ordering   | string | Order by field             |
| page       | int    | Page number for pagination |

**Response:** `200 OK`
```json
{
  "count": 25,
  "next": "http://localhost:8000/api/employees/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "employee_id": "EMP001",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@company.com",
      "phone": "9876543210",
      "position": "Software Engineer",
      "department": "IT",
      "salary": "50000.00",
      "hire_date": "2024-01-15",
      "status": "active",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### 2. Create Employee
**POST** `/api/employees/`

**Request Body:**
```json
{
  "employee_id": "EMP001",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@company.com",
  "phone": "9876543210",
  "position": "Software Engineer",
  "department": "IT",
  "salary": 50000.00,
  "hire_date": "2024-01-15",
  "status": "active"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "employee_id": "EMP001",
  "first_name": "John",
  ...
}
```

**Error Response:** `400 Bad Request`
```json
{
  "email": ["This field must be unique."],
  "first_name": ["First name must contain only letters."]
}
```

---

### 3. Retrieve Single Employee
**GET** `/api/employees/{id}/`

**Response:** `200 OK`
```json
{
  "id": 1,
  "employee_id": "EMP001",
  "first_name": "John",
  "last_name": "Doe",
  ...
}
```

**Error Response:** `404 Not Found`

---

### 4. Update Employee (Full)
**PUT** `/api/employees/{id}/`

**Request Body:** All fields required
```json
{
  "employee_id": "EMP001",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@company.com",
  "phone": "9876543210",
  "position": "Senior Engineer",
  "department": "IT",
  "salary": 60000.00,
  "hire_date": "2024-01-15",
  "status": "active"
}
```

**Response:** `200 OK`

---

### 5. Partial Update Employee
**PATCH** `/api/employees/{id}/`

**Request Body:** Only changed fields
```json
{
  "salary": 65000.00,
  "position": "Lead Engineer"
}
```

**Response:** `200 OK`

---

### 6. Delete Employee
**DELETE** `/api/employees/{id}/`

**Response:** `204 No Content`

**Error Response:** `404 Not Found`

---

### 7. Get Departments
**GET** `/api/employees/departments/`

**Response:** `200 OK`
```json
["IT", "HR", "Finance", "Marketing", "Sales", "Operations", "Engineering", "Administration"]
```

---

### 8. Get Statistics
**GET** `/api/employees/stats/`

**Response:** `200 OK`
```json
{
  "total_employees": 50,
  "active_employees": 45,
  "inactive_employees": 5,
  "total_departments": 8
}
```

---

## Validation Rules

| Field        | Rule                                           |
|--------------|------------------------------------------------|
| employee_id  | Required, alphanumeric, max 20 chars, unique   |
| first_name   | Required, alphabetic, max 100 chars            |
| last_name    | Required, alphabetic, max 100 chars            |
| email        | Required, valid email, unique                  |
| phone        | Required, 10-15 digits                         |
| position     | Required, max 100 chars                        |
| department   | Required, one of predefined values             |
| salary       | Required, positive number, 2 decimal places    |
| hire_date    | Required, valid date, not in future            |
| status       | Required, 'active' or 'inactive'               |
