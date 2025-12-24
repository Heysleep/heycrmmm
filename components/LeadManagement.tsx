import React, { useState } from 'react';
import { Customer, LeadStatus, Firmness } from '../types';
import { Search, Filter, Mail, MessageSquare, ChevronRight, Sparkles, Users } from 'lucide-react';
import { generateSalesEmail, recommendConfiguration } from '../services/geminiService';

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: '张伟', phone: '13800138000', status: LeadStatus.NEW, lastContact: '2023-10-24', notes: '咨询乳胶床垫，腰不好', specs: { firmness: Firmness.FIRM, width: 180, length: 200, height: 25, materials: ['Natural Latex', 'Coconut Fiber'] } },
  { id: '2', name: '李娜', phone: '13900139000', status: LeadStatus.NEGOTIATING, lastContact: '2023-10-22', notes: '需要定制 2.2米大床，预算充足', specs: { firmness: Firmness.MEDIUM, width: 220, length: 220, height: 30, materials: ['Horsehair', 'Mini Pocket Spring'] } },
  { id: '3', name: '王强', phone: '13700137000', status: LeadStatus.CONTACTED, lastContact: '2023-10-20', notes: '给父母买，需要透气性好的', specs: { firmness: Firmness.MEDIUM_FIRM, width: 150, length: 200, height: 22, materials: ['Wool', 'Cotton'] } },
];

export const LeadManagement: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'email' | 'config'>('details');

  const handleGenerateEmail = async () => {
    if (!selectedCustomer) return;
    setLoading(true);
    setAiOutput('');
    const res = await generateSalesEmail(selectedCustomer, "邀请客户来店体验新款马毛床垫，强调支撑性。");
    setAiOutput(res);
    setLoading(false);
  };

  const handleRecommend = async () => {
     if (!selectedCustomer) return;
     setLoading(true);
     setAiOutput('');
     const res = await recommendConfiguration(selectedCustomer.notes);
     setAiOutput(res);
     setLoading(false);
  }

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-6 animate-fade-in">
      {/* List View */}
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 space-y-3">
          <h2 className="font-bold text-slate-800">客户列表</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索姓名或手机号..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100">
              <Filter size={14} /> 筛选状态
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {MOCK_CUSTOMERS.map(c => (
            <div 
              key={c.id}
              onClick={() => { setSelectedCustomer(c); setAiOutput(''); setActiveTab('details'); }}
              className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${selectedCustomer?.id === c.id ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-slate-800">{c.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase
                  ${c.status === LeadStatus.NEW ? 'bg-green-100 text-green-700' : 
                    c.status === LeadStatus.NEGOTIATING ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                  {c.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mb-1">{c.notes}</p>
              <div className="flex justify-between items-center mt-2">
                 <span className="text-[10px] text-slate-400">{c.lastContact}</span>
                 <ChevronRight size={14} className="text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        {selectedCustomer ? (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedCustomer.name}</h2>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                   <span>{selectedCustomer.phone}</span>
                   <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                   <span>ID: #{selectedCustomer.id}</span>
                </div>
              </div>
              <div className="flex gap-2">
                 <button className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                   <MessageSquare size={18} />
                 </button>
                 <button className="p-2 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                   <Mail size={18} />
                 </button>
              </div>
            </div>

            <div className="border-b border-slate-100 px-6">
              <div className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  详细资料
                </button>
                <button 
                   onClick={() => setActiveTab('config')}
                   className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'config' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  配置推荐 (AI)
                </button>
                <button 
                  onClick={() => setActiveTab('email')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'email' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  邮件草拟 (AI)
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">需求备注</h3>
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-amber-900 text-sm">
                      {selectedCustomer.notes}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">当前意向方案</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500 block">硬度</span>
                        <span className="font-medium text-slate-800">{selectedCustomer.specs?.firmness}</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500 block">尺寸</span>
                        <span className="font-medium text-slate-800">{selectedCustomer.specs?.width} x {selectedCustomer.specs?.length} cm</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded border border-slate-100 col-span-2">
                        <span className="text-xs text-slate-500 block">材料层</span>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {selectedCustomer.specs?.materials.map(m => (
                            <span key={m} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 shadow-sm">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'config' && (
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <div className="flex items-start gap-3">
                      <Sparkles className="text-indigo-600 mt-1" size={18} />
                      <div>
                        <h4 className="font-bold text-indigo-900">Gemini 智能工匠</h4>
                        <p className="text-xs text-indigo-700 mt-1">根据客户的“{selectedCustomer.notes}”需求生成专业配置建议。</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleRecommend}
                      disabled={loading}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                    >
                      {loading ? '思考中...' : '生成配置建议'}
                    </button>
                  </div>
                  {aiOutput && (
                    <div className="prose prose-sm prose-slate max-w-none bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <pre className="whitespace-pre-wrap font-sans text-slate-700">{aiOutput}</pre>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-4">
                   <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-600 mb-3">AI 助手可以根据客户状态和最近的活动草拟跟进邮件。</p>
                    <button 
                      onClick={handleGenerateEmail}
                      disabled={loading}
                      className="px-4 py-2 bg-slate-900 text-white text-sm rounded-md hover:bg-slate-800 disabled:opacity-50 transition-colors"
                    >
                      {loading ? '生成中...' : '草拟跟进邮件'}
                    </button>
                  </div>
                  {aiOutput && (
                    <div className="relative group">
                       <textarea 
                        className="w-full h-64 p-4 text-sm text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent leading-relaxed"
                        defaultValue={aiOutput}
                       />
                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-xs bg-slate-800 text-white px-2 py-1 rounded" onClick={() => navigator.clipboard.writeText(aiOutput)}>复制</button>
                       </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Users size={48} className="mb-4 opacity-20" />
            <p>请选择左侧客户查看详情</p>
          </div>
        )}
      </div>
    </div>
  );
};