import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [content, setContent] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state for edit mode
  const [editingUser, setEditingUser] = useState(null);
  const [editingContent, setEditingContent] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchData = async () => {
    const [usersRes, contentRes, subsRes] = await Promise.all([
      api.get('/admin/users'),
      api.get('/admin/content'),
      api.get('/admin/subscriptions')
    ]);

    setUsers(usersRes.data);
    setContent(contentRes.data);
    setSubscriptions(subsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user and all related data?')) return;
    await api.delete(`/admin/user/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  const deleteContent = async (id) => {
    if (!window.confirm('Delete this content?')) return;
    await api.delete(`/admin/content/${id}`);
    setContent(content.filter(c => c._id !== id));
  };

  // Edit handlers
  const startEditUser = (user) => {
    setEditingUser(user._id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const cancelEditUser = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const saveEditUser = async (id) => {
    await api.put(`/admin/user/${id}`, editForm);
    setUsers(users.map(u => u._id === id ? { ...u, ...editForm } : u));
    cancelEditUser();
  };

  const startEditContent = (item) => {
    setEditingContent(item._id);
    setEditForm({ title: item.title });
  };

  const cancelEditContent = () => {
    setEditingContent(null);
    setEditForm({});
  };

  const saveEditContent = async (id) => {
    await api.put(`/admin/content/${id}`, editForm);
    setContent(content.map(c => c._id === id ? { ...c, ...editForm } : c));
    cancelEditContent();
  };

  if (loading) return <p style={{ textAlign: 'center', fontSize: '18px', padding: '40px' }}>Loading admin data...</p>;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          Admin Dashboard
        </h2>

        {/* USERS SECTION */}
        <section style={{ marginBottom: '60px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#334155',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '3px solid #6366f1',
              display: 'inline-block',
            }}
          >
            Users ({users.length})
          </h3>

          <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ background: '#6366f1' }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr
                    key={u._id}
                    style={{ transition: 'background 0.2s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={tdStyle}>
                      {editingUser === u._id ? (
                        <input
                          style={inputStyle}
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      ) : (
                        u.name || '—'
                      )}
                    </td>
                    <td style={tdStyle}>
                      {editingUser === u._id ? (
                        <input
                          style={inputStyle}
                          value={editForm.email || ''}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        />
                      ) : (
                        u.email
                      )}
                    </td>
                    <td style={tdStyle}>
                      {editingUser === u._id ? (
                        <select
                          style={inputStyle}
                          value={editForm.role || ''}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        >
                          <option value="user">user</option>
                          <option value="creator">creator</option>
                          <option value="admin">admin</option>
                        </select>
                      ) : (
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '999px',
                            fontSize: '14px',
                            fontWeight: '600',
                            background: u.role === 'admin' ? '#fef3c7' : u.role === 'creator' ? '#dbeafe' : '#e0e7ff',
                            color: u.role === 'admin' ? '#92400e' : u.role === 'creator' ? '#1e40af' : '#4338ca',
                          }}
                        >
                          {u.role}
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {editingUser === u._id ? (
                        <>
                          <button style={saveBtnStyle} onClick={() => saveEditUser(u._id)}>Save</button>
                          <button style={cancelBtnStyle} onClick={cancelEditUser}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button style={editBtnStyle} onClick={() => startEditUser(u)}>Edit</button>
                          <button
                            style={deleteBtnStyle}
                            onClick={() => deleteUser(u._id)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section style={{ marginBottom: '60px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#334155',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '3px solid #10b981',
              display: 'inline-block',
            }}
          >
            All Content ({content.length})
          </h3>

          <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ background: '#10b981' }}>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Creator</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.map(c => (
                  <tr
                    key={c._id}
                    style={{ transition: 'background 0.2s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={tdStyle}>
                      {editingContent === c._id ? (
                        <input
                          style={inputStyle}
                          value={editForm.title || ''}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                      ) : (
                        c.title
                      )}
                    </td>
                    <td style={tdStyle}>{c.creator?.name || 'N/A'}</td>
                    <td style={tdStyle}>
                      {editingContent === c._id ? (
                        <>
                          <button style={saveBtnStyle} onClick={() => saveEditContent(c._id)}>Save</button>
                          <button style={cancelBtnStyle} onClick={cancelEditContent}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button style={editBtnStyle} onClick={() => startEditContent(c)}>Edit</button>
                          <button
                            style={deleteBtnStyle}
                            onClick={() => deleteContent(c._id)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SUBSCRIPTIONS SECTION - unchanged (read-only) */}
        <section>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#334155',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '3px solid #f59e0b',
              display: 'inline-block',
            }}
          >
            Subscriptions ({subscriptions.length})
          </h3>

          <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                background: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ background: '#f59e0b' }}>
                  <th style={thStyle}>Subscriber</th>
                  <th style={thStyle}>Creator</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Start Date</th>
                  <th style={thStyle}>End Date</th>
                  <th style={thStyle}>Active</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map(s => (
                  <tr
                    key={s._id}
                    style={{ transition: 'background 0.2s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fffbeb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={tdStyle}>{s.subscriber?.name || 'N/A'}</td>
                    <td style={tdStyle}>{s.creator?.name || 'N/A'}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '999px',
                          fontSize: '14px',
                          fontWeight: '600',
                          background: '#fef3c7',
                          color: '#92400e',
                        }}
                      >
                        {s.type}
                      </span>
                    </td>
                    <td style={tdStyle}>{new Date(s.startDate).toLocaleDateString()}</td>
                    <td style={tdStyle}>{new Date(s.endDate).toLocaleDateString()}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: '999px',
                          fontSize: '14px',
                          fontWeight: '600',
                          background: s.active ? '#d1fae5' : '#fee2e2',
                          color: s.active ? '#065f46' : '#991b1b',
                        }}
                      >
                        {s.active ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

// Reusable inline styles
const thStyle = {
  padding: '16px 20px',
  textAlign: 'left',
  fontSize: '15px',
  fontWeight: '600',
  color: '#ffffff',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tdStyle = {
  padding: '16px 20px',
  fontSize: '15px',
  color: '#374151',
  borderBottom: '1px solid #e2e8f0',
};

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #94a3b8',
  fontSize: '15px',
  width: '100%',
  maxWidth: '200px',
};

const editBtnStyle = {
  padding: '8px 16px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginRight: '8px',
};

const saveBtnStyle = {
  ...editBtnStyle,
  backgroundColor: '#10b981',
  marginRight: '8px',
};

const cancelBtnStyle = {
  padding: '8px 16px',
  backgroundColor: '#6b7280',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const deleteBtnStyle = {
  padding: '8px 16px',
  backgroundColor: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};