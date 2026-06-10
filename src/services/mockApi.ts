import { Ticket, Comment, TicketFilters, DashboardStats } from '../types';

// Simulação de dados persistentes usando localStorage
const STORAGE_KEY = 'helpdesk_tickets';
const COMMENTS_KEY = 'helpdesk_comments';

// Dados iniciais
const initialTickets: Ticket[] = [
  {
    id: '1',
    titulo: 'Computador não liga',
    descricao: 'O computador da sala 205 não está ligando. Já tentei verificar os cabos mas parece ser um problema mais sério.',
    categoria: 'hardware',
    prioridade: 'alta',
    status: 'em_andamento',
    solicitante: 'Maria Silva',
    emailSolicitante: 'maria.silva@empresa.com',
    tecnicoResponsavel: 'João Santos',
    dataCriacao: '2024-01-15T09:30:00',
    dataAtualizacao: '2024-01-15T14:20:00',
    comentarios: []
  },
  {
    id: '2',
    titulo: 'Problema com acesso ao email',
    descricao: 'Não consigo acessar minha conta de email corporativo. Aparece erro de senha incorreta, mas tenho certeza que a senha está correta.',
    categoria: 'email',
    prioridade: 'media',
    status: 'aberto',
    solicitante: 'Pedro Oliveira',
    emailSolicitante: 'pedro.oliveira@empresa.com',
    dataCriacao: '2024-01-16T10:15:00',
    dataAtualizacao: '2024-01-16T10:15:00',
    comentarios: []
  },
  {
    id: '3',
    titulo: 'Instalação de software AutoCAD',
    descricao: 'Preciso que seja instalado o AutoCAD 2024 na minha estação de trabalho para um projeto urgente.',
    categoria: 'software',
    prioridade: 'urgente',
    status: 'aberto',
    solicitante: 'Ana Costa',
    emailSolicitante: 'ana.costa@empresa.com',
    dataCriacao: '2024-01-16T11:00:00',
    dataAtualizacao: '2024-01-16T11:00:00',
    comentarios: []
  },
  {
    id: '4',
    titulo: 'Internet lenta no setor financeiro',
    descricao: 'A internet está muito lenta no setor financeiro. Vários funcionários estão reclamando e isso está impactando o trabalho.',
    categoria: 'rede',
    prioridade: 'alta',
    status: 'aguardando',
    solicitante: 'Carlos Mendes',
    emailSolicitante: 'carlos.mendes@empresa.com',
    tecnicoResponsavel: 'João Santos',
    dataCriacao: '2024-01-14T08:00:00',
    dataAtualizacao: '2024-01-16T09:00:00',
    comentarios: []
  },
  {
    id: '5',
    titulo: 'Mouse sem fio não funciona',
    descricao: 'O mouse sem fio parou de funcionar. Já troquei as pilhas mas continua sem responder.',
    categoria: 'hardware',
    prioridade: 'baixa',
    status: 'resolvido',
    solicitante: 'Juliana Rocha',
    emailSolicitante: 'juliana.rocha@empresa.com',
    tecnicoResponsavel: 'Marcos Lima',
    dataCriacao: '2024-01-13T14:30:00',
    dataAtualizacao: '2024-01-14T16:45:00',
    dataResolucao: '2024-01-14T16:45:00',
    comentarios: []
  },
  {
    id: '6',
    titulo: 'Solicitar acesso ao sistema SAP',
    descricao: 'Novo funcionário precisa de acesso ao sistema SAP com perfil de consultor.',
    categoria: 'acesso',
    prioridade: 'media',
    status: 'fechado',
    solicitante: 'Roberto Alves',
    emailSolicitante: 'roberto.alves@empresa.com',
    tecnicoResponsavel: 'Marcos Lima',
    dataCriacao: '2024-01-10T09:00:00',
    dataAtualizacao: '2024-01-11T15:30:00',
    dataResolucao: '2024-01-11T15:30:00',
    comentarios: []
  },
  {
    id: '7',
    titulo: 'Impressora não imprime',
    descricao: 'A impressora do setor de RH está com fila de impressão travada.',
    categoria: 'hardware',
    prioridade: 'media',
    status: 'em_andamento',
    solicitante: 'Fernanda Lima',
    emailSolicitante: 'fernanda.lima@empresa.com',
    tecnicoResponsavel: 'João Santos',
    dataCriacao: '2024-01-16T08:45:00',
    dataAtualizacao: '2024-01-16T10:30:00',
    comentarios: []
  },
  {
    id: '8',
    titulo: 'Excel travando constantemente',
    descricao: 'O Microsoft Excel está travando sempre que tento abrir planilhas grandes. Já reiniciei o computador várias vezes.',
    categoria: 'software',
    prioridade: 'alta',
    status: 'aberto',
    solicitante: 'Lucas Ferreira',
    emailSolicitante: 'lucas.ferreira@empresa.com',
    dataCriacao: '2024-01-16T13:20:00',
    dataAtualizacao: '2024-01-16T13:20:00',
    comentarios: []
  }
];

