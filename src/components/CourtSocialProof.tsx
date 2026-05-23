import React from 'react';
import { motion } from 'framer-motion';

const CourtSocialProof = () => {
  const stats = [
    { label: "Lượt đặt mỗi tháng", value: "800+" },
    { label: "Khách hàng tin tưởng", value: "500+" },
    { label: "Đánh giá 5 sao", value: "98%" },
    { label: "Phục vụ xuyên suốt", value: "05h-23h" },
  ];

  return (
    <section className="bg-neutral-50 py-16 border-b-2 border-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-3xl md:text-5xl font-black italic tracking-tighter text-dole-orange mb-2">{s.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/40">{s.label}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center items-center gap-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <span className="font-black italic text-2xl tracking-tighter">YONEX</span>
            <span className="font-black italic text-2xl tracking-tighter">VICTOR</span>
            <span className="font-black italic text-2xl tracking-tighter">LINING</span>
            <span className="font-black italic text-2xl tracking-tighter">Mizuno</span>
        </div>
      </div>
    </section>
  );
};

export default CourtSocialProof;
