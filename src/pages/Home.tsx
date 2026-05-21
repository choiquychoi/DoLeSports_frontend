import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import FocusProduct from '../components/FocusProduct';
import AboutUs from '../components/AboutUs';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="ĐỖ LÊ SPORT - Shop Thể Thao & Sân Cầu Lông"
        description="ĐỖ LÊ SPORT chuyên cung cấp vợt cầu lông, giày thể thao chính hãng và hệ thống sân cầu lông hiện đại tại TP.HCM."
        keywords="cầu lông, giày thể thao, vợt cầu lông, sân cầu lông, đỗ lê sport"
      />
      <Navbar />
      <main>
        <HeroBanner />
        <CategorySection />
        <FeaturedProducts />
        <FocusProduct />
        <AboutUs />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
