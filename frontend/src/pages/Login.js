import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const res = await api.post('/auth/login', { email, password });
    login(res.data.token);
    navigate('/');
  };

  return (
    <form
      onSubmit={submit}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '40px 50px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h2
          style={{
            margin: '0 0 30px 0',
            fontSize: '32px',
            fontWeight: '700',
            color: '#333',
            letterSpacing: '-0.5px',
          }}
        >
          Welcome Back
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 20px',
            marginBottom: '20px',
            border: '2px solid #e1e5e9',
            borderRadius: '12px',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f8f9fa',
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 20px',
            marginBottom: '30px',
            border: '2px solid #e1e5e9',
            borderRadius: '12px',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f8f9fa',
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />

        <button
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 25px rgba(102, 126, 234, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: '24px',
            color: '#666',
            fontSize: '14px',
          }}
        >
          {/* Don't have an account? <span style={{ color: '#667eea', fontWeight: '600', cursor: 'pointer' }}>Sign up</span> */}
        </p>
      </div>
    </form>
  );
}