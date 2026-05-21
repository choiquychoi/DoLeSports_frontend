import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Facebook, X, Plus, MessagesSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/axios';

interface IContact {
  phone: string;
  socialLinks: {
    facebook?: string;
    zalo?: string;
  };
}

const QuickContact: React.FC = () => {
  const [contact, setContact] = useState<IContact | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await api.get('/contact');
        setContact(data);
      } catch (error) {
        console.error('Lỗi lấy thông tin liên hệ nhanh:', error);
      }
    };
    fetchContact();
  }, []);

  if (!contact) return null;

  const phoneNoSpace = contact?.phone?.replace(/\s/g, '') || '';

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex flex-col gap-3 items-end mb-2"
          >
            {/* MESSENGER */}
            <motion.a 
              href={contact?.socialLinks?.facebook}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="bg-white border-2 border-black px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-all">
                CHAT MESSENGER
              </span>
              <div className="w-14 h-14 bg-[#0084FF] text-white flex items-center justify-center border-2 border-black hover:bg-black transition-colors">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.903 1.467 5.501 3.75 7.274V22l3.322-1.823a12.03 12.03 0 002.928.356c5.523 0 10-4.145 10-9.258S17.523 2 12 2zm1.2 12.4l-2.4-2.56-4.64 2.56 5.08-5.4 2.44 2.56 4.6-2.56-5.08 5.4z" />
                </svg>
              </div>
            </motion.a>

            {/* ZALO */}
            <motion.a 
              href={`https://zalo.me/${phoneNoSpace}`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 group"
            >
              <span className="bg-white border-2 border-black px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-all">
                CHAT ZALO
              </span>
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center border-2 border-black hover:bg-dole-orange transition-colors">
                <MessageCircle size={24} />
              </div>
            </motion.a>

            {/* HOTLINE */}
            <motion.a 
              href={`tel:${phoneNoSpace}`}
              className="flex items-center gap-4 group"
            >
              <span className="bg-white border-2 border-black px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-all">
                GỌI NGAY: {contact.phone}
              </span>
              <div className="w-14 h-14 bg-dole-orange text-white flex items-center justify-center border-2 border-black">
                <Phone size={24} className="animate-pulse" />
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 flex items-center justify-center border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${
          isOpen ? 'bg-black text-white' : 'bg-white text-black hover:bg-zinc-50'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessagesSquare size={24} />}
      </button>
    </div>
  );
};

export default QuickContact;
