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
    <header className="h-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-trakto-blue">Trakto Adm Hub</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-300">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </header>
  );
}
