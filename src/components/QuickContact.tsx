import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
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
        className="pointer-events-auto w-14 h-14 bg-white border-4 border-black flex items-center justify-center text-blue-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        <MessageCircle size={28} fill="currentColor" className="text-white" />
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
