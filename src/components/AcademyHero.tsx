import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, GraduationCap } from 'lucide-react';
import academi1 from '@/assets/academi/academi1.jpg';
import academi2 from '@/assets/academi/academi2.jpg';
import academi3 from '@/assets/academi/academi3.jpg';
import academi4 from '@/assets/academi/academi4.jpg';
import academi5 from '@/assets/academi/academi5.jpg';
import api from '@/lib/axios';
import { BRAND_CONFIG } from '../lib/config';

const ACADEMY_IMAGES = [
  { url: academi5, alt: 'Học viện Đỗ Lê 1' },
  { url: academi2, alt: 'Học viện Đỗ Lê 2' },
  { url: academi3, alt: 'Học viện Đỗ Lê 3' },
  { url: academi4, alt: 'Học viện Đỗ Lê 4' },
];

const AcademyHero = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await api.get('/contact');
        setContact(data);
      } catch (error) {
        console.error('Error fetching Academy contact:', error);
      }
    };
    fetchContact();
  }, []);

  const phone = contact?.phone || BRAND_CONFIG.contact.phone;

  const ImageFrame = ({ img, isMain = false }: { img: any; isMain?: boolean }) => (
    <div 
      className={`relative group cursor-pointer overflow-hidden border-2 border-black bg-neutral-900 ${isMain ? 'w-full md:w-2/3 aspect-[4/3] md:aspect-auto' : 'aspect-square md:aspect-auto'}`}
      onClick={() => setSelectedImage(img.url)}
    >
      {/* Blurred background */}
      <div className="absolute inset-0 z-0">
        <img src={img.url} alt="" className="w-full h-full object-cover blur-2xl opacity-40 scale-110" />
      </div>
      
      {/* Main Image - NO CROP */}
      <img 
        src={img.url} 
        alt={img.alt} 
        className="relative z-10 w-full h-full object-contain transition-all duration-700 group-hover:scale-105" 
      />
      
      <div className="absolute inset-0 z-20 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Maximize2 className="text-white w-10 h-10" />
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/30 z-20" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/30 z-20" />

      {isMain && (
        <div className="absolute bottom-6 left-6 z-30 bg-black text-white px-4 py-2 font-black text-[10px] tracking-[0.3em] shadow-[5px_5px_0px_0px_#FF5F00]">
          01 // TRAINING SESSIONS
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white border-b-2 border-black pt-28 pb-12">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dole-orange text-white inline-flex items-center gap-2 px-4 py-1 font-black text-[10px] tracking-[0.4em] mb-4 shadow-[6px_6px_0px_0px_#000]"
          >
            <GraduationCap size={14} /> DOLE SPORT ACADEMY
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] text-black mb-8">
            NĂNG ĐỘNG <span className="text-dole-orange">—</span> TỰ TIN<br />
            <span className="text-dole-orange">BỨT PHÁ</span> CÙNG<br />
            CẦU LÔNG ĐỖ LÊ
          </h1>
          <p className="max-w-2xl text-lg font-bold text-black/60 uppercase tracking-tight mb-12 leading-tight">
            KHAI GIẢNG LỚP HÈ 2026 — VẬN ĐỘNG HÔM NAY, KHỎE MẠNH MAI SAU. 
            CHƯƠNG TRÌNH ĐÀO TẠO BÀI BẢN, TRẢI NGHIỆM 01 BUỔI HỌC THỬ MIỄN PHÍ.
          </p>

          <div className="flex flex-col md:flex-row gap-6 mb-16">
            <a 
              href="https://zalo.me/0928662339" 
              target="_blank"
              className="px-12 py-5 bg-black text-white font-black uppercase italic tracking-widest text-lg hover:bg-dole-orange transition-all shadow-[12px_12px_0px_0px_rgba(255,95,0,1)] hover:shadow-none active:translate-x-2 active:translate-y-2 text-center"
            >
              ĐĂNG KÝ HỌC THỬ
            </a>
            <a 
              href={`tel:${phone.replace(/\s/g, '')}`} 
              className="px-12 py-5 border-4 border-black font-black uppercase italic tracking-widest text-lg hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4"
            >
              TƯ VẤN: {phone}
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[550px]">
          <ImageFrame img={ACADEMY_IMAGES[0]} isMain />
          
          <div className="w-full md:w-1/3 grid grid-cols-2 md:grid-cols-1 gap-4">
            {ACADEMY_IMAGES.slice(1, 3).map((img, idx) => (
              <ImageFrame key={idx} img={img} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-2 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            {/* Mobile-Friendly Close Button */}
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-black/50 hover:bg-dole-orange w-12 h-12 flex items-center justify-center rounded-full transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={32} strokeWidth={3} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-h-[80vh] md:max-h-full border-2 md:border-4 border-white/20 overflow-hidden bg-zinc-900 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Fullscreen View" className="max-w-full max-h-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AcademyHero;