const initialComments: Comment[] = [
  {
    id: 'c1',
    ticketId: '1',
    autor: 'João Santos',
    texto: 'Verificando o hardware. Parece ser problema na fonte de alimentação.',
    data: '2024-01-15T14:20:00',
    interno: true
  },
  {
    id: 'c2',
    ticketId: '1',
    autor: 'Maria Silva',
    texto: 'Obrigada pelo retorno! O computador é essencial para o trabalho.',
    data: '2024-01-15T14:30:00',
    interno: false
  },
  {
    id: 'c3',
    ticketId: '4',
    autor: 'João Santos',
    texto: 'Aguardando liberação do fornecedor para aumentar a banda.',
    data: '2024-01-16T09:00:00',
    interno: false
  },
  {
    id: 'c4',
    ticketId: '5',
    autor: 'Marcos Lima',
    texto: 'Receptor USB estava com defeito. Testado novo mouse.',
    data: '2024-01-14T16:30:00',
    interno: true
  },
  {
    id: 'c5',
    ticketId: '5',
    autor: 'Marcos Lima',
    texto: 'Mouse substituído. Problema resolvido.',
    data: '2024-01-14T16:45:00',
    interno: false
  },
  {
    id: 'c6',
    ticketId: '7',
    autor: 'João Santos',
    texto: 'Limpando fila de impressão e reiniciando spooler.',
    data: '2024-01-16T10:30:00',
    interno: true
  }
];

// Inicializar dados se não existirem
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTickets));
  }
  if (!localStorage.getItem(COMMENTS_KEY)) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(initialComments));
  }
};

