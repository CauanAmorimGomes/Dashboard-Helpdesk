# ⚡ Quick Start - HelpDesk Pro

## 🚀 Início Rápido em 3 Passos

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Executar em Desenvolvimento
```bash
npm run dev
```

### 3️⃣ Abrir no Navegador
```
http://localhost:5173
```

**Pronto! O sistema já está funcionando! 🎉**

---

## 🎯 Primeiros Passos no Sistema

### 1. Explorar o Dashboard
- Ao abrir, você verá o **Dashboard** com estatísticas
- Veja os 8 chamados de exemplo já criados
- Observe os gráficos de distribuição
- Confira as métricas de performance

### 2. Ver os Chamados
- Clique em **"Chamados"** no menu superior
- Veja a lista de todos os tickets
- Observe as cores indicando prioridade (borda lateral)
- Clique em qualquer card para ver detalhes

### 3. Criar um Novo Chamado
- Clique no botão **"+ Novo Chamado"** (canto superior direito)
- Preencha o formulário:
  - Título: "Teste de novo chamado"
  - Descrição: "Este é um teste do sistema"
  - Categoria: Selecione qualquer uma
  - Prioridade: Selecione qualquer uma
  - Nome: Seu nome
  - Email: Seu email
- Clique em **"Criar Chamado"**
- ✅ Sucesso! Você será redirecionado para a lista

### 4. Usar Filtros
- Na lista de chamados, clique em **"Filtros"**
- Experimente filtrar por:
  - Status: Marque "Aberto"
  - Prioridade: Marque "Urgente"
- Clique em **"Aplicar Filtros"**
- Veja apenas os chamados urgentes e abertos
- Clique em **"Limpar Filtros"** para voltar

### 5. Gerenciar um Chamado
- Clique em qualquer chamado da lista
- No modal de detalhes:
  - **Mudar Status**: Clique em um dos botões de status
  - **Atribuir Técnico**: Digite "João Santos" e clique "Atribuir"
  - **Adicionar Comentário**: Digite e clique "Adicionar Comentário"
- Feche o modal e veja as mudanças na lista

---

## 📱 Testando no Mobile

### Emular Mobile no Chrome
1. Pressione `F12` para abrir DevTools
2. Pressione `Ctrl + Shift + M` (ou `Cmd + Shift + M` no Mac)
3. Selecione um dispositivo (ex: iPhone 12)
4. Teste:
   - Menu hamburger (☰)
   - Botão flutuante (+)
   - Scroll nos gráficos
   - Formulários

---

## 🎓 Cenários de Teste

### Cenário 1: Usuário Final
**Objetivo**: Abrir um chamado de problema com computador

1. Clique em **"Novo Chamado"**
2. Preencha:
   - Título: "Computador travando"
   - Descrição: "Meu computador está travando quando abro o Excel"
   - Categoria: Software
   - Prioridade: Alta
   - Seus dados
3. Crie o chamado
4. Veja ele aparecer na lista
5. Abra os detalhes e veja todas as informações

### Cenário 2: Técnico de Suporte
**Objetivo**: Atender chamados urgentes

1. Vá em **"Chamados"**
2. Clique em **"Filtros"**
3. Marque apenas "Urgente" em Prioridade
4. Aplique os filtros
5. Clique no chamado urgente
6. Atribua para você mesmo
7. Mude o status para "Em Andamento"
8. Adicione um comentário: "Verificando o problema"

### Cenário 3: Gestor de TI
**Objetivo**: Analisar métricas da equipe

1. Vá no **Dashboard**
2. Veja:
   - Total de chamados: 8
   - Abertos: Quantos estão sem atendimento
   - Tempo médio de resolução
   - Distribuição por categoria
3. Identifique:
   - Qual categoria tem mais chamados?
   - Quantos chamados urgentes existem?
   - Qual a taxa de resolução?

---

## 🔍 Explorando Funcionalidades

### Busca Inteligente
1. Vá em **"Chamados"**
2. Clique em **"Filtros"**
3. No campo "Buscar", digite: "excel"
4. Aplique
5. Veja apenas chamados relacionados ao Excel

