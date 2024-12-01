import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/v1/user/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      alert('Login successful!');
      navigate('/employees'); // Navigate to the employee list page
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed!'); // Set error message
    }
  };  

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    form: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      width: '400px',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    errorMessage: {
      color: 'red',
      fontSize: '14px',
      marginBottom: '15px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.errorMessage}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#007bff', cursor: 'pointer' }}>Signup</span>
        </p>
      </form>
    </div>
  );  
};

export default Login;