import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { auth } = useAuth();

  if (!auth.token) return <Navigate to="/login" />;
  if (roles && !roles.includes(auth.user.role)) return <Navigate to="/" />;

  return children;
}
