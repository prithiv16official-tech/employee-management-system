# Database Design Document

## Overview
The Employee Management System uses a single-table design for simplicity and performance.

## Database Choice
- **Default:** SQLite (for development and testing)
- **Production:** PostgreSQL/MySQL supported via environment variables

## Schema Design

### employees_employee Table

| Column       | Type           | Constraints                        | Description              |
|--------------|----------------|------------------------------------|--------------------------|
| id           | INTEGER        | PRIMARY KEY, AUTO_INCREMENT        | Unique record identifier |
| employee_id  | VARCHAR(20)    | UNIQUE, NOT NULL                   | Employee code            |
| first_name   | VARCHAR(100)   | NOT NULL                           | Employee first name      |
| last_name    | VARCHAR(100)   | NOT NULL                           | Employee last name       |
| email        | VARCHAR(100)   | UNIQUE, NOT NULL                   | Email address            |
| phone        | VARCHAR(15)    | NOT NULL                           | Contact number           |
| position     | VARCHAR(100)   | NOT NULL                           | Job position             |
| department   | VARCHAR(100)   | NOT NULL                           | Department name          |
| salary       | DECIMAL(10,2)  | NOT NULL                           | Salary amount            |
| hire_date    | DATE           | NOT NULL                           | Joining date             |
| status       | VARCHAR(20)    | DEFAULT 'active'                   | Employment status        |
| created_at   | TIMESTAMP      | AUTO (now)                         | Record creation time     |
| updated_at   | TIMESTAMP      | AUTO (now)                         | Last modification time   |

## Department Values
- IT
- HR
- Finance
- Marketing
- Sales
- Operations
- Engineering
- Administration

## Status Values
- active
- inactive

## Indexes

| Index Name      | Column       | Type    | Purpose                      |
|-----------------|--------------|---------|------------------------------|
| Primary Key     | id           | B-tree  | Record identification        |
| Unique          | employee_id  | B-tree  | Employee code lookups        |
| Unique          | email        | B-tree  | Email lookups                |
| Non-unique      | department   | B-tree  | Department filtering         |
| Non-unique      | status       | B-tree  | Status filtering             |
| Non-unique      | first_name   | B-tree  | Name searching               |
| Non-unique      | last_name    | B-tree  | Name searching               |

## Design Decisions

1. **Single Table:** All employee data in one table for simplicity
2. **String Department:** Departments stored as strings with choices validation
3. **Auto Timestamps:** created_at and updated_at auto-managed by Django ORM
4. **Soft Status:** Active/inactive status instead of hard deletes
5. **Unique Constraints:** employee_id and email enforced at database level

## Migration Strategy
Django migrations handle schema changes:
```bash
python manage.py makemigrations
python manage.py migrate
```
