import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const response = await api.get('/emp/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error(error.response.data.message);
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
      <button style={styles.addButton} onClick={() => alert('Add Employee clicked')}>
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
                  style={{ ...styles.button, ...styles.updateButton }}
                  onClick={() => alert('Update clicked')}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteButton }}
                  onClick={() => alert('Delete clicked')}
                >
                  Delete
                </button>
                <button
                  style={{ ...styles.button, ...styles.viewButton }}
                  onClick={() => alert('View clicked')}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;