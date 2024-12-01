import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        alert('Failed to load employee data');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/emp/employees/${id}`, employee);
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      alert('Failed to update employee');
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Employee</h1>
      <input
        type="text"
        name="first_name"
        value={employee.first_name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="last_name"
        value={employee.last_name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="position"
        value={employee.position}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="department"
        value={employee.department}
        onChange={handleInputChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate('/employees')}>Cancel</button>
    </form>
  );
};

export default UpdateEmployee;
