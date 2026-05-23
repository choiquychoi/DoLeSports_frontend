import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Coffee, Wallet, ShoppingBag, CheckCircle2 } from 'lucide-react';

const CourtFeatures = () => {
  const features = [
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "03 SÂN CẦU LÔNG ĐẠT CHUẨN",
      description: "Mặt sân sạch, độ bám tốt, dễ di chuyển. Phù hợp cho cả đánh đơn và đánh đôi chuyên nghiệp."
    },
    {
      icon: <Coffee className="w-10 h-10" />,
      title: "KHU VỰC NGHỈ NGƠI",
      description: "Ghế ngồi rộng rãi, thoáng mát. Nơi lý tưởng để hồi sức và giao lưu sau những pha cầu căng thẳng."
    },
    {
      icon: <Wallet className="w-10 h-10" />,
      title: "CHI PHÍ HỢP LÝ",
      description: "Mức giá cực kỳ cạnh tranh, phù hợp cho học sinh, sinh viên và dân văn phòng chơi thường xuyên."
    },
    {
      icon: <ShoppingBag className="w-10 h-10" />,
      title: "TIỆN ÍCH ĐI KÈM",
      description: "Dịch vụ thuê vợt, Pro Shop cung cấp phụ kiện chính hãng ngay tại sân. Trà đá, gửi xe miễn phí."
    }
  ];

  return (
    <section className="bg-white text-black py-24 md:py-32 overflow-hidden border-b-4 border-dole-orange">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Left Side: Text Story */}
          <div className="lg:w-1/2 space-y-10">
            <div>
              <span className="inline-block px-3 py-1 bg-dole-orange text-white text-[9px] font-black uppercase tracking-[0.4em] mb-6">
                The Experience
              </span>
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
                MỘT BUỔI ĐÁNH CẦU <br />
                TẠI ĐỖ LÊ SPORT <br />
                <span className="text-dole-orange">CÓ GÌ?</span>
              </h2>
              <p className="text-xl md:text-2xl font-black italic text-black/40 border-l-4 border-dole-orange pl-6 mb-8 uppercase">
                Đến là mê – Đánh là ghiền!
              </p>
              <p className="text-black/60 font-bold leading-relaxed uppercase text-sm tracking-tight">
                NẾU BẠN ĐANG TÌM MỘT NƠI ĐÁNH CẦU LÔNG THOẢI MÁI – TIỆN NGHI – GIÁ HỢP LÝ THÌ SÂN CẦU LÔNG ĐỖ LÊ CHÍNH LÀ ĐIỂM HẸN LÝ TƯỞNG CHO BẠN VÀ HỘI BẠN BÈ.
              </p>
            </div>

            <div className="p-8 border-2 border-black/10 bg-neutral-50 shadow-[10px_10px_0px_0px_rgba(255,95,0,0.1)]">
                <h4 className="font-black text-dole-orange mb-4 flex items-center gap-2 tracking-widest text-xs">
                    <CheckCircle2 size={16} /> CAM KẾT CHẤT LƯỢNG
                </h4>
                <p className="text-xs font-bold text-black/40 leading-relaxed uppercase">
                    KHÔNG CHỈ LÀ NƠI TẬP LUYỆN, ĐÂY CÒN LÀ KHÔNG GIAN KẾT NỐI ĐAM MÊ, XẢ STRESS SAU GIỜ HỌC VÀ LÀM VIỆC.
                </p>
            </div>
          </div>

          {/* Right Side: Features Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 border-2 border-black/10 hover:border-dole-orange hover:bg-neutral-50 transition-all duration-300 flex flex-col justify-between aspect-square md:aspect-auto"
              >
                <div className="text-dole-orange mb-8 group-hover:scale-110 transition-transform origin-left">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4 leading-none">
                    {f.title}
                  </h3>
                  <p className="text-xs font-bold text-black/40 uppercase tracking-tight leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Call to action text */}
        <div className="mt-20 pt-20 border-t border-black/5 text-center">
             <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-[0.2em]">
                VÀO SÂN LÀ <span className="text-dole-orange">MÊ</span>, RA SÂN LÀ <span className="text-dole-orange">KHỎE!</span>
             </h3>
        </div>
      </div>
    </section>
  );
};

export default CourtFeatures;
