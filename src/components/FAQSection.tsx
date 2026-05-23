import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      q: "SÂN CÓ CHO THUÊ VỢT VÀ GIÀY KHÔNG?",
      a: "Có, ĐỖ LÊ SPORT cung cấp dịch vụ thuê vợt và giày cầu lông chính hãng ngay tại quầy lễ tân. Ngoài ra chúng tôi còn bán sẵn cầu và nước uống."
    },
    {
      q: "TÔI CÓ THỂ HỦY LỊCH ĐÃ ĐẶT KHÔNG?",
      a: "Bạn có thể hủy hoặc dời lịch trước ít nhất 4 tiếng so với giờ bắt đầu. Vui lòng liên hệ hotline 0928.662.339 để được hỗ trợ nhanh nhất."
    },
    {
      q: "SÂN CÓ PHÒNG TẮM VÀ KHU VỰC THAY ĐỒ KHÔNG?",
      a: "Sân có đầy đủ hệ thống phòng tắm sạch sẽ, khu vực thay đồ và tủ để đồ an toàn cho quý khách."
    },
    {
      q: "CÓ CHỖ ĐẬU XE HƠI KHÔNG?",
      a: "ĐỖ LÊ SPORT có bãi đậu xe rộng rãi, an toàn và MIỄN PHÍ cho cả xe máy và ô tô ngay trước cổng sân."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white border-b-2 border-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 text-dole-orange mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4">
            GIẢI ĐÁP <span className="text-black/20">THẮC MẮC</span>
          </h2>
          <p className="font-bold text-black/40 uppercase text-[10px] tracking-[0.4em]">MỌI THỨ BẠN CẦN BIẾT</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-2 border-black bg-white overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
              >
                <span className="font-black uppercase italic text-sm md:text-lg tracking-tight leading-tight">{faq.q}</span>
                {openIndex === i ? <Minus className="shrink-0" /> : <Plus className="shrink-0" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-zinc-500 font-bold uppercase text-xs leading-relaxed border-t-2 border-black/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
