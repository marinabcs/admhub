import { FileText, CheckSquare, Users, AlertTriangle } from 'lucide-react';

const stats = [
  { label: 'Documentos Pendentes', value: '12', icon: FileText, color: 'bg-blue-500' },
  { label: 'Checklist Completo', value: '85%', icon: CheckSquare, color: 'bg-green-500' },
  { label: 'Sócios Ativos', value: '4', icon: Users, color: 'bg-purple-500' },
  { label: 'Alertas', value: '3', icon: AlertTriangle, color: 'bg-orange-500' },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentos Recentes</h3>
          <p className="text-gray-500">Nenhum documento recente</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h3>
          <p className="text-gray-500">Nenhuma atividade recente</p>
        </div>
      </div>
    </div>
  );
}
