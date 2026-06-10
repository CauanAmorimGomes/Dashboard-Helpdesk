import { useEffect, useState } from 'react';
import { DashboardStats } from '../types';
import { mockApi } from '../services/mockApi';
import { 
  TicketIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statusCards = [
    { 
      title: 'Total de Chamados', 
      value: stats.totalChamados, 
      icon: TicketIcon, 
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'Abertos', 
      value: stats.abertos, 
      icon: ExclamationTriangleIcon, 
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      title: 'Em Andamento', 
      value: stats.emAndamento, 
      icon: ClockIcon, 
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      title: 'Resolvidos', 
      value: stats.resolvidos, 
      icon: CheckCircleIcon, 
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card) => (
          <div key={card.title} className={`${card.bgColor} rounded-lg shadow p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor} mt-2`}>{card.value}</p>
              </div>
              <div className={`${card.color} rounded-full p-3`}>
                <card.icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos e Estatísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Por Prioridade */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-6 w-6 text-gray-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Por Prioridade</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Urgente</span>
                <span className="text-sm font-medium text-red-600">{stats.porPrioridade.urgente}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-red-600 h-2.5 rounded-full" 
                  style={{ width: `${(stats.porPrioridade.urgente / stats.totalChamados) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Alta</span>
                <span className="text-sm font-medium text-orange-600">{stats.porPrioridade.alta}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-orange-600 h-2.5 rounded-full" 
                  style={{ width: `${(stats.porPrioridade.alta / stats.totalChamados) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Média</span>
                <span className="text-sm font-medium text-yellow-600">{stats.porPrioridade.media}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-yellow-600 h-2.5 rounded-full" 
                  style={{ width: `${(stats.porPrioridade.media / stats.totalChamados) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Baixa</span>
                <span className="text-sm font-medium text-green-600">{stats.porPrioridade.baixa}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${(stats.porPrioridade.baixa / stats.totalChamados) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Por Categoria */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-6 w-6 text-gray-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Por Categoria</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(stats.porCategoria).map(([categoria, valor]) => (
              <div key={categoria}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {categoria}
                  </span>
                  <span className="text-sm font-medium text-blue-600">{valor}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(valor / stats.totalChamados) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Métricas de Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Tempo Médio de Resolução</p>
            <p className="text-3xl font-bold text-purple-600">
              {stats.tempoMedioResolucao}h
            </p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Taxa de Resolução</p>
            <p className="text-3xl font-bold text-indigo-600">
              {stats.totalChamados > 0 
                ? Math.round(((stats.resolvidos + stats.fechados) / stats.totalChamados) * 100)
                : 0}%
            </p>
          </div>
          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Chamados Pendentes</p>
            <p className="text-3xl font-bold text-pink-600">
              {stats.abertos + stats.emAndamento}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
