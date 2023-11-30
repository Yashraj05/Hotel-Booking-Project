import React, { useState } from 'react';
import axios from 'axios';
import { loginViaEmail } from '../api/auth/request';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await loginViaEmail(email, password);
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const googleAuth = () => {
		window.open(
			`http://localhost:3001/auth/google`,
			"_self"
		);
	};

  const handleFacebookLogin = async () => {
    window.open(
			`http://localhost:3001/auth/facebook`,
			"_self"
		);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '10px',
          }}
        >
          Login
        </button>
      </form>

      <button
        style={{
          backgroundColor: '#DB4437',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
          marginBottom: '10px',
        }}
        onClick={googleAuth}
      >
        Login with Google
      </button>

      <button
        style={{
          backgroundColor: '#3B5998',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
        onClick={handleFacebookLogin}
      >
        Login with Facebook
      </button>
    </div>
  );
};

export default LoginForm;
