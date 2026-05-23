import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import { BRAND_CONFIG } from '../lib/config';

const CourtMaps = () => {
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await api.get('/contact');
        setContact(data);
      } catch (error) {
        console.error('Error fetching Maps contact:', error);
      }
    };
    fetchContact();
  }, []);

  const phone = contact?.phone || BRAND_CONFIG.contact.phone;
  const address = contact?.address || BRAND_CONFIG.contact.address;
  const zalo = contact?.socialLinks?.zalo || BRAND_CONFIG.contact.zalo;

  return (
    <section className="py-24 bg-white border-b-2 border-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left: Contact Info */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <div>
              <span className="text-dole-orange font-black uppercase text-[10px] tracking-[0.4em] mb-4 block text-left">Location & Contact</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-10 text-left">
                GHÉ THĂM <br /> <span className="text-black/20">TRỰC TIẾP</span>
              </h2>
              
              <address className="space-y-10 not-italic">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-black text-white shrink-0 flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-black/40 tracking-widest mb-1">Địa chỉ sân</p>
                    <p className="font-black uppercase text-sm leading-tight italic">{address}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-dole-orange text-white shrink-0 flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-black/40 tracking-widest mb-1">Hotline đặt sân</p>
                    <p className="font-black text-2xl tracking-tighter italic">{phone}</p>
                  </div>
                </div>
              </address>
            </div>

            <div className="mt-12 space-y-4">
              <a 
                href={`https://www.google.com/maps/dir//${encodeURIComponent(address)}`} 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-black text-white py-5 font-black uppercase italic text-xs tracking-widest hover:bg-dole-orange transition-all"
              >
                <Navigation size={16} /> Chỉ đường đến sân
              </a>
              <a 
                href={`https://zalo.me/${zalo.replace(/\s/g, '')}`} 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full border-4 border-black py-5 font-black uppercase italic text-xs tracking-widest hover:bg-black hover:text-white transition-all"
              >
                <MessageCircle size={16} /> Chat với chúng tôi
              </a>
            </div>
          </div>

          {/* Right: Embedded Map */}
          <div className="lg:w-2/3 min-h-[450px] border-4 border-black relative shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden bg-neutral-100">
            <iframe 
              src={contact?.mapUrl || BRAND_CONFIG.contact.mapUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Sân Đỗ Lê Sport Location"
              className="w-full h-full"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CourtMaps;
