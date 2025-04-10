# Sử dụng image Node.js chính thức
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn (bao gồm config, models, controllers, routes)
COPY . .

# Mở cổng mà dịch vụ sử dụng
EXPOSE 8001

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]