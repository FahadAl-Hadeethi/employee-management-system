import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // Complete employee list
  const [filteredEmployees, setFilteredEmployees] = useState([]); // Filtered list
  const [searchQuery, setSearchQuery] = useState(''); // Search input value
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/api/v1/emp/employees');
      setEmployees(response.data);
      setFilteredEmployees(response.data); // Initially show all employees
    } catch (error) {
      console.error(error.response?.data?.message || 'Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = employees.filter((employee) => {
      return (
        employee.department?.toLowerCase().includes(query) ||
        employee.position?.toLowerCase().includes(query)
      );
    });

    setFilteredEmployees(filtered);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await api.delete('/api/v1/emp/employees', { params: { eid: id } });
        alert(response.data.message || 'Employee deleted successfully');
        fetchEmployees(); // Refresh the employee list after deletion
      } catch (error) {
        console.error('Delete Error:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Failed to delete employee. Please try again.');
      }
    }
  };

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
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    searchBar: {
      marginBottom: '20px',
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
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
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Department or Position"
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchBar}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Position</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td style={styles.td}>{employee.first_name}</td>
              <td style={styles.td}>{employee.last_name}</td>
              <td style={styles.td}>{employee.email}</td>
              <td style={styles.td}>{employee.position || 'N/A'}</td>
              <td style={styles.td}>{employee.department || 'N/A'}</td>
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
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;