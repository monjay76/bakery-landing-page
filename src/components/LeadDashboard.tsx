import { Trash2, Download, X, Calendar, UserCheck, Inbox } from 'lucide-react';
import { Lead, Reservation } from '../types';

interface LeadDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  reservations: Reservation[];
  onClearAll: () => void;
}

export default function LeadDashboard({
  isOpen,
  onClose,
  leads,
  reservations,
  onClearAll,
}: LeadDashboardProps) {
  if (!isOpen) return null;

  const downloadCSV = (type: 'leads' | 'reservations') => {
    let csvContent = '';
    
    if (type === 'leads') {
      csvContent = 'data:text/csv;charset=utf-8,ID,First Name,Email,Timestamp,Coupon\n' +
        leads.map(l => `${l.id},${l.firstName},${l.email},${l.timestamp},${l.couponCode}`).join('\n');
    } else {
      csvContent = 'data:text/csv;charset=utf-8,ID,Client Name,Email,Item,Quantity,Pickup Time\n' +
        reservations.map(r => `${r.id},${r.name},${r.email},${r.itemName},${r.quantity},${r.pickupTime}`).join('\n');
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `velvet_crumb_${type}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="leads-dashboard-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onClose} />

      {/* Main Container */}
      <div className="relative bg-white max-w-4xl w-full h-[80vh] rounded-none overflow-hidden border border-espresso/25 shadow-2xl z-10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-espresso/15 flex items-center justify-between bg-[#FAF6F0]">
          <div>
            <h3 className="text-sm font-display font-medium text-espresso uppercase tracking-widest">Bakery Business Lead Center</h3>
            <p className="text-xs text-espresso-muted">Real-time management dashboard to view VIP signups, active croissant pre-orders, and export CSV files.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-none bg-white hover:bg-[#FAF6F0] flex items-center justify-center border border-espresso/10 text-espresso transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Dashboard Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* VIP Leads Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold text-espresso uppercase tracking-widest flex items-center gap-2">
                <UserCheck size={14} className="text-gold" />
                <span>VIP Club Leads ({leads.length})</span>
              </h4>
              {leads.length > 0 && (
                <button
                  onClick={() => downloadCSV('leads')}
                  className="flex items-center gap-1 text-[9px] font-bold text-gold hover:underline uppercase tracking-widest"
                >
                  <Download size={10} />
                  <span>Download Leads CSV</span>
                </button>
              )}
            </div>

            {leads.length === 0 ? (
              <div className="border border-dashed border-espresso/15 rounded-none py-12 text-center text-espresso-muted text-xs space-y-2 bg-[#FAF6F0]">
                <Inbox size={24} className="mx-auto text-espresso/20" />
                <p className="font-bold text-[10px] uppercase tracking-wider text-espresso">No VIP Club leads captured yet.</p>
                <p className="text-[10px]">Test the hero form above to instantly see records populate here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-none border border-espresso/10 bg-[#FAF6F0]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-espresso/5 border-b border-espresso/10 text-espresso/70 uppercase tracking-wider text-[9px] font-bold">
                      <th className="p-3">First Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Joined At</th>
                      <th className="p-3">Code Assigned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-espresso/5 last:border-b-0 hover:bg-espresso/2 transition-colors">
                        <td className="p-3 font-bold text-espresso uppercase tracking-wide">{lead.firstName}</td>
                        <td className="p-3 font-mono text-espresso-muted">{lead.email}</td>
                        <td className="p-3 text-espresso-muted">{lead.timestamp}</td>
                        <td className="p-3 font-mono font-bold text-gold">{lead.couponCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sourdough & Pastry Pre-orders Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold text-espresso uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} className="text-gold" />
                <span>Morning Pastry Pre-orders ({reservations.length})</span>
              </h4>
              {reservations.length > 0 && (
                <button
                  onClick={() => downloadCSV('reservations')}
                  className="flex items-center gap-1 text-[9px] font-bold text-gold hover:underline uppercase tracking-widest"
                >
                  <Download size={10} />
                  <span>Download Orders CSV</span>
                </button>
              )}
            </div>

            {reservations.length === 0 ? (
              <div className="border border-dashed border-espresso/15 rounded-none py-12 text-center text-espresso-muted text-xs space-y-2 bg-[#FAF6F0]">
                <Inbox size={24} className="mx-auto text-espresso/20" />
                <p className="font-bold text-[10px] uppercase tracking-wider text-espresso">No morning pastry reservations received yet.</p>
                <p className="text-[10px]">Tap a menu item below, complete the pre-order form, and verify here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-none border border-espresso/10 bg-[#FAF6F0]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-espresso/5 border-b border-espresso/10 text-espresso/70 uppercase tracking-wider text-[9px] font-bold">
                      <th className="p-3">Client Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Item Reserved</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3">Pick-up Slot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id} className="border-b border-espresso/5 last:border-b-0 hover:bg-espresso/2 transition-colors">
                        <td className="p-3 font-bold text-espresso uppercase tracking-wide">{res.name}</td>
                        <td className="p-3 font-mono text-espresso-muted">{res.email}</td>
                        <td className="p-3 font-medium text-espresso uppercase tracking-wider">{res.itemName}</td>
                        <td className="p-3 text-center font-mono font-bold text-gold">{res.quantity}x</td>
                        <td className="p-3 font-mono text-espresso-muted">{res.pickupTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Action Bottom Bar */}
        <div className="p-4 bg-[#FAF6F0] border-t border-espresso/15 flex items-center justify-between">
          <p className="text-[10px] text-espresso-muted uppercase tracking-wider">
            Note: All simulation data is cached in your browser's local sandbox (localStorage).
          </p>
          {(leads.length > 0 || reservations.length > 0) && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-none border border-red-200 text-[10px] font-bold transition-all uppercase tracking-widest"
            >
              <Trash2 size={12} />
              <span>Reset Dashboard Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
