import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/auth';

export default function Header() {
  const { user } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-indigo-600">Trakto Adm Hub</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </header>
  );
}
