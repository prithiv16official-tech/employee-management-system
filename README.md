# Employee Management System

A full-stack web application for managing employee records through a simple and user-friendly dashboard.

The system supports employee CRUD operations, search and filtering, validation, statistics, loading states, and empty states. The frontend is built with React.js and communicates with a Django REST Framework backend using Axios. SQLite is used for local development.

## Project Objective

- Digitize employee record management.
- Maintain employee information in a centralized database.
- Provide complete Create, Read, Update, and Delete (CRUD) operations.
- Support employee search and filtering.
- Validate employee information before storing it.
- Provide a simple and responsive user interface.
- Provide REST APIs for frontend-backend communication.

## Problem Statement

Traditional employee record management can rely on spreadsheets, paper records, or disconnected systems. These approaches can make searching, updating, validating, and maintaining employee information time-consuming and error-prone.

This project provides a centralized web-based solution where employee records can be added, viewed, updated, deleted, searched, and filtered.

## Key Features

- Add, view, edit, and delete employees.
- Search by employee ID, name, or email.
- Filter by department and Active/Inactive status.
- Dashboard statistics.
- Employee ID and email uniqueness validation.
- Phone, salary, email, and hire-date validation.
- Loading and empty states.
- REST API based architecture.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Language | JavaScript / JSX |
| Backend | Django |
| API | Django REST Framework |
| Database | SQLite |
| HTTP Client | Axios |
| Styling | CSS |
| Development | Visual Studio Code |
| Testing | Browser / Postman |
| Version Control | Git / GitHub |

## System Architecture

```text
User
  |
  v
React Frontend
  |
  | HTTP / REST API
  v
Django REST Framework
  |
  | Django ORM
  v
SQLite Database
```

## Project Structure

```text
employee-management-system/
├── backend/
│   ├── manage.py
│   ├── employee_management/
│   └── employees/
├── frontend/
├── database/
├── documentation/
├── tests/
└── README.md
```

## Database

Main table: `employees_employee`

Fields:

- `id`
- `employee_id`
- `first_name`
- `last_name`
- `email`
- `phone`
- `position`
- `department`
- `salary`
- `hire_date`
- `status`
- `created_at`
- `updated_at`

## API

Base URL:

```text
http://localhost:8000/api
```

Main endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/employees/` | List employees |
| GET | `/api/employees/{id}/` | Get one employee |
| POST | `/api/employees/` | Create employee |
| PUT/PATCH | `/api/employees/{id}/` | Update employee |
| DELETE | `/api/employees/{id}/` | Delete employee |
| GET | `/api/employees/stats/` | Dashboard statistics |

See `documentation/api-documentation.md` for request examples.

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

Frontend:

```text
http://localhost:3000/
```

Run both servers at the same time.

## Documentation

- [Project Objective](documentation/project-objective.md)
- [Problem Statement](documentation/problem-statement.md)
- [Features](documentation/features.md)
- [Technology Stack](documentation/technology-stack.md)
- [System Architecture](documentation/system-architecture.md)
- [Database Schema](documentation/database-schema.md)
- [API Documentation](documentation/api-documentation.md)
- [Installation Steps](documentation/installation-steps.md)
- [Screenshots](documentation/screenshots.md)
- [Testing Results](documentation/testing-results.md)
- [Future Enhancements](documentation/future-enhancements.md)

## Testing Status

Core CRUD functionality and uniqueness validation have been tested. Additional validation, filtering, backend-failure handling, and responsive UI tests should be completed before final submission.

## Future Enhancements

- Authentication and authorization.
- Role-based access control.
- PostgreSQL/MySQL production database support.
- Advanced dashboard charts.
- CSV, Excel, and PDF export.
- Notifications.
- Advanced search and sorting.
- Cloud deployment and CI/CD.

## Author

**Prithiv S**

## License

This project is intended for academic and educational use.
