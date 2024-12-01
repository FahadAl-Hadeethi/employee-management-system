import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/v1/user/signup', { username, email, password }); // Corrected endpoint
      alert('Signup successful! Please login.');
      navigate('/'); // Redirect to the Login page
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed!'); // Set error message
    }
  };  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <form onSubmit={handleSignup} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', width: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
          required
        />
        {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;