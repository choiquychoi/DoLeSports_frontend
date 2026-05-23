import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  User, 
  Phone, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Trash2
} from 'lucide-react';
import api from '@/lib/axios';

interface BookingItem {
  courtId: number;
  startTime: string;
  endTime: string;
  price: number;
}

interface IBooking {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  date: string;
  items: BookingItem[];
  totalAmount: number;
  paymentStatus: 'Pending' | 'Paid' | 'Partial';
  bookingStatus: 'Waiting' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchQuery] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/bookings');
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, status: string, payment?: string) => {
    if (!window.confirm(`Xác nhận cập nhật trạng thái đơn #${id}?`)) return;
    
    try {
      const updateData: any = { bookingStatus: status };
      if (payment) updateData.paymentStatus = payment;
      
      await api.put(`/bookings/${id}`, updateData);
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Không thể cập nhật trạng thái.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`CẢNH BÁO: Bạn có chắc chắn muốn XÓA VĨNH VIỄN đơn đặt sân này? Hành động này không thể hoàn tác.`)) return;
    
    try {
      await api.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Không thể xóa đơn.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Waiting':
        return <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200">Chờ duyệt</span>;
      case 'Confirmed':
        return <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">Đã xác nhận</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Đã hủy</span>;
      default:
        return null;
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.customer.phone.includes(searchTerm) ||
    b.orderNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-4">
            QUẢN LÝ <span className="text-red-600">ĐẶT SÂN</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Theo dõi và xử lý lịch trình sân cầu lông</p>
        </div>
        
        <div className="relative group min-w-[300px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
          <input 
            type="text"
            placeholder="Tìm theo Tên, SĐT, Mã đơn..."
            className="w-full bg-white border-2 border-gray-100 focus:border-red-600 rounded-2xl py-4 pl-14 pr-6 outline-none font-bold text-sm transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600"><Clock /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Đang chờ</p>
            <p className="text-2xl font-black italic">{bookings.filter(b => b.bookingStatus === 'Waiting').length}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600"><CheckCircle /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Đã chốt</p>
            <p className="text-2xl font-black italic">{bookings.filter(b => b.bookingStatus === 'Confirmed').length}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600"><AlertCircle /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Hôm nay</p>
            <p className="text-2xl font-black italic">{bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length}</p>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đang đồng bộ dữ liệu...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest text-gray-400">Mã đơn / Ngày</th>
                  <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest text-gray-400">Khách hàng</th>
                  <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest text-gray-400">Chi tiết sân</th>
                  <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest text-gray-400">Thanh toán</th>
                  <th className="px-8 py-6 font-black uppercase text-[10px] tracking-widest text-gray-400 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-xs text-red-600">#{b.orderNumber}</span>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{new Date(b.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-black text-sm uppercase italic tracking-tighter">{b.customer.name}</span>
                        <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1"><Phone size={10} /> {b.customer.phone}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        {b.items.map((item, i) => (
                          <div key={i} className="px-2 py-1 bg-black text-white text-[9px] font-black rounded-lg">
                            S{item.courtId}: {item.startTime}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-sm">{b.totalAmount.toLocaleString()}₫</span>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${b.paymentStatus === 'Paid' ? 'text-green-500' : 'text-amber-500'}`}>
                          {b.paymentStatus === 'Paid' ? 'Đã thu' : 'Chưa thu'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        {getStatusBadge(b.bookingStatus)}
                        {b.bookingStatus === 'Waiting' ? (
                          <div className="flex gap-2 ml-4">
                            <button 
                              onClick={() => handleUpdateStatus(b._id, 'Confirmed', 'Paid')}
                              className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(b._id, 'Cancelled')}
                              className="w-10 h-10 bg-white border border-gray-100 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all shadow-sm"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleDelete(b._id)}
                            className="ml-4 p-2 text-gray-300 hover:text-red-600 transition-colors"
                            title="Xóa vĩnh viễn"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <div className="py-20 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-gray-200 mx-auto" />
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Không tìm thấy đơn đặt sân nào</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
