import { useState, useEffect } from 'react';
import { Ticket, TicketFilters } from '../types';
import { mockApi } from '../services/mockApi';
import TicketCard from './TicketCard';
import TicketFilter from './TicketFilter';
import { FunnelIcon } from '@heroicons/react/24/outline';

interface TicketListProps {
  onSelectTicket: (ticket: Ticket) => void;
}

export default function TicketList({ onSelectTicket }: TicketListProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<TicketFilters>({});

  useEffect(() => {
    loadTickets();
  }, [filters]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getTickets(filters);
      // Ordenar por data de atualização (mais recente primeiro)
      data.sort((a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime());
      setTickets(data);
    } catch (error) {
      console.error('Erro ao carregar tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (newFilters: TicketFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof TicketFilters];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== '';
  }).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Chamados ({tickets.length})
        </h2>
        <div className="flex gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Limpar Filtros
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <FunnelIcon className="h-5 w-5" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-blue-800 text-white text-xs rounded-full px-2 py-0.5">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <TicketFilter
          filters={filters}
          onApply={handleApplyFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {tickets.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">Nenhum chamado encontrado</p>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onClick={() => onSelectTicket(ticket)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
