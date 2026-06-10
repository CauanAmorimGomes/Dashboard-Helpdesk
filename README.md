# 🎫 Sistema de Chamados Técnicos - HelpDesk Pro

Sistema completo de gerenciamento de chamados técnicos desenvolvido com React, TypeScript e Tailwind CSS. Ideal para equipes de suporte técnico, TI e helpdesk.

## ✨ Funcionalidades

### 📊 Dashboard
- Visão geral de todos os chamados
- Estatísticas em tempo real
- Gráficos de prioridade e categoria
- Métricas de performance (tempo médio de resolução, taxa de resolução)
- Cards informativos com status dos chamados

### 🎫 Gestão de Chamados
- **Criar Chamados**: Formulário completo com validação
- **Listar Chamados**: Visualização em cards com informações essenciais
- **Detalhes do Chamado**: Visualização completa com histórico
- **Atualizar Status**: Mudança rápida entre estados (Aberto → Em Andamento → Aguardando → Resolvido → Fechado)
- **Atribuir Técnico**: Designar responsável pelo atendimento
- **Sistema de Comentários**: Adicionar atualizações e observações

### 🔍 Filtros Avançados
- **Busca por texto**: Título, descrição ou solicitante
- **Filtro por Status**: Múltipla seleção
- **Filtro por Prioridade**: Baixa, Média, Alta, Urgente
- **Filtro por Categoria**: Hardware, Software, Rede, Email, Acesso, Outros
- **Filtro por Técnico**: Responsável pelo chamado
- **Filtro por Solicitante**: Nome do usuário
- **Filtro por Data**: Período de criação

### 📱 Design Responsivo
- Interface adaptável para desktop, tablet e mobile
- Menu mobile com navegação otimizada
- Cards e layouts que se ajustam automaticamente

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool e dev server
- **Heroicons** - Ícones SVG
- **LocalStorage** - Persistência de dados

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

## 📋 Estrutura do Projeto

```
src/
├── components/
│   ├── Dashboard.tsx          # Dashboard com estatísticas
│   ├── TicketList.tsx         # Lista de chamados
│   ├── TicketCard.tsx         # Card individual de chamado
│   ├── TicketFilter.tsx       # Filtros avançados
│   ├── TicketDetails.tsx      # Detalhes e gerenciamento do chamado
│   └── NewTicketForm.tsx      # Formulário de novo chamado
├── services/
│   └── mockApi.ts             # API simulada com LocalStorage
├── types/
│   └── index.ts               # Definições de tipos TypeScript
└── App.tsx                    # Componente principal
```

## 🎨 Categorias de Chamados

- **Hardware**: Problemas com equipamentos físicos
- **Software**: Instalação e problemas com programas
- **Rede**: Conectividade e internet
- **Email**: Acesso e configuração de email
- **Acesso**: Permissões e credenciais
- **Outros**: Demais solicitações

## 🎯 Prioridades

- 🟢 **Baixa**: Pode aguardar
- 🟡 **Média**: Atenção normal
- 🟠 **Alta**: Requer atenção prioritária
- 🔴 **Urgente**: Crítico, resolver imediatamente

## 📊 Status do Chamado

1. **Aberto**: Chamado criado, aguardando atendimento
2. **Em Andamento**: Técnico trabalhando na solução
3. **Aguardando**: Dependendo de terceiros ou informações adicionais
4. **Resolvido**: Problema solucionado
5. **Fechado**: Chamado encerrado

## 💾 Persistência de Dados

O sistema utiliza **LocalStorage** para armazenar todos os dados:
- Chamados (tickets)
- Comentários
- Histórico de alterações

Os dados são persistidos automaticamente e carregados ao reabrir a aplicação.

## 🎓 Casos de Uso

### Para Usuários
1. Abrir novo chamado descrevendo o problema
2. Acompanhar status do chamado em tempo real
3. Receber atualizações via comentários
4. Verificar quando o problema foi resolvido

### Para Técnicos
1. Visualizar todos os chamados abertos
2. Filtrar por prioridade, categoria ou status
3. Atribuir chamados para si ou outros técnicos
4. Atualizar status conforme o progresso
5. Adicionar comentários com informações técnicas
6. Monitorar métricas de performance

### Para Gestores
1. Acompanhar dashboard com visão geral
2. Analisar distribuição por categoria e prioridade
3. Verificar tempo médio de resolução
4. Identificar gargalos e tendências
5. Avaliar taxa de resolução da equipe

## 🔧 Personalização

### Adicionar Novos Status
Edite `src/types/index.ts` e adicione o novo status ao tipo `TicketStatus`.

### Adicionar Categorias
Edite `src/types/index.ts` e adicione a nova categoria ao tipo `TicketCategory`.

### Modificar Cores
As cores são definidas usando classes do Tailwind CSS nos componentes.

## 📈 Funcionalidades Futuras (Sugestões)

- [ ] Autenticação de usuários
- [ ] Backend real com banco de dados
- [ ] Notificações por email
- [ ] Upload de arquivos/anexos
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] SLA (Service Level Agreement)
- [ ] Base de conhecimento
- [ ] Chat em tempo real
- [ ] Integração com ferramentas externas
- [ ] Aplicativo mobile

## 📝 Licença

Este projeto é de código aberto e está disponível para uso educacional e comercial.

## 🤝 Contribuições

Sugestões e melhorias são sempre bem-vindas!

---

**Desenvolvido com ❤️ para equipes de suporte técnico**
