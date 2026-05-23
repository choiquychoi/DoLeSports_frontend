import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { GraduationCap, Zap, Target, ScreenShareOff, MessageCircle, CheckCircle2, Star, Users } from 'lucide-react';
import QuickContact from '../components/QuickContact';
import AcademyHero from '../components/AcademyHero';
import api from '@/lib/axios';
import { BRAND_CONFIG } from '@/lib/config';

const CoachingLanding: React.FC = () => {
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await api.get('/contact');
        setContact(data);
      } catch (error) {
        console.error('Error fetching Coaching contact:', error);
      }
    };
    fetchContact();
  }, []);

  const phone = contact?.phone || BRAND_CONFIG.contact.phone;
  const address = contact?.address || BRAND_CONFIG.contact.address;
  const zalo = contact?.socialLinks?.zalo || BRAND_CONFIG.contact.zalo;

  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Học Viện Cầu Lông ĐỖ LÊ SPORT",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "Dĩ An",
      "addressRegion": "Bình Dương",
      "addressCountry": "VN"
    },
    "telephone": phone,
    "url": window.location.origin + "/hoc-cau-long",
    "description": "Lớp học cầu lông hè 2026 tại Dĩ An cho bé và người lớn.",
    "openingHours": "Mo-Su 05:00-23:00"
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO 
        title="Lớp Học Cầu Lông Hè 2026 | ĐỖ LÊ SPORT Academy"
        description="Tuyển sinh lớp cầu lông hè 2026 tại Dĩ An. Đào tạo kỹ thuật bài bản từ cơ bản đến nâng cao cho bé và người lớn. Học thử 1 buổi miễn phí!"
        keywords="học cầu lông dĩ an, lớp cầu lông cho bé, học cầu lông người lớn, hlv cầu lông dĩ an, đỗ lê sport"
        locationSchema={locationSchema}
      />
      <Navbar />
      
      <main>
        {/* 1. HERO - ATTENTION */}
        <AcademyHero />

        {/* PARENT MESSAGE SECTION */}
        <section className="py-20 bg-black text-white overflow-hidden border-b-4 border-dole-orange">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight mb-8">
                            BA MẸ ƠI, HÈ NÀY <br /> <span className="text-dole-orange">HÃY ĐỂ CON VẬN ĐỘNG!</span>
                        </h2>
                        <div className="space-y-6 text-zinc-400 font-bold uppercase text-sm leading-relaxed">
                            <p>Ba mẹ nào muốn hè này con bớt điện thoại, vận động nhiều hơn và khỏe mạnh hơn thì có thể tham khảo lớp cầu lông bên em ❤️</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                                <div className="flex items-center gap-3 border-l-2 border-dole-orange pl-4 bg-zinc-900 py-3 text-xs font-black uppercase">✔ BÉ MỚI BẮT ĐẦU</div>
                                <div className="flex items-center gap-3 border-l-2 border-dole-orange pl-4 bg-zinc-900 py-3 text-xs font-black uppercase">✔ BÉ MUỐN TĂNG THỂ LỰC</div>
                                <div className="flex items-center gap-3 border-l-2 border-dole-orange pl-4 bg-zinc-900 py-3 text-xs font-black uppercase">✔ MÔI TRƯỜNG VUI VẺ</div>
                            </div>
                            <p className="text-dole-orange italic font-black">"Tụi em hướng dẫn từ cơ bản, theo sát từng bé để các con vừa học vừa chơi, không áp lực ✨"</p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-8 border-4 border-white relative bg-zinc-950">
                        <div className="absolute -top-6 -left-6 bg-dole-orange text-white px-6 py-2 font-black italic uppercase text-[10px] tracking-widest shadow-lg">Note from Coach</div>
                        <p className="text-lg md:text-2xl font-black italic tracking-tight leading-relaxed">
                            "MỤC TIÊU CỦA CHÚNG TÔI LÀ XÂY DỰNG MỘT MÙA HÈ Ý NGHĨA, NƠI CÁC CON KHÔNG CHỈ GIỎI KỸ THUẬT MÀ CÒN RÈN LUYỆN ĐƯỢC TÍNH KỶ LUẬT VÀ SỰ TỰ TIN."
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* 2. SOCIAL PROOF */}
        <section className="py-16 bg-white border-b-2 border-black text-black">
          <div className="container mx-auto px-6 text-black">
            <div className="flex flex-wrap justify-between items-center gap-10">
              <div className="flex items-center gap-4 text-black">
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border-2 border-black font-black text-xl italic">10+</div>
                <p className="font-black uppercase text-[10px] tracking-widest text-black/40 leading-none text-black">HLV CHUYÊN NGHIỆP <br />CÓ BẰNG CẤP</p>
              </div>
              <div className="flex items-center gap-4 text-black">
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border-2 border-black font-black text-xl italic">500+</div>
                <p className="font-black uppercase text-[10px] tracking-widest text-black/40 leading-none text-black">HỌC VIÊN ĐÃ <br />TỐT NGHIỆP</p>
              </div>
              <div className="flex items-center gap-4 text-black">
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center border-2 border-black font-black text-xl italic">100%</div>
                <p className="font-black uppercase text-[10px] tracking-widest text-black/40 leading-none text-black">CAM KẾT <br />TIẾN BỘ</p>
              </div>
              <div className="flex items-center gap-2 text-dole-orange">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                <span className="ml-2 font-black text-xs text-black italic">4.9/5 RATING</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES & BENEFITS - INTEREST */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">GIÁ TRỊ <span className="text-dole-orange">KHÓA HỌC</span></h2>
              <p className="text-black/40 font-black uppercase tracking-widest text-xs">CHÚNG TÔI XÂY DỰNG NỀN TẢNG VỮNG CHẮC</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 border-4 border-black bg-neutral-50 relative overflow-hidden group">
                <Zap className="absolute -top-4 -right-4 w-32 h-32 text-black/5 group-hover:text-dole-orange/10 transition-colors" />
                <h3 className="text-3xl font-black italic mb-6 relative z-10">RÈN LUYỆN SỨC KHỎE</h3>
                <p className="font-bold text-black/60 uppercase text-sm leading-relaxed relative z-10">Tăng thể lực, độ dẻo dai và khả năng phản xạ nhanh nhẹn. Giúp bé phát triển chiều cao và sự tự tin trong giao tiếp.</p>
              </div>
              <div className="p-10 border-4 border-black bg-neutral-50 relative overflow-hidden group">
                <Target className="absolute -top-4 -right-4 w-32 h-32 text-black/5 group-hover:text-dole-orange/10 transition-colors" />
                <h3 className="text-3xl font-black italic mb-6 relative z-10">KỸ THUẬT BÀI BẢN</h3>
                <p className="font-bold text-black/60 uppercase text-sm leading-relaxed relative z-10">Học đúng kỹ thuật cầm vợt, di chuyển bộ chân và các cú đánh từ đầu. Tránh chấn thương và tiến bộ nhanh chóng.</p>
              </div>
              <div className="p-10 border-4 border-black bg-neutral-50 relative overflow-hidden group">
                <Users className="absolute -top-4 -right-4 w-32 h-32 text-black/5 group-hover:text-dole-orange/10 transition-colors" />
                <h3 className="text-3xl font-black italic mb-6 relative z-10">MÔI TRƯỜNG NĂNG ĐỘNG</h3>
                <p className="font-bold text-black/60 uppercase text-sm leading-relaxed relative z-10">Không khí lớp học vui vẻ, thân thiện nhưng vẫn giữ tính kỷ luật cao. Giúp kết nối đam mê và xả stress cực tốt.</p>
              </div>
              <div className="p-10 border-4 border-black bg-neutral-50 relative overflow-hidden group">
                <ScreenShareOff className="absolute -top-4 -right-4 w-32 h-32 text-black/5 group-hover:text-dole-orange/10 transition-colors" />
                <h3 className="text-3xl font-black italic mb-6 relative z-10">GIẢM THỜI GIAN MÀN HÌNH</h3>
                <p className="font-bold text-black/60 uppercase text-sm leading-relaxed relative z-10 text-dole-orange italic">❤️ Đặc biệt dành cho bé: Giúp trẻ rời xa điện thoại, ipad để hòa mình vào các hoạt động thể chất lành mạnh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PRICE & OFFERS - DESIRE */}
        <section className="py-24 bg-neutral-100 text-black border-y-8 border-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl text-black">
                <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">HỌC PHÍ <br /><span className="text-dole-orange">ƯU ĐÃI</span></h2>
                <p className="text-black/40 font-bold uppercase text-sm tracking-widest leading-relaxed">KHAI GIẢNG DỰ KIẾN: 25/05/2026. NHẬN BÉ TỪ 6 TUỔI TRỞ LÊN. LỚP CHO NGƯỜI MỚI VÀ NÂNG CAO.</p>
              </div>
              <div className="p-8 border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-dole-orange uppercase tracking-[0.2em] mb-2 text-xs">Giờ học linh hoạt</p>
                <p className="text-2xl font-black italic uppercase">Sáng — Chiều — Tối</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-12 border-4 border-black bg-white text-black flex flex-col justify-between shadow-[15px_15px_0px_0px_rgba(255,95,0,1)]">
                <div>
                  <h3 className="text-3xl font-black italic mb-2">KHÓA CHO BÉ</h3>
                  <p className="text-dole-orange font-black uppercase text-[10px] tracking-widest mb-10">TỪ 6 - 15 TUỔI</p>
                  <p className="text-5xl font-black italic tracking-tighter mb-4">800K<span className="text-xl">/THÁNG</span></p>
                  <p className="text-xs font-bold text-black/40 uppercase mb-10">* Bao gồm sân tập và cầu tập</p>
                </div>
                <a href={`https://zalo.me/${zalo.replace(/\s/g, '')}`} target="_blank" className="w-full py-5 bg-black text-white text-center font-black uppercase italic tracking-widest text-xs hover:bg-dole-orange transition-colors">NHẬN TƯ VẤN NGAY</a>
              </div>
              <div className="p-12 border-4 border-black bg-black text-white flex flex-col justify-between shadow-[15px_15px_0px_0px_rgba(255,255,255,0.1)]">
                <div>
                  <h3 className="text-3xl font-black italic mb-2">NGƯỜI LỚN</h3>
                  <p className="text-dole-orange font-black uppercase text-[10px] tracking-widest mb-10">MỌI TRÌNH ĐỘ</p>
                  <p className="text-5xl font-black italic tracking-tighter mb-4">1.2TR<span className="text-xl">/THÁNG</span></p>
                  <p className="text-xs font-bold text-white/40 uppercase mb-10">* Giáo án cá nhân hóa theo mục tiêu</p>
                </div>
                <a href={`https://zalo.me/${zalo.replace(/\s/g, '')}`} target="_blank" className="w-full py-5 bg-dole-orange text-white text-center font-black uppercase italic tracking-widest text-xs hover:bg-white hover:text-black transition-colors border-2 border-dole-orange">ĐĂNG KÝ NGAY</a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ACTION - LEAD FORM */}
        <section className="py-24 bg-white border-b-2 border-black">
            <div className="container mx-auto px-6 max-w-2xl text-center text-black">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-8" />
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-8 text-black">TRẢI NGHIỆM <br /> <span className="text-dole-orange text-black/20">MIỄN PHÍ</span></h2>
                <p className="text-black/60 font-bold uppercase text-sm mb-12 leading-relaxed">
                    CHÚNG TÔI TẶNG BẠN 01 BUỔI HỌC THỬ ĐỂ CẢM NHẬN KHÔNG KHÍ VÀ CHẤT LƯỢNG ĐÀO TẠO. ĐỪNG CHẦN CHỪ, SỐ LƯỢNG CÓ HẠN!
                </p>
                <div className="space-y-4 text-black">
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-4 w-full bg-black text-white py-6 font-black uppercase italic text-lg tracking-widest hover:bg-dole-orange transition-all shadow-[12px_12px_0px_0px_rgba(255,95,0,1)] hover:shadow-none active:translate-x-2 active:translate-y-2">
                        GỌI ĐĂNG KÝ: {phone}
                    </a>
                    <div className="bg-amber-50 border-2 border-amber-200 p-4 inline-block w-full text-center">
                        <p className="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em]">⚠️ SỐ LƯỢNG MỖI LỚP GIỚI HẠN ĐỂ ĐẢM BẢO CHẤT LƯỢNG HƯỚNG DẪN CHO CÁC BÉ</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 6. FAQ & LOCATION */}
        <section className="py-24 bg-neutral-50 border-b-2 border-black text-black">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="text-black">
                <h3 className="text-3xl font-black uppercase italic mb-10 tracking-tighter text-black">CÂU HỎI <span className="text-dole-orange">PHỔ BIẾN</span></h3>
                <div className="space-y-6">
                  {[
                    { q: "Có cần mang theo vợt khi học thử không?", a: "Shop hỗ trợ cho mượn vợt miễn phí trong buổi học thử đầu tiên." },
                    { q: "Một lớp thường có bao nhiêu học viên?", a: "Chúng tôi giới hạn sĩ số để đảm bảo HLV có thể kèm cặp sát sao nhất." },
                    { q: "Lịch học có thể thay đổi linh hoạt không?", a: "Có, bạn có thể trao đổi với HLV để sắp xếp bù buổi nếu có việc bận." }
                  ].map((faq, i) => (
                    <div key={i} className="border-b-2 border-black/5 pb-6">
                      <p className="font-black uppercase text-xs mb-2 tracking-tight text-black">{faq.q}</p>
                      <p className="text-[11px] font-bold text-black/50 uppercase leading-relaxed text-black/40">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-black">
                <h3 className="text-3xl font-black uppercase italic mb-10 tracking-tighter text-black">ĐỊA ĐIỂM <span className="text-dole-orange">TẬP LUYỆN</span></h3>
                <div className="p-6 border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                   <p className="font-black text-lg mb-2 italic">{contact?.companyName || BRAND_CONFIG.name}</p>
                   <p className="font-bold text-black/60 uppercase text-xs mb-6 tracking-widest">{address}</p>
                   <div className="aspect-video bg-neutral-200 border-2 border-black overflow-hidden">
                      <iframe 
                        src={contact?.mapUrl || BRAND_CONFIG.contact.mapUrl} 
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location"
                        className="w-full h-full"
                      ></iframe>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <QuickContact />
    </div>
  );
}

export default CoachingLanding;
