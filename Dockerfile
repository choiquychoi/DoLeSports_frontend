# STAGE 1: BUILD
FROM node:22-alpine AS build

WORKDIR /app

# Khai báo các tham số build (có thể truyền qua --build-arg khi build)
# Mặc định trỏ về localhost nếu không truyền gì
ARG VITE_API_URL=http://localhost:5005/api
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# STAGE 2: SERVE WITH NGINX
FROM nginx:stable-alpine

# Copy cấu hình Nginx tùy chỉnh để hỗ trợ SPA Routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy kết quả build tĩnh vào thư mục phục vụ của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Chạy Nginx ở chế độ không chạy ngầm (foreground)
CMD ["nginx", "-g", "daemon off;"]
