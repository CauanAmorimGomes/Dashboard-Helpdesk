export type TicketStatus = 'aberto' | 'em_andamento' | 'aguardando' | 'resolvido' | 'fechado';
export type TicketPriority = 'baixa' | 'media' | 'alta' | 'urgente';
export type TicketCategory = 'hardware' | 'software' | 'rede' | 'email' | 'acesso' | 'outros';

export interface Ticket {
  id: string;
  titulo: string;
  descricao: string;
  categoria: TicketCategory;
  prioridade: TicketPriority;
  status: TicketStatus;
  solicitante: string;
  emailSolicitante: string;
  tecnicoResponsavel?: string;
  dataCriacao: string;
  dataAtualizacao: string;
  dataResolucao?: string;
  comentarios: Comment[];
}

export interface Comment {
  id: string;
  ticketId: string;
  autor: string;
  texto: string;
  data: string;
  interno: boolean;
}

export interface TicketFilters {
  status?: TicketStatus[];
  prioridade?: TicketPriority[];
  categoria?: TicketCategory[];
  tecnico?: string;
  solicitante?: string;
  dataInicio?: string;
  dataFim?: string;
  busca?: string;
}

export interface DashboardStats {
  totalChamados: number;
  abertos: number;
  emAndamento: number;
  resolvidos: number;
  fechados: number;
  porPrioridade: {
    baixa: number;
    media: number;
    alta: number;
    urgente: number;
  };
  porCategoria: {
    hardware: number;
    software: number;
    rede: number;
    email: number;
    acesso: number;
    outros: number;
  };
  tempoMedioResolucao: number;
}
