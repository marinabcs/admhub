export const CATEGORIAS_DOCUMENTO = {
  fiscal: { label: 'Fiscal', color: 'bg-blue-500' },
  trabalhista: { label: 'Trabalhista', color: 'bg-purple-500' },
  societario: { label: 'Societário', color: 'bg-indigo-500' },
  contratos: { label: 'Contratos', color: 'bg-cyan-500' },
  licencas: { label: 'Licenças', color: 'bg-teal-500' },
  outros: { label: 'Outros', color: 'bg-slate-500' },
};

export const STATUS_DOCUMENTO = {
  ok: { label: 'Em dia', color: 'bg-green-500', textColor: 'text-green-400' },
  a_vencer: { label: 'A vencer', color: 'bg-yellow-500', textColor: 'text-yellow-400' },
  vencido: { label: 'Vencido', color: 'bg-red-500', textColor: 'text-red-400' },
  pendente: { label: 'Pendente', color: 'bg-orange-500', textColor: 'text-orange-400' },
  nao_se_aplica: { label: 'N/A', color: 'bg-slate-500', textColor: 'text-slate-400' },
};

export const CRITICIDADE_DOCUMENTO = {
  critico: { label: 'Crítico', color: 'bg-red-500', priority: 1 },
  alto: { label: 'Alto', color: 'bg-orange-500', priority: 2 },
  medio: { label: 'Médio', color: 'bg-yellow-500', priority: 3 },
  baixo: { label: 'Baixo', color: 'bg-green-500', priority: 4 },
};

export const CATEGORIAS_OPTIONS = Object.entries(CATEGORIAS_DOCUMENTO).map(([value, { label }]) => ({
  value,
  label,
}));

export const STATUS_OPTIONS = Object.entries(STATUS_DOCUMENTO).map(([value, { label }]) => ({
  value,
  label,
}));

export const CRITICIDADE_OPTIONS = Object.entries(CRITICIDADE_DOCUMENTO).map(([value, { label }]) => ({
  value,
  label,
}));
