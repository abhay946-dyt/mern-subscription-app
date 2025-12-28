import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function CreatorDashboard() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch creator's content
  const loadContent = async () => {
    const res = await api.get('/content/me');
    setContents(res.data);
  };

  useEffect(() => {
    loadContent();
  }, []);

  // CREATE
  const create = async () => {
    if (!title) return;
    await api.post('/content', { title });
    setTitle('');
    loadContent();
  };

  // UPDATE
  const update = async (id) => {
    if (!title) return;
    await api.put(`/content/${id}`, { title });
    setTitle('');
    setEditingId(null);
    loadContent();
  };

  // DELETE
  const remove = async (id) => {
    if (!window.confirm('Delete this content?')) return;
    await api.delete(`/content/${id}`);
    setContents(contents.filter(c => c._id !== id));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f1f5f9, #e2e8f0)',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '48px',
            letterSpacing: '-0.5px',
          }}
        >
          Creator Dashboard
        </h2>

        {/* CREATE / EDIT FORM */}
        <div
          style={{
            background: '#ffffff',
            padding: '32px',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
            marginBottom: '48px',
            border: '1px solid #e2e8f0',
          }}
        >
          <input
            placeholder="Content title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: '18px',
              borderRadius: '12px',
              border: '2px solid #cbd5e1',
              outline: 'none',
              transition: 'all 0.3s ease',
              marginBottom: '20px',
              backgroundColor: '#f8fafc',
            }}
            onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
            onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
          />

          {editingId ? (
            <button
              onClick={() => update(editingId)}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(139, 92, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.3)';
              }}
            >
              Update Content
            </button>
          ) : (
            <button
              onClick={create}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
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
              Create New Content
            </button>
          )}
        </div>

        <hr
          style={{
            border: 'none',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #cbd5e1, transparent)',
            margin: '60px 0',
          }}
        />

        {/* CONTENT LIST */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {contents.map(c => (
            <li
              key={c._id}
              style={{
                background: '#ffffff',
                padding: '24px 32px',
                marginBottom: '20px',
                borderRadius: '16px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1e293b',
                  flex: '1',
                }}
              >
                {c.title}
              </span>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    setEditingId(c._id);
                    setTitle(c.title);
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
                >
                  Edit
                </button>

                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => remove(c._id)}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {contents.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#64748b',
              marginTop: '60px',
            }}
          >
            No content yet. Create your first one above!
          </p>
        )}
      </div>
    </div>
  );
}