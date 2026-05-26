# 🏸 ĐỖ LÊ SPORT - Frontend Web App

Giao diện người dùng và hệ thống quản trị hiện đại cho **ĐỖ LÊ SPORT**. Thiết kế theo phong cách **Elite Sharpness**.

## 📋 Yêu cầu hệ thống (Prerequisites)
- **Node.js:** v20.x hoặc v22.x trở lên
- **Trình duyệt:** Chrome, Edge, Safari (Hỗ trợ Tailwind 4)
- **Docker:** (Tùy chọn cho triển khai nhanh)

## 🎨 Design System: Elite Sharpness
- **Border Radius:** `0px` (Góc cạnh mạnh mẽ).
- **Màu sắc:** Black, White, Dole Orange (`#FF5F00`).
- **Typography:** Geist Variable (Bold/Italic focus).

## 🚀 Công nghệ sử dụng
- **Core:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion

## 🛠 Cấu hình Biến môi trường (.env)
Cần thiết để Frontend kết nối được với Backend API:
```bash
VITE_API_URL=http://localhost:5005/api
```

## ⚙️ Các lệnh Scripts (NPM Scripts)
- `npm run dev`: Khởi chạy môi trường phát triển (HMR).
- `npm run build`: Đóng gói ứng dụng tối ưu cho Production.
- `npm run lint`: Kiểm tra lỗi cú pháp và chuẩn code (ESLint).
- `npm run preview`: Xem thử bản build chính thức ở máy cục bộ.

## 📂 Cấu trúc dự án
- `/src/components`: Các thành phần UI nguyên khối.
- `/src/pages`: Toàn bộ các trang (Home, CourtBooking, Admin...).
- `/src/context`: Quản lý giỏ hàng và trạng thái toàn cục.

---
© 2026 ĐỖ LÊ SPORT - Nâng Tầm Trải Nghiệm Thể Thao.
