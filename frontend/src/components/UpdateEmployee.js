import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const UpdateEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
  });

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch employee details
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/api/v1/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/v1/emp/employees/${id}`, employee);
      alert('Employee updated successfully!');
      navigate('/employees');
    } catch (error) {
      alert('Failed to update employee. Please try again.');
      console.error(error.response?.data || error.message);
    }
  };

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
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    saveButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    cancelButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
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
      <h2 style={styles.title}>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={employee.first_name}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={employee.last_name}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleInputChange}
          style={styles.input}
        />
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.saveButton}>
            Save
          </button>
          <button
            type="button"
            style={styles.cancelButton}
            onClick={() => navigate('/employees')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
