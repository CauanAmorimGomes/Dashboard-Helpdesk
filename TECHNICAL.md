# 🔧 Documentação Técnica - HelpDesk Pro

## 🏗️ Arquitetura

### Stack Tecnológico

```
Frontend Framework: React 18
Language: TypeScript
Styling: Tailwind CSS 4
Build Tool: Vite 7
Icons: Heroicons
Storage: LocalStorage API
```

### Estrutura de Componentes

```
App (Container Principal)
├── Header
│   ├── Logo
│   ├── Navigation
│   └── New Ticket Button
├── Dashboard
│   ├── Status Cards
│   ├── Priority Chart
│   ├── Category Chart
│   └── Performance Metrics
├── TicketList
│   ├── Filter Button
│   ├── TicketFilter (Modal)
│   └── TicketCard[] (Lista)
├── NewTicketForm (Modal)
└── TicketDetails (Modal)
    ├── Status Buttons
    ├── Ticket Info
    ├── Assign Technician
    ├── Description
    └── Comments Section
```

## 📊 Modelo de Dados

### Tipos TypeScript

```typescript
// Status do Chamado
type TicketStatus = 
  | 'aberto' 
  | 'em_andamento' 
  | 'aguardando' 
  | 'resolvido' 
  | 'fechado';

// Prioridade
type TicketPriority = 
  | 'baixa' 
  | 'media' 
  | 'alta' 
  | 'urgente';

// Categoria
type TicketCategory = 
  | 'hardware' 
  | 'software' 
  | 'rede' 
  | 'email' 
  | 'acesso' 
  | 'outros';

// Ticket Principal
interface Ticket {
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

// Comentário
interface Comment {
  id: string;
  ticketId: string;
  autor: string;
  texto: string;
  data: string;
  interno: boolean; // Para comentários privados (técnicos)
}
```

## 🔄 Fluxo de Dados

### Estado Global (App.tsx)

```typescript
const [currentView, setCurrentView] = useState<View>('dashboard');
const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
const [showNewTicketForm, setShowNewTicketForm] = useState(false);
const [refreshKey, setRefreshKey] = useState(0);
```

### Propagação de Atualizações

1. **Ação do Usuário** → Chama API Mock
2. **API Mock** → Atualiza LocalStorage
3. **Callback onUpdate** → Incrementa refreshKey
4. **refreshKey** → Re-renderiza componentes com useEffect

```typescript
// Exemplo de fluxo
handleStatusChange(newStatus) 
  → mockApi.updateTicket() 
  → localStorage.setItem() 
  → onUpdate() 
  → setRefreshKey(prev => prev + 1) 
  → componentes re-renderizam
```

## 💾 Persistência (LocalStorage)

### Estrutura de Storage

```javascript
// Chaves
STORAGE_KEY = 'helpdesk_tickets'
COMMENTS_KEY = 'helpdesk_comments'

// Dados armazenados
localStorage.setItem('helpdesk_tickets', JSON.stringify(tickets))
localStorage.setItem('helpdesk_comments', JSON.stringify(comments))
```

### Operações CRUD

```typescript
// CREATE
async createTicket(ticket: Omit<Ticket, 'id' | 'dataCriacao' | ...>)

// READ
async getTickets(filters?: TicketFilters)
async getTicketById(id: string)

// UPDATE
async updateTicket(id: string, updates: Partial<Ticket>)

// DELETE (opcional)
async deleteTicket(id: string)

// OUTROS
async addComment(ticketId, autor, texto, interno)
async getDashboardStats()
```

## 🔍 Sistema de Filtros

### Tipos de Filtro

```typescript
interface TicketFilters {
  status?: TicketStatus[];      // Array múltiplo
  prioridade?: TicketPriority[]; // Array múltiplo
  categoria?: TicketCategory[];  // Array múltiplo
  tecnico?: string;              // String exata
  solicitante?: string;          // String parcial (includes)
  dataInicio?: string;           // ISO date string
  dataFim?: string;              // ISO date string
  busca?: string;                // Busca em título, descrição, solicitante
}
```

### Lógica de Filtragem

```typescript
// Aplica todos os filtros em sequência
let tickets = getTickets();

if (filters.status?.length > 0) {
  tickets = tickets.filter(t => filters.status.includes(t.status));
}

if (filters.busca) {
  const busca = filters.busca.toLowerCase();
  tickets = tickets.filter(t =>
    t.titulo.toLowerCase().includes(busca) ||
    t.descricao.toLowerCase().includes(busca) ||
    t.solicitante.toLowerCase().includes(busca)
  );
}
// ... outros filtros
```

## 📈 Cálculo de Estatísticas

### Dashboard Stats

