import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Cầu lông',
      displayName: 'Vợt Cầu Lông',
      image: 'https://images.stockcake.com/public/5/7/4/574335f9-afed-4e4c-9bcc-5a374971eded_large/sunset-badminton-game-stockcake.jpg',
    },
    {
      id: 6,
      name: 'Quần áo',
      displayName: 'Quần áo Thể Thao',
      image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'Giày Thể Thao',
      displayName: 'Giày Thể Thao',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 5,
      name: 'Phụ Kiện',
      displayName: 'Phụ Kiện',
      image: 'https://vuagym.com/wp-content/uploads/2020/09/15-7-855x450-1.jpg',
    }
  ];

  return (
    <section className="py-32 bg-white border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-4 block">
              Essential Collections // 2026
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none">
              CHỌN <span className="text-vanguard-orange">THIẾT BỊ</span> CỦA BẠN
            </h2>
          </div>
          <Link to="/category/Cầu lông" className="font-black uppercase tracking-widest text-[10px] border-b-2 border-black pb-1 hover:text-vanguard-orange hover:border-vanguard-orange transition-all">
            Xem tất cả danh mục →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 30 }}
              className="group relative h-[450px] md:h-[550px] overflow-hidden border-2 border-black bg-white"
            >
              <Link to={`/category/${cat.name}`} className="block w-full h-full relative">
                {/* Background Image - Quay lại Grayscale nhưng tinh tế hơn */}
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale-[80%] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                
                {/* Dark Gradient Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
                  <span className="text-[40px] font-black text-white/10 group-hover:text-vanguard-orange/20 transition-colors leading-none tracking-tighter">
                    {idx + 1}
                  </span>
                  
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-vanguard-orange transition-colors">
                      {cat.displayName}
                    </h3>
                    <div className="w-12 h-1 bg-white group-hover:w-full group-hover:bg-vanguard-orange transition-all duration-300" />
                  </div>
                </div>

                {/* Hover Action */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white text-black px-6 py-3 font-black uppercase tracking-widest text-[10px] border-2 border-black">
                    Khám phá ngay
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
