import React, { useState, useEffect, useMemo } from 'react';
import { Check, Loader2, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import api from '@/lib/axios';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface BookingItem {
  courtId: number;
  startTime: string;
  endTime: string;
  price: number;
}

interface Booking {
  _id: string;
  items: BookingItem[];
  bookingStatus: 'Waiting' | 'Confirmed' | 'Cancelled';
}

interface SelectedSlot {
  courtId: number;
  startTime: string;
  endTime: string;
}

interface BookingGridProps {
  onContinue: (slots: SelectedSlot[], date: string, price: number) => void;
}

const COURTS = [
  { id: 1, name: 'SÂN 01' },
  { id: 2, name: 'SÂN 02' },
  { id: 3, name: 'SÂN 03' },
];

const START_HOUR = 5;
const END_HOUR = 23;

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    slots.push({
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
    });
  }
  return slots;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const getPriceForSlot = (startTime: string) => {
  const hour = parseInt(startTime.split(':')[0]);
  if (hour >= 17 && hour < 22) return 180000;
  return 140000;
};

const BookingGrid: React.FC<BookingGridProps> = ({ onContinue }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [loading, setLoading] = useState(false);

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/bookings?date=${selectedDate}`);
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [selectedDate]);

  const isBooked = (courtId: number, startTime: string) => {
    return bookings.some(booking => 
      booking.bookingStatus === 'Confirmed' &&
      booking.items.some(item => item.courtId === courtId && item.startTime === startTime)
    );
  };

  const isSelected = (courtId: number, startTime: string) => {
    return selectedSlots.some(slot => slot.courtId === courtId && slot.startTime === startTime);
  };

  const isPast = (startTime: string) => {
    if (selectedDate < todayStr) return true;
    if (selectedDate > todayStr) return false;
    
    const now = new Date();
    const currentHour = now.getHours();
    const [slotHour] = startTime.split(':').map(Number);
    
    if (slotHour <= currentHour) return true;
    return false;
  };

  const toggleSlot = (courtId: number, startTime: string, endTime: string) => {
    if (isBooked(courtId, startTime) || isPast(startTime)) return;

    if (isSelected(courtId, startTime)) {
      setSelectedSlots(selectedSlots.filter(slot => !(slot.courtId === courtId && slot.startTime === startTime)));
    } else {
      setSelectedSlots([...selectedSlots, { courtId, startTime, endTime }]);
    }
  };

  const totalPrice = selectedSlots.reduce((acc, slot) => acc + getPriceForSlot(slot.startTime), 0);

  const changeDate = (days: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);
    const newDateStr = date.toISOString().split('T')[0];
    if (newDateStr < todayStr) return; 
    setSelectedDate(newDateStr);
    setSelectedSlots([]);
  };

  // Styles for the past/expired pattern
  const pastPatternStyle = {
    backgroundImage: 'repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 10px, #eeeeee 10px, #eeeeee 20px)',
  };

  return (
    <div id="dat-san" className="bg-white py-12 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-[1600px]">
        
        {/* Header Control */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4 bg-neutral-50 p-2 border-2 border-black">
            <button 
              onClick={() => changeDate(-1)}
              disabled={selectedDate <= todayStr}
              className="p-3 border-2 border-black hover:bg-black hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="px-6 py-2 text-center min-w-[200px]">
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40 block mb-1">Ngày đang chọn</span>
              <h3 className="text-sm font-black uppercase italic tracking-tighter flex items-center justify-center gap-2">
                <CalendarIcon size={16} className="text-dole-orange" />
                {new Date(selectedDate).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })}
              </h3>
            </div>
            <button 
              onClick={() => changeDate(1)}
              className="p-3 border-2 border-black hover:bg-black hover:text-white transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-8 bg-neutral-50 px-8 py-4 border-2 border-black">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white border-2 border-black"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Trống</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-600 border-2 border-black"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Đã đặt</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-dole-orange border-2 border-black"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Đang chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-black" style={pastPatternStyle}></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-black">Hết hạn</span>
            </div>
          </div>
        </div>

        {/* Full Width Grid */}
        <div className="relative border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
          {loading && (
             <div className="absolute inset-0 bg-white/60 z-40 flex items-center justify-center backdrop-blur-[2px]">
                <Loader2 className="w-12 h-12 animate-spin text-dole-orange" />
             </div>
          )}

          <div className="w-full overflow-x-auto lg:overflow-x-visible no-scrollbar">
            <div className="min-w-[1200px] w-full">
              {/* Time Header Row */}
              <div className="grid grid-cols-[140px_repeat(18,1fr)] bg-black text-white border-b-4 border-black">
                <div className="p-5 border-r-2 border-white/20 font-black italic text-xs uppercase flex items-center justify-center bg-black sticky left-0 z-30">
                  Lịch Sân
                </div>
                {timeSlots.map(slot => (
                  <div key={slot.startTime} className="p-4 border-r border-white/10 text-center font-black text-[11px] tracking-tight flex items-center justify-center">
                    {slot.startTime}
                  </div>
                ))}
              </div>

              {/* Court Rows */}
              {COURTS.map((court) => (
                <div key={court.id} className="grid grid-cols-[140px_repeat(18,1fr)] border-b-2 border-black/10 last:border-0 group">
                  <div className="p-6 border-r-4 border-black bg-neutral-100 font-black text-sm sticky left-0 z-20 group-hover:bg-black group-hover:text-white transition-colors flex items-center justify-center">
                    {court.name}
                  </div>
                  {timeSlots.map(slot => {
                    const booked = isBooked(court.id, slot.startTime);
                    const selected = isSelected(court.id, slot.startTime);
                    const past = isPast(slot.startTime);

                    return (
                      <button
                        key={`${court.id}-${slot.startTime}`}
                        disabled={booked || past}
                        onClick={() => toggleSlot(court.id, slot.startTime, slot.endTime)}
                        style={past && !booked ? pastPatternStyle : {}}
                        className={cn(
                          "h-24 border-r border-black/5 transition-all flex flex-col items-center justify-center relative outline-none",
                          booked && "bg-red-600 text-white cursor-not-allowed",
                          selected && "bg-dole-orange text-white z-10 scale-[1.02] shadow-2xl",
                          !booked && !selected && !past && "hover:bg-neutral-50 bg-white",
                          past && !booked && "cursor-not-allowed"
                        )}
                      >
                        {booked ? (
                          <div className="flex flex-col items-center scale-90">
                            <span className="text-[10px] font-black uppercase leading-tight mb-1">ĐÃ ĐẶT</span>
                            <div className="w-6 h-0.5 bg-white/40" />
                          </div>
                        ) : selected ? (
                          <Check size={24} strokeWidth={4} />
                        ) : past ? (
                          <div className="flex flex-col items-center opacity-30">
                            <Clock size={16} className="mb-1" />
                            <span className="text-[8px] font-black uppercase">Expired</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-black uppercase text-black/20 mb-1">Chọn</span>
                            <span className="text-[9px] font-bold text-dole-orange">{getPriceForSlot(slot.startTime) / 1000}K</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Summary Bar */}
      {selectedSlots.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-8 border-black p-8 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom duration-500">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase italic tracking-[0.3em] text-dole-orange mb-2 block">Cấu hình lịch đặt của bạn</span>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black italic tracking-tighter text-black">
                  {formatPrice(totalPrice)}
                </span>
                <span className="text-sm font-black opacity-30 uppercase tracking-[0.2em]">/ {selectedSlots.length} GIỜ TRẢI NGHIỆM</span>
              </div>
            </div>

            <button 
              onClick={() => onContinue(selectedSlots, selectedDate, totalPrice)}
              className="w-full md:w-auto px-16 py-6 bg-black text-white font-black uppercase italic tracking-widest text-xl hover:bg-dole-orange transition-all shadow-[15px_15px_0px_0px_rgba(255,95,0,1)] hover:shadow-none active:translate-x-2 active:translate-y-2"
            >
              TIẾP TỤC XÁC NHẬN →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingGrid;
