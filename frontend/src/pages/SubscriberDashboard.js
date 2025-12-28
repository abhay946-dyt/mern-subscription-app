import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function SubscriberDashboard() {
  const [creators, setCreators] = useState([]);
  const [subscriptions, setSubscriptions] = useState({}); // { creatorId: active/grace/expired }

  useEffect(() => {
    // Fetch all creators
    api.get('/users?role=creator').then(res => setCreators(res.data));

    // Fetch subscriber subscriptions
    api.get('/subscriptions/status').then(res => {
      // Example response: { creatorId1: 'active', creatorId2: 'expired' }
      setSubscriptions(res.data);
    });
  }, []);

  const subscribe = async (creatorId) => {
    await api.post('/subscriptions', { creatorId, type: 'monthly' });
    alert('Subscribed successfully');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe)',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#0c4a6e',
            textAlign: 'center',
            marginBottom: '50px',
            letterSpacing: '-0.5px',
          }}
        >
          Subscriber Dashboard
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {creators.map(c => {
            const status = subscriptions[c._id];
            return (
              <div
                key={c._id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #cbd5e1',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Accent top border */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, #0ea5e9, #3b82f6)',
                    borderRadius: '20px 20px 0 0',
                  }}
                />

                <h3
                  style={{
                    margin: '0 0 20px 0',
                    fontSize: '26px',
                    fontWeight: '700',
                    color: '#1e293b',
                  }}
                >
                  {c.name}
                </h3>

                {status === 'active' || status === 'grace' ? (
                  <button
                    onClick={() => window.location.href = `/content/${c._id}`}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                    }}
                  >
                    View Content
                  </button>
                ) : (
                  <button
                    onClick={() => subscribe(c._id)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
                    }}
                  >
                    Subscribe (Monthly)
                  </button>
                )}

                {status === 'grace' && (
                  <p
                    style={{
                      margin: '20px 0 0 0',
                      padding: '12px 16px',
                      backgroundColor: '#fffbeb',
                      color: '#92400e',
                      fontWeight: '600',
                      borderRadius: '10px',
                      textAlign: 'center',
                      border: '1px solid #fcd34d',
                    }}
                  >
                    Subscription in grace period
                  </p>
                )}

                {status === 'expired' && (
                  <p
                    style={{
                      margin: '20px 0 0 0',
                      padding: '12px 16px',
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      fontWeight: '600',
                      borderRadius: '10px',
                      textAlign: 'center',
                      border: '1px solid #fca5a5',
                    }}
                  >
                    Subscription expired
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {creators.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '20px',
              color: '#64748b',
              marginTop: '60px',
            }}
          >
            No creators available yet.
          </p>
        )}
      </div>
    </div>
  );
}