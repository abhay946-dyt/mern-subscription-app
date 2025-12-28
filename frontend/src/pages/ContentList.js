import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function ContentList() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    api.get('/content/CREATOR_ID').then(res => setContent(res.data));
  }, []);

  return (
    <>
      {content.map(c => (
        <div
          key={c._id}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '16px',
            padding: '28px',
            margin: '20px auto',
            maxWidth: '800px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.08)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)';
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '6px',
              height: '100%',
              background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
              borderRadius: '16px 0 0 16px',
            }}
          />

          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '28px',
              fontWeight: '700',
              color: '#1e293b',
              letterSpacing: '-0.5px',
              lineHeight: '1.3',
            }}
          >
            {c.title}
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: '17px',
              lineHeight: '1.7',
              color: '#475569',
              fontWeight: '400',
            }}
          >
            {c.description}
          </p>

          {/* Optional subtle footer decoration */}
          <div
            style={{
              marginTop: '24px',
              height: '4px',
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              borderRadius: '2px',
              opacity: 0.6,
            }}
          />
        </div>
      ))}
    </>
  );
}