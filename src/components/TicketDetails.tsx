import { useState, useEffect } from 'react';
import { Ticket, TicketStatus } from '../types';
import { mockApi } from '../services/mockApi';
import { 
  XMarkIcon, 
  UserIcon, 
  CalendarIcon, 
  TagIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface TicketDetailsProps {
  ticketId: string;
  onClose: () => void;
  onUpdate: () => void;
}

const statusOptions = [
  { value: 'aberto', label: 'Aberto', color: 'bg-yellow-500' },
  { value: 'em_andamento', label: 'Em Andamento', color: 'bg-blue-500' },
  { value: 'aguardando', label: 'Aguardando', color: 'bg-purple-500' },
  { value: 'resolvido', label: 'Resolvido', color: 'bg-green-500' },
  { value: 'fechado', label: 'Fechado', color: 'bg-gray-500' }
];

const priorityColors = {
  baixa: 'text-green-600 bg-green-50 border-green-200',
  media: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  alta: 'text-orange-600 bg-orange-50 border-orange-200',
  urgente: 'text-red-600 bg-red-50 border-red-200'
};

const priorityLabels = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
  urgente: 'Urgente'
};

const categoryLabels = {
  hardware: 'Hardware',
  software: 'Software',
  rede: 'Rede',
  email: 'Email',
  acesso: 'Acesso',
  outros: 'Outros'
};

export default function TicketDetails({ ticketId, onClose, onUpdate }: TicketDetailsProps) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [tecnicoResponsavel, setTecnicoResponsavel] = useState('');

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  const loadTicket = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getTicketById(ticketId);
      if (data) {
        setTicket(data);
        setTecnicoResponsavel(data.tecnicoResponsavel || '');
      }
    } catch (error) {
      console.error('Erro ao carregar ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket) return;
    setUpdating(true);
    try {
      await mockApi.updateTicket(ticket.id, { status: newStatus });
      await loadTicket();
      onUpdate();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignTechnician = async () => {
    if (!ticket || !tecnicoResponsavel.trim()) return;
    setUpdating(true);
    try {
      await mockApi.updateTicket(ticket.id, { 
        tecnicoResponsavel: tecnicoResponsavel.trim(),
        status: ticket.status === 'aberto' ? 'em_andamento' : ticket.status
      });
      await loadTicket();
      onUpdate();
    } catch (error) {
      console.error('Erro ao atribuir técnico:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket || !newComment.trim()) return;

    setUpdating(true);
    try {
      await mockApi.addComment(
        ticket.id,
        tecnicoResponsavel || 'Sistema',
        newComment.trim(),
        false
      );
      setNewComment('');
      await loadTicket();
      onUpdate();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    } finally {
      setUpdating(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-500">#{ticket.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[ticket.prioridade]}`}>
                {priorityLabels[ticket.prioridade]}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{ticket.titulo}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-4"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value as TicketStatus)}
                  disabled={updating}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    ticket.status === option.value
                      ? `${option.color} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } disabled:opacity-50`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <UserIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Solicitante</p>
                <p className="text-sm font-medium text-gray-900">{ticket.solicitante}</p>
                <p className="text-xs text-gray-600">{ticket.emailSolicitante}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TagIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Categoria</p>
                <p className="text-sm font-medium text-gray-900">{categoryLabels[ticket.categoria]}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Criado em</p>
                <p className="text-sm font-medium text-gray-900">{formatDateTime(ticket.dataCriacao)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Última atualização</p>
                <p className="text-sm font-medium text-gray-900">{formatDateTime(ticket.dataAtualizacao)}</p>
              </div>
            </div>

            {ticket.dataResolucao && (
              <div className="flex items-start gap-3 md:col-span-2">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Resolvido em</p>
                  <p className="text-sm font-medium text-gray-900">{formatDateTime(ticket.dataResolucao)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Técnico Responsável */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Técnico Responsável
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tecnicoResponsavel}
                onChange={(e) => setTecnicoResponsavel(e.target.value)}
                placeholder="Digite o nome do técnico"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAssignTechnician}
                disabled={updating || !tecnicoResponsavel.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Atribuir
              </button>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.descricao}</p>
            </div>
          </div>

          {/* Comentários */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Comentários ({ticket.comentarios?.length || 0})
            </h3>

            {/* Adicionar Comentário */}
            <form onSubmit={handleAddComment} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Adicionar um comentário..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={updating || !newComment.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adicionar Comentário
                </button>
              </div>
            </form>

            {/* Lista de Comentários */}
            <div className="space-y-4">
              {ticket.comentarios && ticket.comentarios.length > 0 ? (
                ticket.comentarios.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {comment.autor.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{comment.autor}</p>
                          <p className="text-xs text-gray-500">{formatDateTime(comment.data)}</p>
                        </div>
                      </div>
                      {comment.interno && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          Interno
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.texto}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Nenhum comentário ainda</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