```typescript
// Contagem simples
totalChamados = tickets.length
abertos = tickets.filter(t => t.status === 'aberto').length

// Por categoria/prioridade
porCategoria.hardware = tickets.filter(t => t.categoria === 'hardware').length

// Tempo médio de resolução
const ticketsResolvidos = tickets.filter(t => t.dataResolucao)
const totalHoras = ticketsResolvidos.reduce((acc, ticket) => {
  const inicio = new Date(ticket.dataCriacao).getTime()
  const fim = new Date(ticket.dataResolucao!).getTime()
  return acc + (fim - inicio)
}, 0)
tempoMedioResolucao = totalHoras / ticketsResolvidos.length / (1000 * 60 * 60)
```

## 🎨 Sistema de Cores

### Tailwind Classes por Status

```typescript
const statusColors = {
  aberto: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  em_andamento: 'bg-blue-100 text-blue-800 border-blue-200',
  aguardando: 'bg-purple-100 text-purple-800 border-purple-200',
  resolvido: 'bg-green-100 text-green-800 border-green-200',
  fechado: 'bg-gray-100 text-gray-800 border-gray-200'
}

const priorityColors = {
  baixa: 'bg-green-500',
  media: 'bg-yellow-500',
  alta: 'bg-orange-500',
  urgente: 'bg-red-500'
}
```

## 🔒 Validações

### Formulário de Novo Ticket

```typescript
// HTML5 Validation
required: titulo, descricao, categoria, prioridade, solicitante, email

// Type checking via TypeScript
categoria: TicketCategory  // Apenas valores válidos
prioridade: TicketPriority // Apenas valores válidos

// Email validation
type="email" // Valida formato de email
```

## ⚡ Performance

### Otimizações Implementadas

1. **Lazy Loading de Modais**: Componentes modais só renderizam quando abertos
2. **Key prop para re-render**: `refreshKey` força atualização eficiente
3. **LocalStorage em batch**: Operações agrupadas
4. **Memoization implícita**: React otimiza re-renders automaticamente

### Simulação de Latência

```typescript
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Usado em todas as operações da API
await delay(300) // Simula request de rede
```

## 🧪 Testando Localmente

### Adicionar Dados de Teste

```typescript
// No browser console
localStorage.clear() // Limpa dados
location.reload()    // Recarrega com dados iniciais
```

### Debug de Estado

```typescript
// Ver tickets no storage
JSON.parse(localStorage.getItem('helpdesk_tickets'))

// Ver comentários
JSON.parse(localStorage.getItem('helpdesk_comments'))
```

## 🚀 Migrando para Backend Real

### Substituir mockApi.ts

```typescript
// Em vez de:
import { mockApi } from './services/mockApi'

// Criar:
import { api } from './services/api'

// Implementar com fetch/axios:
export const api = {
  async getTickets(filters?: TicketFilters) {
    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    })
    return response.json()
  }
  // ... outros métodos
}
```

### Endpoints Sugeridos

```
GET    /api/tickets              - Lista tickets
GET    /api/tickets/:id          - Detalhe do ticket
POST   /api/tickets              - Criar ticket
PATCH  /api/tickets/:id          - Atualizar ticket
DELETE /api/tickets/:id          - Deletar ticket
POST   /api/tickets/:id/comments - Adicionar comentário
GET    /api/dashboard/stats      - Estatísticas
```

## 📱 Responsividade

### Breakpoints Tailwind

```
sm: 640px   - Tablets pequenos
md: 768px   - Tablets
lg: 1024px  - Desktop
xl: 1280px  - Desktop large
```

### Classes Responsivas Principais

```tsx
// Grid responsivo
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

// Menu mobile
hidden md:flex  // Esconde no mobile, mostra no desktop
md:hidden       // Mostra no mobile, esconde no desktop

// Espaçamento
px-4 sm:px-6 lg:px-8
```

## 🔐 Segurança (Próximos Passos)

### Implementações Recomendadas

1. **Autenticação**: JWT ou Session-based
2. **Autorização**: Role-based (Admin, Técnico, Usuário)
3. **Sanitização**: XSS protection em comentários
4. **Rate Limiting**: Prevenir spam de tickets
5. **HTTPS**: Obrigatório em produção
6. **Validação Backend**: Nunca confiar apenas no frontend

## 📦 Build e Deploy

### Build para Produção

```bash
npm run build
# Gera: dist/index.html (single file)
```

### Deploy Sugerido

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Servir a pasta `/dist`
- **Docker**: Nginx servindo arquivos estáticos

### Variáveis de Ambiente (Futuro)

```env
VITE_API_URL=https://api.helpdesk.com
VITE_APP_NAME=HelpDesk Pro
VITE_ENABLE_ANALYTICS=true
```

## 🐛 Debug Common Issues

### Dados não persistem
- Verifique se localStorage está habilitado
- Modo anônimo/incógnito pode bloquear

### Componentes não atualizam
- Verifique se `refreshKey` está sendo incrementado
- Use React DevTools para inspecionar estado

### Build falha
- Limpe node_modules: `rm -rf node_modules && npm install`
- Verifique TypeScript errors: `npm run type-check`

## 📚 Recursos Adicionais

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com)

---

**Desenvolvido com TypeScript + React + Tailwind CSS**
