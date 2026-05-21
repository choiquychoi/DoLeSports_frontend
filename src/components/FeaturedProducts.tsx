import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  mainImage: string;
  price: number;
  salePrice?: number;
  category: string;
  brand: string;
  isFeatured: boolean;
}

import api from '@/lib/axios';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/products?isFeatured=true&limit=20');
        setProducts(data && Array.isArray(data.products) ? data.products : []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="py-32 text-center bg-white">
      <div className="animate-spin h-10 w-10 border-4 border-black border-t-dole-orange mx-auto mb-4" />
      <span className="font-black uppercase tracking-[0.3em] text-[10px]">Loading Elite Selection...</span>
    </div>
  );

  const productList = Array.isArray(products) ? products : [];

  return (
    <section className="py-32 bg-white overflow-hidden border-b-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-dole-orange text-white text-[9px] font-black uppercase tracking-[0.3em] mb-4">
              Premium Equipment
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none">
              SẢN PHẨM <span className="text-dole-orange italic">NỔI BẬT</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="feat-prev w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
              <span className="font-black">←</span>
            </button>
            <button className="feat-next w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
              <span className="font-black">→</span>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1.2}
          navigation={{
            nextEl: '.feat-next',
            prevEl: '.feat-prev',
          }}
          pagination={{ 
            clickable: true,
            el: '.feat-pagination',
            renderBullet: (index, className) => {
              return `<span class="${className} !w-full !h-1 !bg-black/10 !rounded-none !opacity-100 transition-all duration-300"></span>`;
            }
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!overflow-visible"
        >
          {productList.map((product) => {
            const hasSale = product.salePrice && product.salePrice > 0;
            const displayPrice = hasSale ? product.salePrice : product.price;
            const oldPrice = hasSale ? product.price : null;
            const discount = oldPrice ? Math.round(((oldPrice - (displayPrice || 0)) / oldPrice) * 100) : 0;

            return (
              <SwiperSlide key={product._id} className="bg-white group/slide">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative p-6 h-full flex flex-col border-2 border-black hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                >
                  <Link to={`/product/${product.slug}`} className="flex-1 flex flex-col">
                    {/* Image Area - Bỏ Grayscale */}
                    <div className="relative aspect-square mb-10 overflow-hidden flex items-center justify-center bg-zinc-50 border border-black/5">
                      <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className="w-[85%] h-[85%] object-contain transition-transform duration-500 group-hover/slide:scale-110" 
                      />
                      
                      {discount > 0 && (
                        <div className="absolute top-0 left-0 bg-black text-white font-black px-3 py-1 text-[10px] uppercase tracking-tighter">
                          -{discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Info Area */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-black/40 tracking-widest">
                          {product.brand}
                        </span>
                        <div className="w-8 h-[1px] bg-black/20" />
                      </div>
                      
                      <h3 className="text-lg font-black uppercase tracking-tighter text-black line-clamp-2 leading-none group-hover/slide:text-dole-orange transition-colors">
                        {product.name}
                      </h3>

                      <div className="pt-4 flex items-end justify-between">
                        <div className="flex flex-col">
                          {oldPrice && (
                            <span className="text-[10px] text-black/30 line-through font-bold uppercase tracking-widest">
                              {oldPrice.toLocaleString('vi-VN')}₫
                            </span>
                          )}
                          <span className="text-2xl font-black text-dole-orange tracking-tighter leading-none">
                            {displayPrice?.toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                        
                        <div className="w-10 h-10 bg-black text-white flex items-center justify-center group-hover/slide:bg-dole-orange transition-colors">
                          <ShoppingCart size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        
        {/* Pagination Bar */}
        <div className="mt-16 h-1 bg-black/5 w-full">
          <div className="feat-pagination !relative !bottom-0 !left-0 !w-full !flex"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .feat-pagination .swiper-pagination-bullet {
          margin: 0 !important;
          flex: 1;
          height: 4px !important;
          background: transparent !important;
        }
        .feat-pagination .swiper-pagination-bullet-active {
          background: #FF5F00 !important;
        }
      `}} />
    </section>
  );
};

export default FeaturedProducts;
