import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, CheckSquare, Users, BarChart3 } from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/documentos', label: 'Documentos', icon: FileText },
  { path: '/checklist', label: 'Checklist', icon: CheckSquare },
  { path: '/socios', label: 'Sócios', icon: Users },
  { path: '/relatorios', label: 'Relatórios', icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
