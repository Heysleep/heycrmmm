import React, { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { analyzeMarketTrends } from '../services/geminiService';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    {role: 'ai', text: '你好！我是您的 DreamCraft 智能工坊助手。您可以问我关于市场趋势、材料知识或客户跟进建议。'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setInput('');
    setLoading(true);

    // Simple demo logic: catch keywords to trigger specific service functions
    let responseText = '';
    if (userMsg.includes('趋势') || userMsg.includes('市场')) {
        responseText = await analyzeMarketTrends();
    } else {
        // Fallback for generic chat (mocked here as we only implemented specific services, 
        // in full version we would call a generic chat endpoint)
        responseText = "作为一个演示版助手，我目前擅长回答关于“市场趋势”的问题，或者您可以去【客户管理】页面使用针对特定客户的 AI 功能。";
    }

    setMessages(prev => [...prev, {role: 'ai', text: responseText}]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 flex items-center justify-center text-white transition-all hover:scale-105 z-50"
        >
          <Sparkles size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 animate-fade-in-up">
          <div className="p-4 bg-indigo-600 rounded-t-2xl flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <span className="font-bold">工坊助手</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-500 p-1 rounded">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 text-sm text-slate-500">
                    <span className="animate-pulse">思考中...</span>
                 </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-100 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="询问市场趋势..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
