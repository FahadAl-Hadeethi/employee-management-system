import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        alert('Failed to load employee details');
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h1>View Employee Details</h1>
      <p><strong>First Name:</strong> {employee.first_name}</p>
      <p><strong>Last Name:</strong> {employee.last_name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <button onClick={() => navigate('/employees')}>Back</button>
    </div>
  );
};

export default ViewEmployee;
