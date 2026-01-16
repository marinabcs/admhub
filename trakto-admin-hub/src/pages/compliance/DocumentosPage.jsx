import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useDocuments } from '../../hooks/useDocuments';
import DocumentList from '../../components/modules/compliance/DocumentList';
import DocumentForm from '../../components/modules/compliance/DocumentForm';
import { CATEGORIAS_OPTIONS, STATUS_OPTIONS } from '../../utils/constants';

export default function DocumentosPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [filters, setFilters] = useState({
    categoria: '',
    status: '',
  });

  const { documents, loading, addDocument, updateDocument, deleteDocument } =
    useDocuments(filters);

  const handleOpenForm = (document = null) => {
    setEditingDocument(document);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingDocument(null);
  };

  const handleSubmit = async (data) => {
    if (editingDocument) {
      await updateDocument(editingDocument.id, data);
    } else {
      await addDocument(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este documento?')) {
      await deleteDocument(id);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({ categoria: '', status: '' });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Documentos</h2>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 px-4 py-2 bg-trakto-blue text-white rounded-lg hover:bg-trakto-blue-dark transition-colors"
        >
          <Plus size={20} />
          Novo Documento
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex items-center gap-2 text-slate-300">
            <Filter size={20} />
            <span className="font-medium">Filtros</span>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="categoria"
              value={filters.categoria}
              onChange={handleFilterChange}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
            >
              <option value="">Todas as categorias</option>
              {CATEGORIAS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-trakto-blue focus:border-transparent"
            >
              <option value="">Todos os status</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {(filters.categoria || filters.status) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Lista de Documentos */}
      <DocumentList
        documents={documents}
        loading={loading}
        onEdit={handleOpenForm}
        onDelete={handleDelete}
      />

      {/* Modal de Formulário */}
      <DocumentForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        document={editingDocument}
      />
    </div>
  );
}
