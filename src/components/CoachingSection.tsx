import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Zap, Target, ScreenShareOff, Sparkles, MessageCircle } from 'lucide-react';

const CoachingSection = () => {
  return (
    <section className="py-24 bg-neutral-50 text-black border-b-4 border-dole-orange overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-dole-orange text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6">
              Academy Summer 2026
            </span>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
              LỚP CẦU LÔNG <br /> <span className="text-black/20">TUYỂN SINH</span>
            </h2>
            <p className="text-xl md:text-3xl font-black italic text-black/60 mb-6 uppercase tracking-tight">
                Năng động — Tự tin — Bứt phá
            </p>
            <div className="p-6 border-l-4 border-dole-orange bg-white shadow-sm inline-block">
                <p className="text-dole-orange font-black uppercase tracking-widest text-sm mb-2">Học thử miễn phí</p>
                <p className="text-black/60 font-bold uppercase text-xs">Trải nghiệm 01 buổi tập luyện chuyên nghiệp cùng HLV</p>
            </div>
          </div>

          <div className="bg-white text-black p-8 border-4 border-black shadow-[15px_15px_0px_0px_rgba(255,95,0,1)]">
             <p className="font-black uppercase text-[10px] tracking-widest text-black/40 mb-2">Khai giảng dự kiến</p>
             <p className="text-4xl font-black italic tracking-tighter mb-4">25.05.2026</p>
             <div className="h-1 w-full bg-black/10 mb-4" />
             <p className="font-black uppercase text-[10px] tracking-widest">Thời gian học linh hoạt</p>
             <p className="text-lg font-black italic">SÁNG - CHIỀU - TỐI</p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Zap />, title: "Rèn luyện sức khỏe", desc: "Tăng thể lực, dẻo dai, nhanh nhẹn vượt trội." },
            { icon: <Target />, title: "Kỹ thuật bài bản", desc: "Học đúng kỹ thuật từ đầu cùng giáo án chuyên sâu." },
            { icon: <GraduationCap />, title: "Mọi trình độ", desc: "Phù hợp cho cả người mới bắt đầu và nâng cao." },
            { icon: <ScreenShareOff />, title: "Dành cho bé", desc: "Giảm thời gian màn hình, phát triển chiều cao & kỷ luật." },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border-2 border-black/5 bg-white hover:border-dole-orange transition-all shadow-sm"
            >
              <div className="text-dole-orange mb-6 w-10 h-10">{item.icon}</div>
              <h3 className="text-lg font-black uppercase italic mb-3 tracking-tighter">{item.title}</h3>
              <p className="text-[10px] font-bold text-black/40 uppercase leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 flex flex-col items-center text-center">
            <h4 className="text-2xl md:text-4xl font-black uppercase italic tracking-[0.2em] mb-10">
                VẬN ĐỘNG HÔM NAY — <span className="text-dole-orange">KHỎE MẠNH</span> MAI SAU
            </h4>
            <a 
              href="https://zalo.me/0928662339" 
              target="_blank"
              className="group flex items-center gap-4 bg-black text-white px-12 py-5 font-black uppercase italic tracking-widest text-lg hover:bg-dole-orange transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
            >
              <MessageCircle className="w-6 h-6" />
              Đăng ký tư vấn qua Zalo
            </a>
        </div>

      </div>
    </section>
  );
};

export default CoachingSection;
