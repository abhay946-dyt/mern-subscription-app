import { useAuth } from '../auth/AuthContext';
import SubscriberDashboard from './SubscriberDashboard';
import CreatorDashboard from './CreatorDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
  const { auth } = useAuth();

  if (auth.user.role === 'subscriber') return <SubscriberDashboard />;
  if (auth.user.role === 'creator') return <CreatorDashboard />;
  if (auth.user.role === 'admin') return <AdminDashboard />;
}
