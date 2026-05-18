import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import hero_banner from '@/assets/hero_banner.jpg';
import api from '@/lib/axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroBanner = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await api.get('/banners');
        setBanners(data);
      } catch (error) {
        console.error('Lỗi khi tải banners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const defaultSlides = [
    {
      _id: 'default1',
      image: hero_banner,
      title: 'CHINH PHỤC ĐỈNH CAO',
      subtitle: 'Trang bị ngay những siêu phẩm cầu lông mới nhất 2026',
    }
  ];

  const slides = banners.length > 0 ? banners : defaultSlides;

  if (loading && banners.length === 0) return (
    <div className="w-full aspect-[16/7] md:aspect-[21/7] bg-white flex items-center justify-center border-b-2 border-black">
      <div className="w-10 h-10 border-4 border-black border-t-vanguard-orange animate-spin" />
    </div>
  );

  return (
    <section className="relative w-full bg-white border-b-2 border-black overflow-hidden pt-20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        slidesPerView={1}
        loop={slides.length > 1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.hero-next-v2',
          prevEl: '.hero-prev-v2',
        }}
        pagination={{ 
          clickable: true,
          el: '.hero-pagination-v2',
          renderBullet: (index, className) => {
            return `<span class="${className} !w-16 !h-1 !bg-black/20 !rounded-none !opacity-100 transition-all duration-300"></span>`;
          }
        }}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            {({ isActive }) => (
              <div className="w-full relative aspect-[16/9] md:aspect-[21/7] min-h-[400px] md:min-h-[600px] flex items-center">
                
                {/* 1. Background Image - LUÔN RÕ NÉT (100% OPACITY) */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover brightness-[0.95]"
                  />
                  {/* Lớp gradient cực kỳ mỏng bên trái để hỗ trợ đọc chữ, không làm trắng ảnh */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent" />
                </div>

                {/* 2. Content Container */}
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
                      className="bg-black text-white inline-block px-4 py-1 font-black text-[10px] tracking-[0.4em] mb-6 shadow-[6px_6px_0px_0px_rgba(255,95,0,1)]"
                    >
                      COLLECTION // 2026
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.3 }}
                    >
                      <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)] mb-8">
                        {slide.title}
                      </h1>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.4 }}
                      className="flex flex-col md:flex-row items-start md:items-center gap-8"
                    >
                      <p className="text-xs md:text-sm font-black text-black uppercase tracking-[0.2em] max-w-md leading-relaxed border-l-4 border-vanguard-orange pl-6 drop-shadow-[1px_1px_0px_rgba(255,255,255,0.5)]">
                        {slide.subtitle}
                      </p>
                      
                      <button className="group relative bg-black text-white px-10 py-5 font-black uppercase tracking-widest text-xs hover:bg-vanguard-orange transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                        SẮM NGAY
                        <span className="ml-3 inline-block group-hover:translate-x-2 transition-transform">→</span>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Navigation Controls */}
        <div className="absolute bottom-12 right-12 z-20 flex gap-4 hidden md:flex">
          <button className="hero-prev-v2 w-14 h-14 border-2 border-black bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-black text-xl">←</span>
          </button>
          <button className="hero-next-v2 w-14 h-14 border-2 border-black bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-black text-xl">→</span>
          </button>
        </div>

        {/* Custom Pagination Line */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-black/5 z-20">
          <div className="hero-pagination-v2 !relative !bottom-0 !left-0 !w-full !flex"></div>
        </div>
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-pagination-v2 .swiper-pagination-bullet {
          margin: 0 !important;
          flex: 1;
          height: 8px !important;
          background: transparent !important;
          border-radius: 0 !important;
        }
        .hero-pagination-v2 .swiper-pagination-bullet-active {
          background: #FF5F00 !important;
        }
      `}} />
    </section>
  );
};

export default HeroBanner;
