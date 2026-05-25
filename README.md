# 🏸 ĐỖ LÊ SPORT - Frontend Web App

Giao diện người dùng và hệ thống quản trị hiện đại cho **ĐỖ LÊ SPORT**. Được thiết kế theo phong cách **Elite Sharpness** - Mạnh mẽ, Góc cạnh, Đẳng cấp.

## 🎨 Design System: Elite Sharpness
Dự án tuân thủ nghiêm ngặt các quy tắc thiết kế:
- **Border Radius:** Luôn là `0px` (Không bo góc).
- **Màu sắc:** Tương phản cực cao (Đen/Trắng/Cam Dole `#FF5F00`).
- **Hiệu ứng:** Đổ bóng cứng (Hard Shadow), không dùng Gradient hay Blur mờ ảo.
- **Font chữ:** Geist Variable (Sử dụng Bold/Italic để nhấn mạnh sự mạnh mẽ).

## 🚀 Công nghệ sử dụng
- **Core:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion (Smooth transitions)
- **Components:** Radix UI, Lucide Icons
- **Editor:** Tiptap & CKEditor 5 (Quản lý tin tức)

## 📦 Các tính năng chính
- **Landing Page Đặt sân:** Hệ thống lưới chọn giờ đặt sân tương tác thời gian thực.
- **Cửa hàng trực tuyến:** Duyệt sản phẩm, bộ lọc thông minh, giỏ hàng và thanh toán QR.
- **Admin Portal:** Giao diện quản lý toàn diện cho chủ cửa hàng (thống kê, quản lý đơn, cấu hình sân).
- **SEO Optimization:** Tích hợp JSON-LD, Meta Tags động cho từng sản phẩm và tin tức.

## 🛠 Cài đặt & Chạy thử

### 1. Chạy với Docker (Khuyên dùng)
Nếu bạn dùng Docker Compose ở thư mục gốc:
```bash
docker-compose up -d frontend
```

### 2. Chạy thủ công (Manual)
1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Cấu hình file `.env` (Trỏ `VITE_API_URL` về Backend).
3. Chạy Development:
   ```bash
   npm run dev
   ```

## 📂 Cấu trúc thư mục
- `/src/components`: Các thành phần giao diện dùng chung và UI đặc thù.
- `/src/pages`: Các trang chức năng (Home, CourtBooking, Admin, v.v.).
- `/src/context`: Quản lý trạng thái toàn cục (CartContext).
- `/src/lib`: Cấu hình Axios, định nghĩa Brand Config.
- `/src/assets`: Tài nguyên hình ảnh và phong cách Elite.

---
© 2026 ĐỖ LÊ SPORT - Nâng Tầm Trải Nghiệm Thể Thao.
