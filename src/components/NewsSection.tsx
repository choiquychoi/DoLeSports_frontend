import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";
import CONFIG from '@/lib/config';

interface NewsPost {
  _id: string;
  title: string;
  summary: string;
  thumbnail: string;
  createdAt: string;
  slug: string;
}

import api from '@/lib/axios';

const NewsSection = () => {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get('/posts?limit=3');
        setNews(data.posts || []);
      } catch (error) {
        console.error("Lỗi lấy tin tức:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="py-32 flex justify-center bg-white">
        <div className="animate-spin h-10 w-10 border-4 border-black border-t-dole-orange" />
      </div>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-4 block">
            Inside ĐỖ LÊ SPORT // Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none italic">
            TIN TỨC <span className="text-dole-orange">THẾ THAO</span>
          </h2>
          <div className="mt-8 w-24 h-1 bg-black" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border-2 border-black flex flex-col h-full bg-white hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              {/* Thumbnail - Bỏ Grayscale */}
              <div 
                onClick={() => window.location.href = `/news/${item.slug}`}
                className="relative aspect-video overflow-hidden cursor-pointer border-b-2 border-black"
              >
                <img 
                  src={item.thumbnail || 'https://images.unsplash.com/photo-1626224580175-66094142ce3a?q=80&w=600&auto=format&fit=crop'} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-white border-2 border-black px-3 py-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">
                    {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 flex flex-col flex-1">
                <h3 
                  onClick={() => window.location.href = `/news/${item.slug}`} 
                  className="text-xl font-black uppercase tracking-tighter text-black mb-6 group-hover:text-dole-orange transition-colors line-clamp-2 leading-none cursor-pointer"
                >
                  {item.title}
                </h3>
                
                <p className="text-[11px] font-bold uppercase text-black/50 leading-relaxed mb-8 line-clamp-3 tracking-tight">
                  {item.summary}
                </p>

                <div className="mt-auto">
                  <button 
                    onClick={() => window.location.href = `/news/${item.slug}`}
                    className="inline-flex items-center gap-4 font-black uppercase tracking-[0.2em] text-[10px] text-black hover:text-dole-orange transition-all group/btn"
                  >
                    Đọc chi tiết
                    <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

