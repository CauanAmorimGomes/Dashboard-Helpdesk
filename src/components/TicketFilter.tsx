import { useState } from 'react';
import { TicketFilters, TicketStatus, TicketPriority, TicketCategory } from '../types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TicketFilterProps {
  filters: TicketFilters;
  onApply: (filters: TicketFilters) => void;
  onClose: () => void;
}

const statusOptions: { value: TicketStatus; label: string }[] = [
  { value: 'aberto', label: 'Aberto' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'aguardando', label: 'Aguardando' },
  { value: 'resolvido', label: 'Resolvido' },
  { value: 'fechado', label: 'Fechado' }
];

const priorityOptions: { value: TicketPriority; label: string }[] = [
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Média' },
  { value: 'alta', label: 'Alta' },
  { value: 'urgente', label: 'Urgente' }
];

const categoryOptions: { value: TicketCategory; label: string }[] = [
  { value: 'hardware', label: 'Hardware' },
  { value: 'software', label: 'Software' },
  { value: 'rede', label: 'Rede' },
  { value: 'email', label: 'Email' },
  { value: 'acesso', label: 'Acesso' },
  { value: 'outros', label: 'Outros' }
];

export default function TicketFilter({ filters, onApply, onClose }: TicketFilterProps) {
  const [localFilters, setLocalFilters] = useState<TicketFilters>(filters);

  const handleCheckboxChange = (
    category: 'status' | 'prioridade' | 'categoria',
    value: string
  ) => {
    const currentValues = (localFilters[category] as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    setLocalFilters({
      ...localFilters,
      [category]: newValues
    });
  };

  const handleInputChange = (field: keyof TicketFilters, value: string) => {
    setLocalFilters({
      ...localFilters,
      [field]: value
    });
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filtros Avançados</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Busca */}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar
          </label>
          <input
            type="text"
            value={localFilters.busca || ''}
            onChange={(e) => handleInputChange('busca', e.target.value)}
            placeholder="Buscar por título, descrição ou solicitante..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(localFilters.status || []).includes(option.value)}
                  onChange={() => handleCheckboxChange('status', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Prioridade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prioridade
          </label>
          <div className="space-y-2">
            {priorityOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(localFilters.prioridade || []).includes(option.value)}
                  onChange={() => handleCheckboxChange('prioridade', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <div className="space-y-2">
            {categoryOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(localFilters.categoria || []).includes(option.value)}
                  onChange={() => handleCheckboxChange('categoria', option.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Solicitante */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Solicitante
          </label>
          <input
            type="text"
            value={localFilters.solicitante || ''}
            onChange={(e) => handleInputChange('solicitante', e.target.value)}
            placeholder="Nome do solicitante"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Técnico */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Técnico Responsável
          </label>
          <input
            type="text"
            value={localFilters.tecnico || ''}
            onChange={(e) => handleInputChange('tecnico', e.target.value)}
            placeholder="Nome do técnico"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Data Início */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Início
          </label>
          <input
            type="date"
            value={localFilters.dataInicio || ''}
            onChange={(e) => handleInputChange('dataInicio', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Data Fim */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Fim
          </label>
          <input
            type="date"
            value={localFilters.dataFim || ''}
            onChange={(e) => handleInputChange('dataFim', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Limpar Tudo
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}
