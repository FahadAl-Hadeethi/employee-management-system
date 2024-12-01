import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/emp/employees', employee);
      alert('Employee added successfully!');
      navigate('/employees');
    } catch (error) {
      alert('Failed to add employee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Employee</h1>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={employee.first_name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={employee.last_name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={employee.position}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleInputChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate('/employees')}>Cancel</button>
    </form>
  );
};

export default AddEmployee;
