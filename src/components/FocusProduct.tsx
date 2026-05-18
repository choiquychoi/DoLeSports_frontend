import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import api from '@/lib/axios';

interface Product {
  _id?: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  isFocus?: boolean;
}

interface HUDCalloutProps {
  label: string;
  style: React.CSSProperties;
  alignRight?: boolean;
}

const HUD_CALLOUTS = [
  { id: 1, label: "KHUNG KHÍ ĐỘNG HỌC", style: { top: "25%", left: "10%" } },
  { id: 2, label: "TRỤC CỨNG ỔN ĐỊNH", style: { top: "55%", right: "10%" }, alignRight: true },
  { id: 3, label: "PHỦ KIM LOẠI CAO CẤP", style: { bottom: "20%", left: "15%" } },
];

const HUDCallout = ({ label, style, alignRight = false }: HUDCalloutProps) => (
  <div className="absolute pointer-events-none z-20 hidden md:block" style={style}>
    <motion.div 
      initial={{ opacity: 0, x: alignRight ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`flex items-center gap-0 ${alignRight ? 'flex-row-reverse' : ''}`}
    >
      <div className="w-2 h-2 bg-black" />
      <div className="h-[1px] w-24 md:w-48 bg-black" />
      <div className="flex flex-col bg-white border-2 border-black px-4 py-2">
        <span className="text-[10px] font-black tracking-widest text-black whitespace-nowrap uppercase">
          {label}
        </span>
      </div>
    </motion.div>
  </div>
);

const FocusProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  useEffect(() => {
    const fetchFocusProduct = async () => {
      try {
        const { data } = await api.get('/products');
        const productList = data.products || data;
        const focus = Array.isArray(productList) ? productList.find((p: Product) => p.isFocus || p.name.includes('Youlong')) : null;
        
        if (focus) {
          setProduct({
            ...focus,
            name: 'Victor Thruster Ryuga Metallic',
            image: 'https://s3-api.n8-workshop.com/internbucket/products/1777341570807-495372463_3760049437475071_4813199914581734053_n.jpg'
          });
        } else {
          setProduct({
            name: 'Victor Thruster Ryuga Metallic',
            description: 'Đỉnh cao của sự tấn công. Được thiết kế với công nghệ phủ kim loại mang lại sức mạnh và sự ổn định chưa từng có trên mỗi cú đập.',
            image: 'https://s3-api.n8-workshop.com/internbucket/products/1777341570807-495372463_3760049437475071_4813199914581734053_n.jpg',
            price: 3450000
          });
        }
      } catch (error) {
        setProduct({
          name: 'Victor Thruster Ryuga Metallic',
          description: 'Đỉnh cao của sự tấn công. Được thiết kế với công nghệ phủ kim loại mang lại sức mạnh và sự ổn định chưa từng có trên mỗi cú đập.',
          image: 'https://s3-api.n8-workshop.com/internbucket/products/1777341570807-495372463_3760049437475071_4813199914581734053_n.jpg',
          price: 3450000
        });
      }
    };
    fetchFocusProduct();
  }, []);

  if (!product) return null;

  return (
    <section ref={sectionRef} className="relative w-full bg-white text-black overflow-hidden py-32 md:py-56 border-b-2 border-black">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
        <span className="text-[20vw] font-black uppercase leading-none tracking-tighter whitespace-nowrap">
          PERFORMANCE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px] max-w-[1400px] mx-auto relative z-10">
        {/* Image Side */}
        <div className="relative h-[500px] md:h-auto flex items-center justify-center p-8 md:p-12 order-2 lg:order-1">
          {HUD_CALLOUTS.map((callout) => (
            <HUDCallout key={callout.id} {...callout} />
          ))}

          <motion.div 
            style={{ rotate, scale }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-[80%] max-h-[80%] object-contain drop-shadow-[30px_30px_60px_rgba(0,0,0,0.1)]"
            />
            
            {/* Minimal Circle Decoration */}
            <div className="absolute inset-0 border-2 border-black/5 rounded-full scale-110 pointer-events-none" />
          </motion.div>
        </div>

        {/* Text Side */}
        <div className="flex items-center justify-center p-8 md:p-24 order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-6 mb-12">
              <span className="text-[10px] font-black text-vanguard-orange tracking-[0.4em] uppercase">Master Series // 2026</span>
              <div className="h-0.5 flex-1 bg-black/10" />
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black mb-10 uppercase tracking-tighter leading-[0.85]">
              {product.name}
            </h2>
            
            <p className="text-base md:text-lg text-black/60 mb-16 leading-relaxed font-bold uppercase tracking-tight">
              {product.description}
            </p>
            
            <div className="grid grid-cols-1 gap-8 mb-20">
              {[
                { label: "KHUNG VỢT", val: "KHÍ ĐỘNG HỌC" },
                { label: "LỐI ĐÁNH", val: "TẤN CÔNG TOÀN DIỆN" },
                { label: "TRỤC VỢT", val: "SIÊU CỨNG & ỔN ĐỊNH" }
              ].map((spec, i) => (
                <div key={i} className="flex justify-between items-center border-b-2 border-black/5 pb-4">
                  <span className="text-[10px] font-black text-black/40 tracking-widest uppercase">{spec.label}</span>
                  <span className="text-sm font-black text-black tracking-tight uppercase">{spec.val}</span>
                </div>
              ))}
            </div>
            
            <button className="group relative bg-black text-white px-16 py-7 font-black uppercase tracking-widest text-sm hover:bg-vanguard-orange transition-all duration-300 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              SỞ HỮU NGAY
              <span className="ml-4 inline-block group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Frame Decorations */}
      <div className="absolute top-12 left-12 w-24 h-0.5 bg-black opacity-10" />
      <div className="absolute top-12 left-12 w-0.5 h-24 bg-black opacity-10" />
      <div className="absolute bottom-12 right-12 w-24 h-0.5 bg-black opacity-10" />
      <div className="absolute bottom-12 right-12 w-0.5 h-24 bg-black opacity-10" />
    </section>
  );
};

export default FocusProduct;
