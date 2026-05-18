import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle, Navigation, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '@/lib/axios';
import { motion } from 'framer-motion';

interface IContact {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  socialLinks: {
    facebook?: string;
    zalo?: string;
    tiktok?: string;
    instagram?: string;
  };
  seoTitle: string;
  seoDescription: string;
}

const Contact: React.FC = () => {
  const [contact, setContact] = useState<IContact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await api.get('/contact');
        setContact(data);
        if (data) {
          document.title = data.seoTitle || 'Liên hệ | Fox Sports';
        }
      } catch (error) {
        console.error('Lỗi tải thông tin liên hệ:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-black border-t-vanguard-orange animate-spin mb-4" />
      <span className="font-black text-[10px] uppercase tracking-[0.4em]">Establishing Connection...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-32 bg-white border-b-2 border-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
          <span className="text-[30vw] font-black uppercase leading-none tracking-tighter">CONTACT</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <span className="inline-block px-4 py-1.5 bg-black text-white text-[11px] font-black uppercase tracking-[0.4em] mb-8">
              GET IN TOUCH // 24/7
            </span>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none italic mb-8">
              GET IN <span className="text-vanguard-orange">TOUCH</span>
            </h1>
            <p className="text-black/40 max-w-2xl mx-auto font-black text-xs md:text-sm uppercase tracking-[0.3em] leading-relaxed">
              CHÚNG TÔI LUÔN SẴN SÀNG HỖ TRỢ BẠN TRONG MỌI TRẢI NGHIỆM THỂ THAO CAO CẤP.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Contact Information */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter italic">THÔNG TIN <span className="text-vanguard-orange">TRỰC TIẾP</span></h2>
              <div className="w-20 h-1.5 bg-black" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Hotline */}
              <a href={`tel:${contact?.phone}`} className="group p-10 border-2 border-black bg-white hover:bg-black transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-none">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-vanguard-orange border-2 border-black flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-white/40 block mb-1">HOTLINE HỖ TRỢ</span>
                    <p className="text-2xl font-black tracking-tighter group-hover:text-white">{contact?.phone}</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${contact?.email}`} className="group p-10 border-2 border-black bg-white hover:bg-black transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-none">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-black border-2 border-black flex items-center justify-center text-white shrink-0 group-hover:bg-vanguard-orange transition-colors">
                    <Mail size={28} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-white/40 block mb-1">EMAIL LIÊN HỆ</span>
                    <p className="text-lg font-black tracking-tighter truncate group-hover:text-white uppercase">{contact?.email}</p>
                  </div>
                </div>
              </a>

              {/* Social */}
              <div className="p-10 border-2 border-black bg-white space-y-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/40 block">MẠNG XÃ HỘI</span>
                <div className="flex flex-wrap gap-4">
                  {contact?.socialLinks.facebook && (
                    <a href={contact.socialLinks.facebook} target="_blank" className="px-6 py-4 bg-black text-white hover:bg-vanguard-orange transition-all font-black text-[10px] uppercase tracking-widest border-2 border-black">
                      FACEBOOK
                    </a>
                  )}
                  {contact?.socialLinks.zalo && (
                    <a href={`https://zalo.me/${contact.socialLinks.zalo}`} target="_blank" className="px-6 py-4 border-2 border-black font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                      ZALO CHAT
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Map & Address Detail */}
          <div className="lg:col-span-7 space-y-12">
             <div className="border-2 border-black p-4 bg-white shadow-[15px_15px_0px_0px_rgba(255,95,0,0.1)]">
                <div className="h-[400px] md:h-[550px] overflow-hidden border-2 border-black relative">
                  {contact?.mapUrl ? (
                    <iframe
                      src={contact.mapUrl}
                      className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-1000"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-50 flex items-center justify-center">
                      <span className="font-black text-[10px] uppercase tracking-[0.4em] text-black/20">Loading Tactical Map...</span>
                    </div>
                  )}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10 border-2 border-black bg-zinc-50">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-vanguard-orange" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/40">VỊ TRÍ CỬA HÀNG</span>
                   </div>
                   <p className="text-lg font-black uppercase leading-tight tracking-tighter">{contact?.address}</p>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <Clock size={18} className="text-vanguard-orange" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-black/40">GIỜ HOẠT ĐỘNG</span>
                   </div>
                   <p className="text-lg font-black uppercase leading-tight tracking-tighter">08:00 AM - 21:00 PM<br/>THỨ 2 - CHỦ NHẬT</p>
                </div>
             </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
