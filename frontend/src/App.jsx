import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from './config/api';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import StatsCards from './components/StatsCards';
import './App.css';

const DEPARTMENTS = [
  'IT',
  'HR',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'Engineering',
  'Administration'
];

function App() {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search) {
        params.append('search', search);
      }

      if (departmentFilter) {
        params.append('department', departmentFilter);
      }

      if (statusFilter) {
        params.append('status', statusFilter);
      }

      const queryString = params.toString();

      const url = queryString
        ? `${api.employees.list()}?${queryString}`
        : api.employees.list();

      const response = await axios.get(url);

      setEmployees(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  }, [search, departmentFilter, statusFilter]);

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await axios.get(api.employees.stats());
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Load employees and statistics
  useEffect(() => {
    fetchEmployees();
    fetchStats();
  }, [fetchEmployees]);

  // Create employee
  const handleCreate = async (data) => {
    try {
      await axios.post(api.employees.list(), data);

      alert('Employee created successfully!');

      setShowForm(false);
      setEditingEmployee(null);

      await fetchEmployees();
      await fetchStats();
    } catch (error) {
      console.error('Create employee error:', error);

      const errorData = error.response?.data;

      if (errorData?.employee_id) {
        alert(`Employee ID: ${errorData.employee_id.join(', ')}`);
      } else if (errorData?.email) {
        alert(`Email: ${errorData.email.join(', ')}`);
      } else if (errorData?.phone) {
        alert(`Phone: ${errorData.phone.join(', ')}`);
      } else if (errorData?.salary) {
        alert(`Salary: ${errorData.salary.join(', ')}`);
      } else if (errorData?.hire_date) {
        alert(`Hire Date: ${errorData.hire_date.join(', ')}`);
      } else if (errorData?.detail) {
        alert(errorData.detail);
      } else {
        alert('Error creating employee. Please check your input.');
      }
    }
  };

  // Update employee
  const handleUpdate = async (data) => {
    try {
      await axios.put(
        api.employees.detail(editingEmployee.id),
        data
      );

      alert('Employee updated successfully!');

      setEditingEmployee(null);
      setShowForm(false);

      await fetchEmployees();
      await fetchStats();
    } catch (error) {
      console.error('Update employee error:', error);

      const errorData = error.response?.data;

      if (errorData?.employee_id) {
        alert(`Employee ID: ${errorData.employee_id.join(', ')}`);
      } else if (errorData?.email) {
        alert(`Email: ${errorData.email.join(', ')}`);
      } else if (errorData?.phone) {
        alert(`Phone: ${errorData.phone.join(', ')}`);
      } else if (errorData?.salary) {
        alert(`Salary: ${errorData.salary.join(', ')}`);
      } else if (errorData?.hire_date) {
        alert(`Hire Date: ${errorData.hire_date.join(', ')}`);
      } else if (errorData?.detail) {
        alert(errorData.detail);
      } else {
        alert('Error updating employee. Please check your input.');
      }
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(api.employees.detail(id));

      alert('Employee deleted successfully!');

      await fetchEmployees();
      await fetchStats();
    } catch (error) {
      console.error('Delete employee error:', error);

      const errorData = error.response?.data;

      if (errorData?.detail) {
        alert(errorData.detail);
      } else {
        alert('Error deleting employee. Please try again.');
      }
    }
  };

  // Edit employee
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Submit form
  const handleFormSubmit = (data) => {
    if (editingEmployee) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  // Cancel form
  const handleFormCancel = () => {
    setEditingEmployee(null);
    setShowForm(false);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearch('');
    setDepartmentFilter('');
    setStatusFilter('');
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="app-header">
        <h1>Employee Management System</h1>
        <p>Manage your organization's employee records</p>
      </header>

      <div className="container">

        {/* Statistics */}
        <StatsCards stats={stats} />

        {/* Toolbar */}
        <div className="toolbar">

          {/* Search */}
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Department Filter */}
          <select
            className="filter-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>

            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Clear Filters */}
          {(search || departmentFilter || statusFilter) && (
            <button
              className="btn btn-secondary"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}

          {/* Add Employee */}
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingEmployee(null);
              setShowForm(true);
            }}
          >
            + Add Employee
          </button>
        </div>

        {/* Employee Content */}

        {loading ? (

          /* Loading State */
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading employees...</p>
          </div>

        ) : employees.length === 0 ? (

          /* Empty State */
          <div className="empty-state">

            <div className="empty-icon">
              👥
            </div>

            <h3>No employees found</h3>

            <p>
              {search || departmentFilter || statusFilter
                ? 'No employees match your current search or filters.'
                : 'Add your first employee to get started.'}
            </p>

            {!search && !departmentFilter && !statusFilter && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingEmployee(null);
                  setShowForm(true);
                }}
              >
                + Add Employee
              </button>
            )}

            {(search || departmentFilter || statusFilter) && (
              <button
                className="btn btn-secondary"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          /* Employee Table */
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        )}

      </div>

      {/* Employee Form */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

    </div>
  );
}

export default App;