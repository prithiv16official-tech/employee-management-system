CREATE TABLE IF NOT EXISTS employees_employee (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hire_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employee_id ON employees_employee(employee_id);
CREATE INDEX idx_email ON employees_employee(email);
CREATE INDEX idx_department ON employees_employee(department);
CREATE INDEX idx_status ON employees_employee(status);
CREATE INDEX idx_first_name ON employees_employee(first_name);
CREATE INDEX idx_last_name ON employees_employee(last_name);
