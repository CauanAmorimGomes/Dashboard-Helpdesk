import { useState } from 'react';
import { TicketCategory, TicketPriority } from '../types';
import { mockApi } from '../services/mockApi';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NewTicketFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewTicketForm({ onClose, onSuccess }: NewTicketFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'outros' as TicketCategory,
    prioridade: 'media' as TicketPriority,
    solicitante: '',
    emailSolicitante: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await mockApi.createTicket({
        ...formData,
        status: 'aberto'
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao criar ticket:', error);
      alert('Erro ao criar chamado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Novo Chamado</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              required
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Descreva brevemente o problema"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              id="descricao"
              name="descricao"
              required
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva o problema em detalhes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categoria */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                id="categoria"
                name="categoria"
                required
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="rede">Rede</option>
                <option value="email">Email</option>
                <option value="acesso">Acesso</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            {/* Prioridade */}
            <div>
              <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700 mb-2">
                Prioridade *
              </label>
              <select
                id="prioridade"
                name="prioridade"
                required
                value={formData.prioridade}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solicitante */}
            <div>
              <label htmlFor="solicitante" className="block text-sm font-medium text-gray-700 mb-2">
                Seu Nome *
              </label>
              <input
                type="text"
                id="solicitante"
                name="solicitante"
                required
                value={formData.solicitante}
                onChange={handleChange}
                placeholder="Nome completo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="emailSolicitante" className="block text-sm font-medium text-gray-700 mb-2">
                Seu Email *
              </label>
              <input
                type="email"
                id="emailSolicitante"
                name="emailSolicitante"
                required
                value={formData.emailSolicitante}
                onChange={handleChange}
                placeholder="email@empresa.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando...' : 'Criar Chamado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
