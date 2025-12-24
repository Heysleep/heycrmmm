import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LeadManagement } from './components/LeadManagement';
import { OrderPipeline } from './components/OrderPipeline';
import { AIAssistant } from './components/AIAssistant';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadManagement />;
      case 'orders':
        return <OrderPipeline />;
      case 'inventory':
      case 'settings':
      case 'ai-lab':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium">功能模块 "{currentView}" 开发中...</p>
            <p className="text-sm">此演示包含工作台、客户管理和订单看板。</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <h2 className="text-lg font-semibold text-slate-700 capitalize">
               {currentView === 'dashboard' ? '工作台' : 
                currentView === 'leads' ? '客户关系管理' :
                currentView === 'orders' ? '订单中心' : '页面'}
             </h2>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
               v1.0.0 (Beta)
             </span>
             <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                DC
             </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
      
      <AIAssistant />
    </div>
  );
};

export default App;
