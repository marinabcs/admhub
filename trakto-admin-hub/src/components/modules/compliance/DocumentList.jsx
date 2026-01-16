import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CATEGORIAS_DOCUMENTO,
  STATUS_DOCUMENTO,
  CRITICIDADE_DOCUMENTO,
} from '../../../utils/constants';

export default function DocumentList({ documents, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center">
        <p className="text-slate-400">Carregando documentos...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 text-center">
        <p className="text-slate-400">Nenhum documento encontrado</p>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return '-';
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                Nome
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                Categoria
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                Validade
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">
                Criticidade
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => {
              const categoria = CATEGORIAS_DOCUMENTO[doc.categoria] || CATEGORIAS_DOCUMENTO.outros;
              const status = STATUS_DOCUMENTO[doc.status] || STATUS_DOCUMENTO.pendente;
              const criticidade = CRITICIDADE_DOCUMENTO[doc.criticidade] || CRITICIDADE_DOCUMENTO.medio;

              return (
                <tr
                  key={doc.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{doc.nome}</span>
                      {doc.linkDrive && (
                        <a
                          href={doc.linkDrive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-trakto-blue hover:text-trakto-blue-light"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {doc.obrigatorioDueDiligence && (
                        <span className="text-xs bg-trakto-purple/20 text-trakto-purple px-2 py-0.5 rounded">
                          DD
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoria.color} text-white`}
                    >
                      {categoria.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color} text-white`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {formatDate(doc.dataValidade)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${criticidade.color} text-white`}
                    >
                      {criticidade.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(doc)}
                        className="p-2 text-slate-400 hover:text-trakto-blue hover:bg-slate-700 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(doc.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
