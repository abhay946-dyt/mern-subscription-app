import { useState } from 'react';
import api from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async e => {
    e.preventDefault();
    await api.post('/auth/register', form);
    alert('Registered successfully');
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
        padding: '20px',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          padding: '48px 60px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '480px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        }}
      >
        <h2
          style={{
            margin: '0 0 40px 0',
            fontSize: '36px',
            fontWeight: '700',
            color: '#2d3748',
            letterSpacing: '-0.8px',
          }}
        >
          Create Account
        </h2>

        <input
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{
            width: '100%',
            padding: '18px 22px',
            marginBottom: '24px',
            border: '2px solid #e2e8f0',
            borderRadius: '14px',
            fontSize: '17px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f8fafc',
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />

        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{
            width: '100%',
            padding: '18px 22px',
            marginBottom: '24px',
            border: '2px solid #e2e8f0',
            borderRadius: '14px',
            fontSize: '17px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f8fafc',
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          style={{
            width: '100%',
            padding: '18px 22px',
            marginBottom: '24px',
            border: '2px solid #e2e8f0',
            borderRadius: '14px',
            fontSize: '17px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f8fafc',
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />

        <select
          onChange={e => setForm({ ...form, role: e.target.value })}
          style={{
            width: '100%',
            padding: '18px 22px',
            marginBottom: '32px',
            border: '2px solid #e2e8f0',
            borderRadius: '14px',
            fontSize: '17px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: '#f8fafc',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 16px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '16px',
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        >
          <option value="subscriber">Subscriber</option>
          <option value="creator">Creator</option>
        </select>

        <button
          style={{
            width: '100%',
            padding: '18px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '19px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '14px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.35)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.45)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.35)';
          }}
        >
          Register
        </button>

        <p
          style={{
            marginTop: '32px',
            color: '#64748b',
            fontSize: '15px',
          }}
        >
          {/* Already have an account? <span style={{ color: '#667eea', fontWeight: '600', cursor: 'pointer' }}>Login</span> */}
        </p>
      </div>
    </form>
  );
}