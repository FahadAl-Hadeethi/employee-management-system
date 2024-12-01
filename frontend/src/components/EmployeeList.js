import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await api.get('/api/v1/emp/employees'); // Ensure this matches the backend endpoint
      setEmployees(response.data);
    } catch (error) {
      console.error(error.response?.data?.message || 'Failed to fetch employees');
    }
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/api/v1/emp/employees/${id}`);
        alert('Employee deleted successfully');
        fetchEmployees(); // Refresh the list after deletion
      } catch (error) {
        console.error(error.response?.data?.message || 'Failed to delete employee');
        alert('Failed to delete employee');
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const styles = {
    container: {
      maxWidth: '80%',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    td: {
      padding: '10px',
      border: '1px solid #ddd',
    },
    button: {
      margin: '0 5px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    addButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    updateButton: {
      backgroundColor: '#ffc107',
      color: '#fff',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
    viewButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Employees List</h2>
      <button style={styles.addButton} onClick={() => navigate('/add-employee')}>
        Add Employee
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td style={styles.td}>{employee.first_name}</td>
              <td style={styles.td}>{employee.last_name}</td>
              <td style={styles.td}>{employee.email}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.button, ...styles.viewButton }}
                  onClick={() => navigate(`/view-employee/${employee._id}`)}
                >
                  View
                </button>
                <button
                  style={{ ...styles.button, ...styles.updateButton }}
                  onClick={() => navigate(`/update-employee/${employee._id}`)}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => deleteEmployee(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td style={styles.td} colSpan="4">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;