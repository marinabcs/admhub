import { FileText, AlertTriangle, Clock } from 'lucide-react';
import { STATUS_DOCUMENTO } from '../../../utils/constants';

export default function DocumentCard({ pendingCount = 0, expiredCount = 0, totalCount = 0 }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Documentos</h3>
        <div className="bg-trakto-blue p-2 rounded-lg">
          <FileText className="text-white" size={20} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-400" size={16} />
            <span className="text-slate-300 text-sm">A vencer</span>
          </div>
          <span className="text-yellow-400 font-semibold">{pendingCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-400" size={16} />
            <span className="text-slate-300 text-sm">Vencidos</span>
          </div>
          <span className="text-red-400 font-semibold">{expiredCount}</span>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Total</span>
            <span className="text-white font-semibold">{totalCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