// Obter tickets
const getTickets = (): Ticket[] => {
  initializeData();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Salvar tickets
const saveTickets = (tickets: Ticket[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
};

// Obter comentários
const getComments = (): Comment[] => {
  const data = localStorage.getItem(COMMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

// Salvar comentários
const saveComments = (comments: Comment[]) => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

// Delay para simular requisição de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Obter todos os tickets com filtros
  async getTickets(filters?: TicketFilters): Promise<Ticket[]> {
    await delay(300);
    let tickets = getTickets();
    const comments = getComments();

    // Adicionar comentários aos tickets
    tickets = tickets.map(ticket => ({
      ...ticket,
      comentarios: comments.filter(c => c.ticketId === ticket.id)
    }));

    if (!filters) return tickets;

    // Aplicar filtros
    if (filters.status && filters.status.length > 0) {
      tickets = tickets.filter(t => filters.status!.includes(t.status));
    }

    if (filters.prioridade && filters.prioridade.length > 0) {
      tickets = tickets.filter(t => filters.prioridade!.includes(t.prioridade));
    }

    if (filters.categoria && filters.categoria.length > 0) {
      tickets = tickets.filter(t => filters.categoria!.includes(t.categoria));
    }

    if (filters.tecnico) {
      tickets = tickets.filter(t => t.tecnicoResponsavel === filters.tecnico);
    }

    if (filters.solicitante) {
      tickets = tickets.filter(t => 
        t.solicitante.toLowerCase().includes(filters.solicitante!.toLowerCase())
      );
    }

    if (filters.busca) {
      const busca = filters.busca.toLowerCase();
      tickets = tickets.filter(t =>
        t.titulo.toLowerCase().includes(busca) ||
        t.descricao.toLowerCase().includes(busca) ||
        t.solicitante.toLowerCase().includes(busca)
      );
    }

    if (filters.dataInicio) {
      tickets = tickets.filter(t => t.dataCriacao >= filters.dataInicio!);
    }

    if (filters.dataFim) {
      tickets = tickets.filter(t => t.dataCriacao <= filters.dataFim!);
    }

    return tickets;
  },

  // Obter ticket por ID
  async getTicketById(id: string): Promise<Ticket | null> {
    await delay(200);
    const tickets = getTickets();
    const comments = getComments();
    const ticket = tickets.find(t => t.id === id);
    
    if (!ticket) return null;

    return {
      ...ticket,
      comentarios: comments.filter(c => c.ticketId === id)
    };
  },

  // Criar novo ticket
  async createTicket(ticket: Omit<Ticket, 'id' | 'dataCriacao' | 'dataAtualizacao' | 'comentarios'>): Promise<Ticket> {
    await delay(400);
    const tickets = getTickets();
    
    const newTicket: Ticket = {
      ...ticket,
      id: String(Date.now()),
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      comentarios: []
    };

    tickets.push(newTicket);
    saveTickets(tickets);
    return newTicket;
  },

  // Atualizar ticket
  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket> {
    await delay(300);
    const tickets = getTickets();
    const index = tickets.findIndex(t => t.id === id);

    if (index === -1) {
      throw new Error('Ticket não encontrado');
    }

    const updatedTicket = {
      ...tickets[index],
      ...updates,
      id: tickets[index].id, // Garantir que o ID não seja alterado
      dataCriacao: tickets[index].dataCriacao, // Garantir que a data de criação não seja alterada
      dataAtualizacao: new Date().toISOString()
    };

    // Se o status mudou para 'resolvido' ou 'fechado', adicionar data de resolução
    if ((updates.status === 'resolvido' || updates.status === 'fechado') && !updatedTicket.dataResolucao) {
      updatedTicket.dataResolucao = new Date().toISOString();
    }

    tickets[index] = updatedTicket;
    saveTickets(tickets);

    const comments = getComments();
    return {
      ...updatedTicket,
      comentarios: comments.filter(c => c.ticketId === id)
    };
  },

  // Adicionar comentário
  async addComment(ticketId: string, autor: string, texto: string, interno: boolean = false): Promise<Comment> {
    await delay(300);
    const comments = getComments();
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      ticketId,
      autor,
      texto,
      data: new Date().toISOString(),
      interno
    };

    comments.push(newComment);
    saveComments(comments);

    // Atualizar data de atualização do ticket
    const tickets = getTickets();
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    if (ticketIndex !== -1) {
      tickets[ticketIndex].dataAtualizacao = new Date().toISOString();
      saveTickets(tickets);
    }

    return newComment;
  },

  // Obter estatísticas do dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(400);
    const tickets = getTickets();

    const stats: DashboardStats = {
      totalChamados: tickets.length,
      abertos: tickets.filter(t => t.status === 'aberto').length,
      emAndamento: tickets.filter(t => t.status === 'em_andamento').length,
      resolvidos: tickets.filter(t => t.status === 'resolvido').length,
      fechados: tickets.filter(t => t.status === 'fechado').length,
      porPrioridade: {
        baixa: tickets.filter(t => t.prioridade === 'baixa').length,
        media: tickets.filter(t => t.prioridade === 'media').length,
        alta: tickets.filter(t => t.prioridade === 'alta').length,
        urgente: tickets.filter(t => t.prioridade === 'urgente').length
      },
      porCategoria: {
        hardware: tickets.filter(t => t.categoria === 'hardware').length,
        software: tickets.filter(t => t.categoria === 'software').length,
        rede: tickets.filter(t => t.categoria === 'rede').length,
        email: tickets.filter(t => t.categoria === 'email').length,
        acesso: tickets.filter(t => t.categoria === 'acesso').length,
        outros: tickets.filter(t => t.categoria === 'outros').length
      },
      tempoMedioResolucao: 0
    };

    // Calcular tempo médio de resolução
    const ticketsResolvidos = tickets.filter(t => t.dataResolucao);
    if (ticketsResolvidos.length > 0) {
      const totalHoras = ticketsResolvidos.reduce((acc, ticket) => {
        const inicio = new Date(ticket.dataCriacao).getTime();
        const fim = new Date(ticket.dataResolucao!).getTime();
        return acc + (fim - inicio);
      }, 0);
      stats.tempoMedioResolucao = Math.round((totalHoras / ticketsResolvidos.length) / (1000 * 60 * 60)); // Em horas
    }

    return stats;
  },

  // Deletar ticket (opcional)
  async deleteTicket(id: string): Promise<void> {
    await delay(300);
    const tickets = getTickets();
    const filtered = tickets.filter(t => t.id !== id);
    saveTickets(filtered);

    // Remover comentários relacionados
    const comments = getComments();
    const filteredComments = comments.filter(c => c.ticketId !== id);
    saveComments(filteredComments);
  }
};
