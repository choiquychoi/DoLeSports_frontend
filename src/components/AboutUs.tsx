import React from 'react';
import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Zap, Heart, Trophy, ArrowRight } from "lucide-react";
import storeImg from '@/assets/store.jpg';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '@/lib/config';

const AboutUs: React.FC = () => {
  const imageUrl = storeImg;

  const features = [
    {
      title: "TIÊU CHUẨN MỚI",
      desc: "ĐỊNH NGHĨA LẠI TRẢI NGHIỆM MUA SẮM THỂ THAO CAO CẤP.",
      color: "bg-dole-orange"
    },
    {
      title: "CHÍNH HÃNG 100%",
      desc: "CAM KẾT NGUỒN GỐC TUYỆT ĐỐI CỦA MỌI SẢN PHẨM.",
      color: "bg-black"
    },
    {
      title: "TƯ VẤN CHUYÊN SÂU",
      desc: "ĐỘI NGŨ AM HIỂU KỸ THUẬT VÀ HIỆU SUẤT THI ĐẤU.",
      color: "bg-dole-orange"
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Left Side: Visuals */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="group relative z-10 border-2 border-black p-4 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
                <motion.img 
                  src={imageUrl} 
                  alt="ĐỖ LÊ SPORT Store" 
                  whileHover={{ scale: 0.92 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-dole-orange text-white p-8 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] z-20">
                <span className="text-2xl font-black italic tracking-tighter leading-none block">THE NEW<br/>STANDARD</span>
              </div>
            </motion.div>

            {/* Background Decorations */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-black/5 -z-10" />
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 border-2 border-black text-black font-black uppercase text-[10px] tracking-[0.4em]">
                Elite Performance & Quality
              </span>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                {BRAND_CONFIG.slogan.split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-dole-orange">{BRAND_CONFIG.slogan.split(' ').slice(2).join(' ')}</span>
              </h2>
            </div>

            <div className="space-y-8 max-w-2xl">
              <p className="text-xl md:text-2xl text-black font-black italic leading-tight border-l-8 border-dole-orange pl-8">
                {BRAND_CONFIG.name} THIẾT LẬP MỘT TIÊU CHUẨN MỚI CHO CỘNG ĐỒNG YÊU CẦU LÔNG TẠI VIỆT NAM.
              </p>
              <p className="text-black/70 font-bold uppercase tracking-tight leading-relaxed">
                CHÚNG TÔI KHÔNG CHỈ CUNG CẤP NHỮNG TRANG THIẾT BỊ CHÍNH HÃNG TỪ CÁC THƯƠNG HIỆU HÀNG ĐẦU THẾ GIỚI, MÀ CÒN MANG ĐẾN MỘT HỆ SINH THÁI DỊCH VỤ CHUYÊN NGHIỆP, NƠI NIỀM ĐAM MÊ CỦA BẠN ĐƯỢC THẤU HIỂU VÀ NÂNG TẦM.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {features.map((f, i) => (
                <div key={i} className="space-y-4 group/item">
                  <div className={`w-12 h-1.5 ${f.color} transition-all duration-300 group-hover/item:w-full`} />
                  <h4 className="text-sm font-black uppercase tracking-widest text-black group-hover/item:text-dole-orange transition-colors">{f.title}</h4>
                  <p className="text-[10px] text-black/50 font-black leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-6 bg-black text-white px-12 py-6 font-black uppercase text-xs tracking-[0.2em] hover:bg-dole-orange transition-all duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 group"
              >
                Ghé thăm cửa hàng
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
