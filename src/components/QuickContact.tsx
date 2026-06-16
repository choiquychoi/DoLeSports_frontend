import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import { BRAND_CONFIG } from '../lib/config';

const QuickContact = () => {
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await api.get('/contact');
        setContact(data);
      } catch (error) {
        console.error('Error fetching QuickContact:', error);
      }
    };
    fetchContact();
  }, []);

  const phone = contact?.phone || BRAND_CONFIG.contact.phone;
  const zalo = contact?.socialLinks?.zalo || BRAND_CONFIG.contact.zalo;
  const facebook = contact?.socialLinks?.facebook || BRAND_CONFIG.contact.facebook;

  return (
    <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Zalo Bubble */}
      <motion.a 
        href={`https://zalo.me/${zalo.replace(/\s/g, '')}`}
        target="_blank"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="pointer-events-auto w-14 h-14 bg-white border-4 border-black flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        title="Chat Zalo"
      >
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C6.48 3 2 7.02 2 12C2 14.9 3.5 17.5 6 19.1V22.5L9.5 20.6C10.3 20.9 11.1 21 12 21C17.52 21 22 16.98 22 12C22 7.02 17.52 3 12 3Z" fill="#0068FF" />
          <text x="12" y="11.5" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6.2" fontWeight="900" fontFamily="Arial, Helvetica, sans-serif" letterSpacing="-0.3px">zalo</text>
        </svg>
      </motion.a>

      {/* Phone Pill */}
      <motion.a 
        href={`tel:${phone.replace(/\s/g, '')}`}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="pointer-events-auto flex items-center gap-4 bg-black text-white px-6 py-4 border-2 border-dole-orange shadow-[10px_10px_0px_0px_rgba(255,95,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
      >
        <div className="bg-dole-orange p-2 group-hover:animate-bounce">
          <Phone size={18} className="text-white" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-dole-orange mb-1">Hotline 24/7</span>
          <span className="text-lg font-black italic tracking-tighter">{phone}</span>
        </div>
      </motion.a>

    </div>
  );
};

export default QuickContact;
