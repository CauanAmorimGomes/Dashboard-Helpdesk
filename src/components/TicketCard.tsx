import { Ticket } from '../types';
import { 
  ClockIcon, 
  UserIcon, 
  TagIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

const statusColors = {
  aberto: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  em_andamento: 'bg-blue-100 text-blue-800 border-blue-200',
  aguardando: 'bg-purple-100 text-purple-800 border-purple-200',
  resolvido: 'bg-green-100 text-green-800 border-green-200',
  fechado: 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusLabels = {
  aberto: 'Aberto',
  em_andamento: 'Em Andamento',
  aguardando: 'Aguardando',
  resolvido: 'Resolvido',
  fechado: 'Fechado'
};

const priorityColors = {
  baixa: 'bg-green-500',
  media: 'bg-yellow-500',
  alta: 'bg-orange-500',
  urgente: 'bg-red-500'
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

export default function TicketCard({ ticket, onClick }: TicketCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} min atrás`;
    }
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer p-6 border-l-4 border-gray-200 hover:border-blue-300 ${
        ticket.prioridade === 'urgente' ? 'border-l-red-500' :
        ticket.prioridade === 'alta' ? 'border-l-orange-500' :
        ticket.prioridade === 'media' ? 'border-l-yellow-500' :
        'border-l-green-500'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[ticket.status]}`}>
              {statusLabels[ticket.status]}
            </span>
            <div className={`w-3 h-3 rounded-full ${priorityColors[ticket.prioridade]}`} 
                 title={priorityLabels[ticket.prioridade]}
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {ticket.titulo}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {ticket.descricao}
          </p>
        </div>
        <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
          #{ticket.id}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
        <div className="flex items-center gap-1">
          <TagIcon className="h-4 w-4" />
          <span>{categoryLabels[ticket.categoria]}</span>
        </div>
        <div className="flex items-center gap-1">
          <UserIcon className="h-4 w-4" />
          <span>{ticket.solicitante}</span>
        </div>
        {ticket.tecnicoResponsavel && (
          <div className="flex items-center gap-1">
            <span className="text-gray-400">→</span>
            <span className="font-medium text-blue-600">{ticket.tecnicoResponsavel}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <ClockIcon className="h-4 w-4" />
          <span>{formatDate(ticket.dataAtualizacao)}</span>
        </div>
        {ticket.comentarios && ticket.comentarios.length > 0 && (
          <div className="flex items-center gap-1">
            <ChatBubbleLeftIcon className="h-4 w-4" />
            <span>{ticket.comentarios.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
