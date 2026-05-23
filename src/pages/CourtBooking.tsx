import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import CourtHero from '../components/CourtHero';
import CourtSocialProof from '../components/CourtSocialProof';
import CourtFeatures from '../components/CourtFeatures';
import CourtPricing from '../components/CourtPricing';
import CourtBookingSection from '../components/CourtBookingSection';
import FAQSection from '../components/FAQSection';
import CourtMaps from '../components/CourtMaps';
import Footer from '../components/Footer';

const CourtBooking: React.FC = () => {
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "ĐỖ LÊ SPORT - Sân Cầu Lông Dĩ An",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "41 Nguyễn Du",
      "addressLocality": "Dĩ An",
      "addressRegion": "Bình Dương",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "10.855", 
      "longitude": "106.772"
    },
    "telephone": "0928662339",
    "url": window.location.origin + "/dat-san",
    "priceRange": "120000VND - 200000VND",
    "openingHours": "Mo-Su 05:00-23:00"
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <SEO 
        title="Đặt Sân Cầu Lông Dĩ An | ĐỖ LÊ SPORT - Sân Thảm Chuyên Nghiệp"
        description="Hệ thống sân cầu lông ĐỖ LÊ SPORT tại Dĩ An. Đặt sân trực tuyến 24/7, giá chỉ từ 120k/h. Thảm chuẩn quốc tế, đèn chống chói, đầy đủ tiện ích."
        keywords="đặt sân cầu lông, sân cầu lông dĩ an, đặt lịch cầu lông, đỗ lê sport, dạy học cầu lông dĩ an"
        locationSchema={locationSchema}
      />
      <Navbar />
      <main>
        {/* 1. ATTENTION */}
        <CourtHero />
        
        {/* 2. SOCIAL PROOF */}
        <CourtSocialProof />

        {/* 3. FEATURES & BENEFITS */}
        <CourtFeatures />

        {/* 4. PRICE */}
        <CourtPricing />

        {/* 5. FAQ (Clearing doubts before action) */}
        <FAQSection />

        {/* 6. ACTION (Booking App) */}
        <CourtBookingSection />

        {/* 7. LOCATION */}
        <CourtMaps />
      </main>
      <Footer />
    </div>
  );
}

export default CourtBooking;
