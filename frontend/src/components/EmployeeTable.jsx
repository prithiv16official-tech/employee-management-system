import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <h3>No employees found</h3>
          <p>Add a new employee or adjust your search filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Hire Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employee_id}</td>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>${parseFloat(emp.salary).toLocaleString()}</td>
              <td>{emp.hire_date}</td>
              <td>
                <span className={`status-badge status-${emp.status}`}>
                  {emp.status}
                </span>
              </td>
              <td>
                <div className="actions">
                  <button className="btn btn-primary btn-sm" onClick={() => onEdit(emp)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(emp.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
