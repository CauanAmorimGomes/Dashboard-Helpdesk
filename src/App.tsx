import { useState } from 'react';
import { Ticket } from './types';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import NewTicketForm from './components/NewTicketForm';
import { 
  HomeIcon, 
  TicketIcon, 
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

type View = 'dashboard' | 'tickets';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseTicketDetails = () => {
    setSelectedTicket(null);
  };

  const handleTicketUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleNewTicketSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setCurrentView('tickets');
  };

  const navigation = [
    { name: 'Dashboard', view: 'dashboard' as View, icon: HomeIcon },
    { name: 'Chamados', view: 'tickets' as View, icon: TicketIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">HelpDesk Pro</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentView(item.view)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === item.view
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNewTicketForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PlusCircleIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Novo Chamado</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === item.view
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <Dashboard key={refreshKey} />
        )}
        
        {currentView === 'tickets' && (
          <TicketList
            key={refreshKey}
            onSelectTicket={handleSelectTicket}
          />
        )}
      </main>

      {/* Modals */}
      {selectedTicket && (
        <TicketDetails
          ticketId={selectedTicket.id}
          onClose={handleCloseTicketDetails}
          onUpdate={handleTicketUpdate}
        />
      )}

      {showNewTicketForm && (
        <NewTicketForm
          onClose={() => setShowNewTicketForm(false)}
          onSuccess={handleNewTicketSuccess}
        />
      )}

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => setShowNewTicketForm(true)}
        className="fixed bottom-6 right-6 sm:hidden w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center z-40"
        aria-label="Novo Chamado"
      >
        <PlusCircleIcon className="h-8 w-8" />
      </button>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2024 HelpDesk Pro - Sistema de Chamados Técnicos
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
