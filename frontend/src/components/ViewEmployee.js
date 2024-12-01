import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ViewEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null); // Employee data state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/api/v1/emp/employees/${id}`); // Corrected endpoint
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to load employee details');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    details: {
      fontSize: '16px',
      margin: '10px 0',
      color: '#555',
    },
    strong: {
      color: '#333',
    },
    button: {
      display: 'block',
      margin: '20px auto 0',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    loading: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#333',
    },
    error: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#dc3545',
    },
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employee Details</h1>
      <div>
        <p style={styles.details}>
          <strong style={styles.strong}>First Name:</strong> {employee.first_name}
        </p>
        <p style={styles.details}>
          <strong style={styles.strong}>Last Name:</strong> {employee.last_name}
        </p>
        <p style={styles.details}>
          <strong style={styles.strong}>Email:</strong> {employee.email}
        </p>
        <p style={styles.details}>
          <strong style={styles.strong}>Position:</strong> {employee.position || 'N/A'}
        </p>
        <p style={styles.details}>
          <strong style={styles.strong}>Department:</strong> {employee.department || 'N/A'}
        </p>
      </div>
      <button
        style={styles.button}
        onClick={() => navigate('/employees')}
      >
        Back
      </button>
    </div>
  );
};

export default ViewEmployee;