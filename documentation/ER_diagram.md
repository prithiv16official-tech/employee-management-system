# ER Diagram - Employee Management System

## Entity Relationship Diagram

```
+------------------+
|    employees     |
|------------------|
| PK id            |  INTEGER (AUTO_INCREMENT)
|    employee_id   |  VARCHAR(20) UNIQUE NOT NULL
|    first_name    |  VARCHAR(100) NOT NULL
|    last_name     |  VARCHAR(100) NOT NULL
|    email         |  VARCHAR(100) UNIQUE NOT NULL
|    phone         |  VARCHAR(15) NOT NULL
|    position      |  VARCHAR(100) NOT NULL
|    department    |  VARCHAR(100) NOT NULL
|    salary        |  DECIMAL(10,2) NOT NULL
|    hire_date     |  DATE NOT NULL
|    status        |  VARCHAR(20) DEFAULT 'active'
|    created_at    |  TIMESTAMP AUTO
|    updated_at    |  TIMESTAMP AUTO
+------------------+

## Table Relationships

- Single table design (no foreign keys)
- All employee data stored in one table
- Department is a string field with predefined choices

## Indexes

| Index Name          | Column        | Purpose                    |
|---------------------|---------------|----------------------------|
| idx_employee_id     | employee_id   | Fast lookup by employee ID |
| idx_email           | email         | Fast lookup by email       |
| idx_department      | department    | Filter by department       |
| idx_status          | status        | Filter by status           |
| idx_first_name      | first_name    | Search by first name       |
| idx_last_name       | last_name     | Search by last name        |
