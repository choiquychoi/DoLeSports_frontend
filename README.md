# 🏸 ĐỖ LÊ SPORT - Frontend Web App

Giao diện người dùng và hệ thống quản trị hiện đại cho ĐỖ LÊ SPORT. Được thiết kế theo phong cách thiết kế đặc trưng **Elite Sharpness** - Mạnh mẽ, Góc cạnh, Đẳng cấp.

---

## 🎨 Design System: Elite Sharpness
Dự án tuân thủ nghiêm ngặt các quy tắc thiết kế thương hiệu:
*   **Border Radius:** `0px` (Tuyệt đối không bo góc, tạo cảm giác mạnh mẽ).
*   **Màu sắc:** Tương phản cực cao (Black, White, Dole Orange `#FF5F00`).
*   **Hiệu ứng:** Sử dụng đổ bóng cứng (Hard Shadow), không dùng hiệu ứng Gradient hay Blur mờ ảo.
*   **Typography:** Sử dụng font `Geist Variable` (Focus vào thuộc tính Bold/Italic để nhấn mạnh).

---

## 📋 Yêu cầu hệ thống (Prerequisites)
*   **Node.js:** v20.x hoặc v22.x trở lên
*   **Trình duyệt:** Chrome, Edge, Safari (Hỗ trợ tốt cho Tailwind CSS v4)
*   **Docker:** (Tùy chọn cho triển khai nhanh)

---

## 🚀 Công nghệ sử dụng
*   **Core:** React 19 + TypeScript
*   **Build Tool:** Vite 6
*   **Styling:** Tailwind CSS 4
*   **Animation:** Framer Motion
*   **Components:** Radix UI, Lucide Icons
*   **Editor:** Tiptap & CKEditor 5 (Hỗ trợ viết bài tin tức)

---

## 🛠 Cấu hình Biến môi trường (.env)
Tạo file `.env` tại thư mục gốc để kết nối với Backend API:
```env
VITE_API_URL=http://localhost:5005/api
```

---

## ⚙️ Các lệnh Scripts & Triển khai

### Khởi chạy thủ công (NPM Scripts)

* `npm run dev`: Khởi chạy môi trường phát triển local (HMR).
* `npm run build`: Đóng gói và tối ưu ứng dụng cho Production.
* `npm run lint`: Kiểm tra lỗi cú pháp và chuẩn hóa code với ESLint.
* `npm run preview`: Xem thử bản build chính thức ở máy cục bộ.

### Khởi chạy nhanh với Docker

```bash
docker-compose up -d frontend
```

---

## 📂 Cấu trúc dự án

```text
/src
├── /assets      # Tài nguyên hình ảnh và phong cách Elite
├── /components  # Các thành phần UI nguyên khối (Dùng chung & Đặc thù)
├── /context     # Quản lý giỏ hàng và trạng thái toàn cục (CartContext)
├── /lib         # Cấu hình Axios, định nghĩa Brand Config
└── /pages       # Toàn bộ các trang (Home, CourtBooking, Admin...)
```

© 2026 ĐỖ LÊ SPORT - Nâng Tầm Trải Nghiệm Thể Thao.
