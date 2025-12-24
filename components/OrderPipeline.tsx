import React from 'react';
import { Order, Firmness } from '../types';
import { CheckCircle, Truck, Package, Hammer, Clock } from 'lucide-react';

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-2024-001', customerId: '1', customerName: '张伟', orderDate: '2024-05-10', deliveryDate: '2024-05-25', amount: 12800, status: 'PRODUCTION', specs: { firmness: Firmness.FIRM, width: 180, length: 200, height: 25, materials: ['Latex'] } },
  { id: 'ORD-2024-002', customerId: '2', customerName: 'Sarah Smith', orderDate: '2024-05-12', deliveryDate: '2024-05-28', amount: 25000, status: 'PENDING', specs: { firmness: Firmness.SOFT, width: 200, length: 200, height: 30, materials: ['Horsehair', 'Wool'] } },
  { id: 'ORD-2024-003', customerId: '3', customerName: '王总', orderDate: '2024-05-08', deliveryDate: '2024-05-20', amount: 48000, status: 'QUALITY_CHECK', specs: { firmness: Firmness.MEDIUM, width: 220, length: 220, height: 35, materials: ['Cashmere', 'Springs'] } },
];

const STAGES = [
  { id: 'PENDING', label: '待确认', icon: Clock, color: 'bg-slate-100 text-slate-600' },
  { id: 'PRODUCTION', label: '手工制作中', icon: Hammer, color: 'bg-amber-100 text-amber-600' },
  { id: 'QUALITY_CHECK', label: '质检缝合', icon: CheckCircle, color: 'bg-blue-100 text-blue-600' },
  { id: 'SHIPPED', label: '已发货', icon: Truck, color: 'bg-indigo-100 text-indigo-600' },
];

export const OrderPipeline: React.FC = () => {
  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">订单生产看板</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
          + 新建订单
        </button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 min-w-max h-full pb-4">
          {STAGES.map(stage => {
            const stageOrders = MOCK_ORDERS.filter(o => o.status === stage.id);
            const totalAmount = stageOrders.reduce((sum, o) => sum + o.amount, 0);

            return (
              <div key={stage.id} className="w-80 flex flex-col bg-slate-50/50 rounded-xl border border-slate-200/60">
                <div className={`p-4 border-b border-slate-200 flex justify-between items-center rounded-t-xl ${stage.id === 'PRODUCTION' ? 'bg-amber-50' : ''}`}>
                  <div className="flex items-center gap-2">
                    <stage.icon size={16} className={stage.color.split(' ')[1]} />
                    <span className="font-bold text-slate-700">{stage.label}</span>
                    <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-slate-500 shadow-sm border border-slate-100">{stageOrders.length}</span>
                  </div>
                </div>
                
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                  {stageOrders.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                         <span className="font-bold text-slate-800 text-sm">{order.customerName}</span>
                         <span className="text-xs text-slate-400 font-mono">{order.id.split('-')[2]}</span>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                         <div className="text-xs text-slate-500 flex justify-between">
                            <span>尺寸:</span>
                            <span className="font-medium text-slate-700">{order.specs.width}x{order.specs.length}cm</span>
                         </div>
                         <div className="text-xs text-slate-500 flex justify-between">
                            <span>硬度:</span>
                            <span className="font-medium text-slate-700">{order.specs.firmness}</span>
                         </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="font-bold text-indigo-600 text-sm">¥{order.amount.toLocaleString()}</span>
                        <div className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded">
                          交付: {order.deliveryDate.slice(5)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {stageOrders.length === 0 && (
                     <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
                       暂无订单
                     </div>
                  )}
                </div>

                <div className="p-3 border-t border-slate-200 bg-white rounded-b-xl">
                  <p className="text-xs text-slate-400 text-right">总金额: ¥{totalAmount.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