### Filtro por Data
1. Abra os **Filtros**
2. Defina:
   - Data Início: 01/01/2024
   - Data Fim: 15/01/2024
3. Veja apenas chamados deste período

### Combinação de Filtros
1. Abra os **Filtros**
2. Marque:
   - Status: Aberto, Em Andamento
   - Prioridade: Alta, Urgente
   - Categoria: Hardware
3. Veja apenas chamados de hardware urgentes/altos que estão pendentes

---

## 💾 Testando Persistência

### Verificar LocalStorage
1. Crie alguns chamados novos
2. Adicione comentários
3. Mude status
4. **Recarregue a página** (F5)
5. ✅ Tudo continua lá!

### Limpar Dados
Abra o Console (F12) e digite:
```javascript
localStorage.clear()
location.reload()
```
Os dados voltarão ao estado inicial (8 chamados de exemplo)

---

## 🎨 Personalizando

### Adicionar Seus Dados
Edite `src/services/mockApi.ts`:

```typescript
const initialTickets: Ticket[] = [
  {
    id: '1',
    titulo: 'Seu título aqui',
    descricao: 'Sua descrição',
    categoria: 'hardware',
    prioridade: 'alta',
    status: 'aberto',
    solicitante: 'Seu Nome',
    emailSolicitante: 'seu@email.com',
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString(),
    comentarios: []
  }
];
```

Depois:
```bash
localStorage.clear()
# Recarregue a página
```

---

## 🏗️ Build para Produção

### Compilar
```bash
npm run build
```

### Testar Build
```bash
npm run preview
```

### Deploy
O arquivo `dist/index.html` contém tudo. Basta:
- Hospedar em qualquer servidor web
- Ou usar Vercel/Netlify/GitHub Pages

---

## 🐛 Resolução de Problemas

### Build Falha
```bash
rm -rf node_modules
npm install
npm run build
```

### Não Aparece Dados
- Verifique localStorage no DevTools
- Limpe o cache: `localStorage.clear()`
- Recarregue a página

### Erros TypeScript
```bash
npm run type-check
```

### Port 5173 em Uso
```bash
# Edite vite.config.ts e mude a porta
# ou mate o processo:
lsof -ti:5173 | xargs kill
```

---

## 📚 Próximos Passos

Depois de explorar o básico:

1. **Leia a Documentação Completa**
   - `README.md` - Visão geral
   - `GUIA_USUARIO.md` - Manual detalhado
   - `TECHNICAL.md` - Detalhes técnicos

2. **Personalize o Sistema**
   - Altere cores em `src/components/`
   - Adicione novas categorias em `src/types/`
   - Crie novos status se necessário

3. **Integre com Backend**
   - Substitua `mockApi.ts` por chamadas reais
   - Veja `TECHNICAL.md` para guia de migração

4. **Adicione Funcionalidades**
   - Upload de arquivos
   - Notificações
   - Autenticação
   - Relatórios

---

## 🎯 Dicas Profissionais

### Para Demonstração
- Use os dados de exemplo existentes
- Mostre o Dashboard primeiro (visual impactante)
- Demonstre os filtros (mostra poder do sistema)
- Crie um chamado ao vivo
- Mostre o mobile (diferencial)

### Para Desenvolvimento
- Use React DevTools para debug
- Mantenha o console aberto para ver erros
- Teste em diferentes navegadores
- Valide em diferentes tamanhos de tela

### Para Produção
- Faça backup do localStorage se importante
- Configure analytics se disponível
- Monitore performance
- Colete feedback dos usuários

---

## 🆘 Precisa de Ajuda?

### Recursos
- 📖 Documentação completa nos arquivos `.md`
- 🐛 Abra uma issue no GitHub
- 💬 Entre em contato com o desenvolvedor

### Comandos Úteis
```bash
npm run dev          # Desenvolvimento
npm run build        # Produção
npm run preview      # Testar build
npm install          # Instalar deps
```

---

**Comece agora e explore todas as funcionalidades! 🚀**

Tempo estimado de exploração completa: **15-20 minutos**
