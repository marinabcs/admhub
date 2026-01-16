import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIAS_OPTIONS, STATUS_OPTIONS, CRITICIDADE_OPTIONS } from '../../../utils/constants';

const initialFormData = {
  nome: '',
  categoria: 'fiscal',
  linkDrive: '',
  dataEmissao: '',
  dataValidade: '',
  criticidade: 'medio',
  status: 'pendente',
  observacoes: '',
  responsavel: '',
  obrigatorioDueDiligence: false,
};

export default function DocumentForm({ isOpen, onClose, onSubmit, document = null }) {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (document) {
      setFormData({
        nome: document.nome || '',
        categoria: document.categoria || 'fiscal',
        linkDrive: document.linkDrive || '',
        dataEmissao: document.dataEmissao
          ? new Date(document.dataEmissao).toISOString().split('T')[0]
          : '',
        dataValidade: document.dataValidade
          ? new Date(document.dataValidade).toISOString().split('T')[0]
          : '',
        criticidade: document.criticidade || 'medio',
        status: document.status || 'pendente',
        observacoes: document.observacoes || '',
        responsavel: document.responsavel || '',
        obrigatorioDueDiligence: document.obrigatorioDueDiligence || false,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [document, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar documento:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">
            {document ? 'Editar Documento' : 'Novo Documento'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Nome do Documento *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
              placeholder="Ex: Contrato Social"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Categoria *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
              >
                {CATEGORIAS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Link Google Drive
            </label>
            <input
              type="url"
              name="linkDrive"
              value={formData.linkDrive}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
              placeholder="https://drive.google.com/..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Data de Emissão
              </label>
              <input
                type="date"
                name="dataEmissao"
                value={formData.dataEmissao}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Data de Validade
              </label>
              <input
                type="date"
                name="dataValidade"
                value={formData.dataValidade}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Criticidade *
              </label>
              <select
                name="criticidade"
                value={formData.criticidade}
                onChange={handleChange}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
              >
                {CRITICIDADE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Responsável (email)
              </label>
              <input
                type="email"
                name="responsavel"
                value={formData.responsavel}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
                placeholder="email@empresa.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Observações
            </label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent resize-none"
              placeholder="Observações adicionais..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="obrigatorioDueDiligence"
              id="obrigatorioDueDiligence"
              checked={formData.obrigatorioDueDiligence}
              onChange={handleChange}
              className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-trakto-blue focus:ring-trakto-blue focus:ring-offset-slate-800"
            />
            <label htmlFor="obrigatorioDueDiligence" className="text-sm text-slate-300">
              Obrigatório para Due Diligence
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-trakto-blue text-white rounded-lg hover:bg-trakto-blue-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : document ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
