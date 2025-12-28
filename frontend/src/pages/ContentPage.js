// src/pages/ContentPage.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function ContentPage() {
  const { creatorId } = useParams();
  const [content, setContent] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/content/${creatorId}`)
      .then(res => setContent(res.data))
      .catch(err => {
        setError(err.response?.data?.message || 'Cannot fetch content');
      });
  }, [creatorId]);

  if (error) return <p style={{ color: '#dc2626', fontSize: '18px', textAlign: 'center', padding: '40px', fontWeight: '500' }}>{error}</p>;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
        padding: '60px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '40px',
            fontWeight: '800',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '50px',
            letterSpacing: '-0.8px',
          }}
        >
          Creator Content
        </h2>

        {content.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '20px',
              color: '#64748b',
              fontStyle: 'italic',
              marginTop: '60px',
            }}
          >
            No content available.
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '32px',
          }}
        >
          {content.map(c => (
            <div
              key={c._id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s ease',
                border: '1px solid rgba(226, 232, 240, 0.9)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{ padding: '32px' }}>
                <h3
                  style={{
                    margin: '0 0 18px 0',
                    fontSize: '26px',
                    fontWeight: '700',
                    color: '#0f172a',
                    lineHeight: '1.3',
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    margin: '0',
                    fontSize: '17px',
                    lineHeight: '1.75',
                    color: '#475569',
                  }}
                >
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}