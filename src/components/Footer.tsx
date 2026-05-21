import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import CONFIG from '@/lib/config';
import logo from '@/assets/logo.jpg';
import { BRAND_CONFIG } from '@/lib/config';

interface IContact {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  socialLinks: {
    facebook?: string;
    zalo?: string;
    tiktok?: string;
    instagram?: string;
  };
}

import api from '@/lib/axios';

const Footer = () => {
  const [contact, setContact] = useState<IContact | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await api.get('/contact');
        setContact(data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin Footer:', error);
      }
    };
    fetchContact();
  }, []);

  return (
    <footer className="bg-black text-white pt-0">
      {/* Newsletter Section */}
      <div className="bg-zinc-900 border-b border-white/10 py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">
              ĐĂNG KÝ <span className="text-dole-orange">NEWSLETTER</span>
            </h3>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
              NHẬN THÔNG TIN ƯU ĐÃI SỚM NHẤT TỪ {contact?.companyName || BRAND_CONFIG.name}.
            </p>
          </div>
          <form className="flex w-full max-w-md border-2 border-white p-1 bg-black">
            <Input 
              type="email" 
              placeholder="EMAIL CỦA BẠN..." 
              className="h-12 border-none bg-transparent focus-visible:ring-0 text-white placeholder:text-zinc-600 text-xs font-bold tracking-widest uppercase"
            />
            <Button className="h-12 px-10 bg-white text-black hover:bg-dole-orange hover:text-white rounded-none font-black uppercase tracking-widest text-[10px] transition-all">
              GỬI NGAY
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col items-start order-1">
            <Link to="/" className="flex items-center gap-4 mb-8 group">
              <div className="w-16 h-16 overflow-hidden border-2 border-white shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)] group-hover:shadow-[5px_5px_0px_0px_rgba(255,95,0,1)] transition-all">
                <img 
                  src={logo} 
                  alt={`Logo ĐỖ LÊ SPORT`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black uppercase tracking-tighter text-dole-orange">
                  {BRAND_CONFIG.shortName}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white italic">
                  {BRAND_CONFIG.suffix}
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 text-[11px] font-bold uppercase leading-relaxed mb-10 tracking-tight">
              Hệ thống phân phối dụng cụ thể thao chuyên nghiệp hàng đầu. Chuyên cung cấp Vợt Cầu Lông, Giày và Phụ kiện chính hãng.
            </p>
            <div className="flex gap-4">
              {contact?.socialLinks?.facebook && (
                <a 
                  href={contact.socialLinks.facebook} 
                  target="_blank"
                  className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-dole-orange hover:border-dole-orange transition-all"
                >
                  <Facebook className="h-5 w-5 text-white" />
                </a>
              )}
              {contact?.socialLinks?.zalo && (
                <a 
                  href={`https://zalo.me/${contact.socialLinks.zalo}`} 
                  target="_blank"
                  className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-dole-orange hover:border-dole-orange transition-all"
                >
                  <MessageCircle className="h-5 w-5 text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col items-start order-2 md:order-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/30">
              SẢN PHẨM
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Cầu lông", path: "/category/Cầu lông" },
                { name: "Quần áo", path: "/category/Quần áo" },
                { name: "Giày Thể Thao", path: "/category/Giày Thể Thao" },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-zinc-400 hover:text-dole-orange transition-colors text-xs font-black uppercase tracking-tight">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 flex flex-col items-start order-3 md:order-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/30">
              CÔNG TY
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Về chúng tôi", path: "/" },
                { name: "Tin tức thể thao", path: "/news" },
                { name: "Chính sách đổi trả", path: "/contact" },
                { name: "Hệ thống cửa hàng", path: "/contact" }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-zinc-400 hover:text-dole-orange transition-colors text-xs font-black uppercase tracking-tight">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-start order-4 md:order-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/30">
              LIÊN HỆ TRỰC TIẾP
            </h3>
            <div className="space-y-8 w-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-dole-orange" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Địa chỉ</span>
                  <span className="text-[11px] font-black uppercase tracking-tight leading-relaxed">{contact?.address || '168 Tô Vĩnh Diện, P. Đông Hoà, TP. HCM'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dole-orange flex items-center justify-center shrink-0 border border-black">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Hotline</span>
                  <a href={`tel:${contact?.phone}`} className="text-3xl font-black text-white hover:text-dole-orange transition-colors tracking-tighter italic">{contact?.phone || '0363.528.196'}</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-dole-orange" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Email</span>
                  <a href={`mailto:${contact?.email}`} className="text-xs font-black text-white hover:text-dole-orange transition-colors truncate uppercase tracking-tight">{contact?.email || 'dolesporthcm@gmail.com'}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 py-10 bg-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {contact?.companyName || 'ĐỖ LÊ SPORT'}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4">
            {["VISA", "MASTERCARD", "MOMO", "VNPAY"].map(tag => (
              <span key={tag} className="px-3 py-1 border border-white/20 font-black text-[9px] uppercase tracking-widest text-zinc-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
