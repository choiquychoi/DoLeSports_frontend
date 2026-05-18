import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, Loader2, Phone, Facebook, MessageCircle, Music2, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from '@/context/CartContext';
import axios from 'axios';
import logo from '@/assets/logo.jpg';

import api from '@/lib/axios';

interface IContact {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: {
    facebook?: string;
    zalo?: string;
    tiktok?: string;
    instagram?: string;
  };
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState<IContact | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { getItemCount } = useCart();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await api.get('/contact');
        setContact(data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin Navbar:', error);
      }
    };
    fetchContact();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsLoading(true);
        try {
          const { data } = await api.get(`/products?keyword=${searchQuery}&limit=5`);
          setSearchResults(data.products);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const navLinks = [
    { name: 'Cầu lông', path: '/category/Cầu lông' },
    { name: 'Quần áo', path: '/category/Quần áo' },
    { name: 'Giày', path: '/category/Giày Thể Thao' },
    { name: 'Phụ kiện', path: '/category/Phụ Kiện' },
    { name: 'Tin tức', path: '/news' },
    { name: "Liên Hệ", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full h-20 flex items-center z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/90 backdrop-blur-md border-b-2 border-black" 
        : "bg-white border-b border-zinc-100"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 overflow-hidden border-2 border-black group-hover:border-vanguard-orange transition-colors duration-300">
              <img 
                src={logo} 
                alt="Logo Fox Sports" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black uppercase tracking-tighter text-vanguard-orange">FOX</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black italic">SPORTS</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:block">
          {!isSearchOpen ? (
            <ul className="flex gap-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-[13px] font-black uppercase tracking-[0.2em] text-black hover:text-vanguard-orange transition-colors relative group/link"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover/link:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div ref={searchRef} className="relative w-[450px] animate-in fade-in slide-in-from-right-8 duration-300">
              <Input
                autoFocus
                placeholder="TÌM KIẾM SẢN PHẨM..."
                className="rounded-none border-2 border-black focus-visible:ring-0 h-12 px-6 pr-12 bg-white text-black font-bold uppercase tracking-widest text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <X 
                className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black cursor-pointer hover:text-vanguard-orange transition-colors" 
                onClick={() => {setIsSearchOpen(false); setSearchQuery('');}}
              />

              {/* Search Results Dropdown */}
              {(searchResults.length > 0 || isLoading) && (
                <div className="absolute top-14 left-0 w-full bg-white border-2 border-black overflow-hidden z-[60] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                  {isLoading ? (
                    <div className="p-6 flex items-center justify-center text-black">
                      <Loader2 className="h-6 w-6 animate-spin mr-3" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Đang truy xuất dữ liệu...</span>
                    </div>
                  ) : (
                    <div className="p-0">
                      {searchResults.map((product) => (
                        <div 
                          key={product._id}
                          onClick={() => handleProductClick(product.slug)}
                          className="flex items-center gap-5 p-4 hover:bg-black hover:text-white transition-all cursor-pointer border-b border-zinc-100 last:border-0 group/res"
                        >
                          <img src={product.mainImage} alt={product.name} className="w-12 h-12 object-cover border border-zinc-200" />
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase text-vanguard-orange tracking-widest leading-none mb-1">{product.brand}</span>
                            <span className="text-xs font-black uppercase tracking-tighter line-clamp-1 group-hover/res:text-white">{product.name}</span>
                            <span className="text-[10px] font-bold text-zinc-400 group-hover/res:text-zinc-300">{product.price.toLocaleString('vi-VN')}₫</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Icons & Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {!isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex hover:bg-black hover:text-white rounded-none transition-all duration-200 w-12 h-12"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-6 w-6 stroke-[2.5]" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="relative hover:bg-black hover:text-white rounded-none transition-all duration-200 w-12 h-12" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-6 w-6 stroke-[2.5]" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-vanguard-orange text-white text-[9px] font-black border-2 border-white">
                  {getItemCount()}
                </span>
              )}
            </Link>
          </Button>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-black hover:text-white rounded-none transition-all duration-200">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" showCloseButton={false} className="w-full sm:w-[450px] border-l-2 border-black p-0 bg-white text-black overflow-hidden">
                <div className="relative h-full flex flex-col p-8 z-10 overflow-y-auto no-scrollbar">
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden border-2 border-black">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-xl font-black uppercase tracking-tighter text-black">FOX</span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-vanguard-orange italic">SPORTS</span>
                      </div>
                    </div>
                    
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none bg-black text-white hover:bg-vanguard-orange transition-all">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Mobile Search */}
                  <div className="relative mb-10">
                    <Input 
                      placeholder="TÌM SẢN PHẨM..." 
                      className="h-14 rounded-none border-2 border-black bg-white focus:border-vanguard-orange text-black placeholder:text-zinc-400 pl-12 text-sm font-bold tracking-widest transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-2 mb-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-4">Danh mục chính</p>
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <SheetClose asChild>
                          <Link 
                            to={link.path} 
                            className="group flex items-center justify-between py-4 border-b border-zinc-100 hover:border-black transition-all"
                          >
                            <span className="text-xl font-black uppercase tracking-tighter text-black group-hover:text-vanguard-orange group-hover:translate-x-3 transition-all duration-300">
                              {link.name}
                            </span>
                            <span className="text-black group-hover:text-vanguard-orange transition-colors opacity-0 group-hover:opacity-100 font-black">→</span>
                          </Link>
                        </SheetClose>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Contact Info */}
                  <div className="mt-auto space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Hotline</span>
                        <a href={`tel:${contact?.phone}`} className="text-lg font-black text-black hover:text-vanguard-orange transition-colors tracking-tighter">
                          {contact?.phone || '0363.528.196'}
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-6 border-2 border-black bg-zinc-50 space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-black shrink-0 mt-1" />
                        <span className="text-[11px] font-bold uppercase tracking-tight leading-relaxed">
                          {contact?.address || '168 Tô Vĩnh Diện, P. Đông Hoà, TP. HCM'}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        {contact?.socialLinks.facebook && (
                          <a href={contact.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black flex items-center justify-center hover:bg-blue-600 transition-all">
                            <Facebook className="h-5 w-5 text-white" />
                          </a>
                        )}
                        {contact?.socialLinks.zalo && (
                          <a href={`https://zalo.me/${contact.socialLinks.zalo}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black flex items-center justify-center hover:bg-vanguard-orange transition-all">
                            <MessageCircle className="h-5 w-5 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
