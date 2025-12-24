import React from 'react';
import { LayoutDashboard, Users, ShoppingBag, Box, Settings, Sparkles } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
    { id: 'leads', label: '客户管理', icon: Users },
    { id: 'orders', label: '订单生产', icon: ShoppingBag },
    { id: 'inventory', label: '原料库存', icon: Box },
    { id: 'ai-lab', label: 'AI 工坊助手', icon: Sparkles },
    { id: 'settings', label: '系统设置', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-indigo-400">❖</span> DreamCraft
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Handmade Mattress CRM</p>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200 border-l-4
                ${isActive 
                  ? 'bg-slate-800 text-indigo-400 border-indigo-400' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white border-transparent'
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 bg-slate-800/50 m-4 rounded-lg">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/40/40" alt="Admin" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
          <div>
            <p className="text-sm font-semibold text-white">工坊主理人</p>
            <p className="text-xs text-green-400">在线</p>
          </div>
        </div>
      </div>
    </div>
  );
};
