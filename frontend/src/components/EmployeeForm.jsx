import React from 'react';

const DEPARTMENTS = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Engineering', 'Administration'];

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    department: 'IT',
    salary: '',
    hire_date: '',
    status: 'active',
    ...employee,
  });

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.employee_id) newErrors.employee_id = 'Employee ID is required';
    else if (!/^[A-Za-z0-9]+$/.test(formData.employee_id)) newErrors.employee_id = 'Alphanumeric only';

    if (!formData.first_name) newErrors.first_name = 'First name is required';
    else if (!/^[A-Za-z\s]+$/.test(formData.first_name)) newErrors.first_name = 'Letters only';

    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    else if (!/^[A-Za-z\s]+$/.test(formData.last_name)) newErrors.last_name = 'Letters only';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.phone) newErrors.phone = 'Phone is required';
    else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) newErrors.phone = '10-15 digits required';
    }

    if (!formData.position) newErrors.position = 'Position is required';

    if (!formData.salary) newErrors.salary = 'Salary is required';
    else if (parseFloat(formData.salary) < 0) newErrors.salary = 'Must be positive';

    if (!formData.hire_date) newErrors.hire_date = 'Hire date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        salary: parseFloat(formData.salary),
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                className={errors.employee_id ? 'error' : ''}
                disabled={!!employee}
              />
              {errors.employee_id && <span className="error-message">{errors.employee_id}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? 'error' : ''}
              />
              {errors.first_name && <span className="error-message">{errors.first_name}</span>}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'error' : ''}
              />
              {errors.last_name && <span className="error-message">{errors.last_name}</span>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={errors.position ? 'error' : ''}
              />
              {errors.position && <span className="error-message">{errors.position}</span>}
            </div>

            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange}>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                step="0.01"
                className={errors.salary ? 'error' : ''}
              />
              {errors.salary && <span className="error-message">{errors.salary}</span>}
            </div>

            <div className="form-group">
              <label>Hire Date</label>
              <input
                type="date"
                name="hire_date"
                value={formData.hire_date}
                onChange={handleChange}
                className={errors.hire_date ? 'error' : ''}
              />
              {errors.hire_date && <span className="error-message">{errors.hire_date}</span>}
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {employee ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
