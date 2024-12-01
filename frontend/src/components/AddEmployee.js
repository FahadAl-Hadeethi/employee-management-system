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

    // Validate required fields
    for (const [key, value] of Object.entries(employee)) {
      if (!value.trim()) {
        alert(`Please fill out the ${key.replace('_', ' ')} field.`);
        return;
      }
    }

    try {
      await api.post('/api/v1/emp/employees', employee);
      alert('Employee added successfully!');
      navigate('/employees');
    } catch (error) {
      if (error.response?.data?.message.includes('duplicate key error')) {
        alert('This email already exists. Please use a different email.');
      } else {
        alert('Failed to add employee. Please try again.');
      }
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', width: '400px' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Employee</h2>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={employee.first_name}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={employee.last_name}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button
            type="submit"
            style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '48%' }}
          >
            Save
          </button>
          <button
            type="button"
            style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '48%' }}
            onClick={() => navigate('/employees')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;