import { FileText, CheckSquare, Users, AlertTriangle } from 'lucide-react';
import { useDocuments } from '../hooks/useDocuments';

export default function Dashboard() {
  const { documents, loading } = useDocuments();

  const pendingDocs = documents.filter(
    (doc) => doc.status === 'a_vencer' || doc.status === 'vencido'
  ).length;

  const stats = [
    { label: 'Documentos Pendentes', value: loading ? '...' : String(pendingDocs), icon: FileText, color: 'bg-trakto-blue' },
    { label: 'Checklist Completo', value: '85%', icon: CheckSquare, color: 'bg-green-500' },
    { label: 'Sócios Ativos', value: '4', icon: Users, color: 'bg-trakto-purple' },
    { label: 'Alertas', value: loading ? '...' : String(pendingDocs), icon: AlertTriangle, color: 'bg-trakto-orange' },
  ];

  const recentDocs = documents.slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-glow transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Documentos Recentes</h3>
          {loading ? (
            <p className="text-slate-400">Carregando...</p>
          ) : recentDocs.length > 0 ? (
            <ul className="space-y-3">
              {recentDocs.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                  <span className="text-slate-300">{doc.nome}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    doc.status === 'ok' ? 'bg-green-500/20 text-green-400' :
                    doc.status === 'a_vencer' ? 'bg-yellow-500/20 text-yellow-400' :
                    doc.status === 'vencido' ? 'bg-red-500/20 text-red-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {doc.status === 'ok' ? 'Em dia' :
                     doc.status === 'a_vencer' ? 'A vencer' :
                     doc.status === 'vencido' ? 'Vencido' : 'Pendente'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">Nenhum documento cadastrado</p>
          )}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Atividades Recentes</h3>
          <p className="text-slate-400">Nenhuma atividade recente</p>
        </div>
      </div>
    </div>
  );
}
