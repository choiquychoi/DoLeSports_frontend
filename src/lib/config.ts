/**
 * TRUNG TÂM CẤU HÌNH THƯƠNG HIỆU (BRANDING CONFIG)
 * 
 * Đây là nơi duy nhất bạn cần thay đổi nếu muốn đổi tên Shop, Slogan, 
 * hoặc các thông tin cơ bản khác mà không muốn phụ thuộc hoàn toàn vào Database.
 */

export const BRAND_CONFIG = {
  // 1. Thông tin định danh (Text Branding)
  name: "ĐỖ LÊ SPORT",
  shortName: "ĐỖ LÊ",
  suffix: "SPORT",
  fullName: "ĐỖ LÊ SPORT - Shop Thể Thao & Sân Cầu Lông",
  
  // 2. Slogan & Story
  slogan: "Nâng Tầm Trải Nghiệm Thể Thao",
  tagline: "Professional Equipment — Authentic Quality",
  description: "Chuyên cung cấp dụng cụ thể thao Cầu lông chính hãng và hệ thống sân cầu lông hiện đại.",
  
  // 3. Thông tin liên hệ mặc định (Fallback)
  contact: {
    phone: "0363.528.196",
    email: "dolesporthcm@gmail.com",
    address: "168 Tô Vĩnh Diện, P. Đông Hoà, TP. HCM",
    facebook: "https://www.facebook.com/profile.php?id=61586397269289",
    zalo: "0363528196"
  },

  // 4. SEO & Social
  seo: {
    keywords: "cầu lông, vợt cầu lông, giày thể thao, sân cầu lông, đỗ lê sport",
    image: "/src/assets/logo.jpg"
  }
};

// Cấu hình URL gốc cho Server Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

export const CONFIG = {
  API_URL: API_BASE_URL,
  ADMIN_API_URL: `${API_BASE_URL}/admin`,
};

export default { BRAND_CONFIG, CONFIG };
