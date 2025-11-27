# Hướng Dẫn Thiết Lập Database PostgreSQL

## 1. Tạo Database trên Render

### Lựa chọn A: Sử dụng database hiện có
Nếu bạn đã có database miễn phí trên Render:
1. Vào Dashboard Render
2. Tìm PostgreSQL database hiện có
3. Copy thông tin kết nối

### Lựa chọn B: Tạo database mới (cần gói trả phí)
1. Chọn gói Basic ($6/tháng)
2. Tạo database mới với tên `expense-tracker-db`

### Lựa chọn C: Sử dụng nhà cung cấp khác (MIỄN PHÍ)

#### Supabase (Khuyến nghị)
1. Truy cập https://supabase.com
2. Tạo tài khoản miễn phí
3. Tạo project mới
4. Lấy thông tin kết nối từ Settings > Database

#### Neon (Thay thế tốt)
1. Truy cập https://neon.tech
2. Tạo tài khoản miễn phí
3. Tạo database mới
4. Copy connection string

## 2. Cấu Hình Backend

### Cập nhật biến môi trường trên Render:
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET_KEY=your-super-secret-key-here
```

### Hoặc tạo file .env (cho development):
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET_KEY=your-super-secret-key-here
PORT=5000
```

## 3. Cấu Hình Frontend

### Cập nhật URL API trong config.js:
```javascript
const CONFIG = {
    API_BASE_URL: 'https://your-actual-render-url.onrender.com',
    // ... các cấu hình khác
};
```

## 4. Khởi Tạo Database

Database sẽ tự động được tạo khi backend khởi động lần đầu.

Các bảng được tạo:
- `vai_tro` - Vai trò người dùng
- `nguoi_dung` - Thông tin người dùng
- `danh_muc` - Danh mục thu chi
- `giao_dich` - Giao dịch
- `tich_luy` - Mục tiêu tiết kiệm
- `vay_no` - Quản lý vay nợ

## 5. Test Kết Nối

### Kiểm tra backend:
```
GET https://your-render-url.onrender.com/
```

Kết quả mong đợi:
```json
{
    "message": "LTM Final Project API",
    "status": "running",
    "endpoints": { ... }
}
```

### Kiểm tra frontend:
1. Mở index.html trong trình duyệt
2. Thử đăng ký tài khoản mới
3. Đăng nhập và kiểm tra dashboard

## 6. Troubleshooting

### Lỗi CORS:
- Đảm bảo Flask-CORS đã được cài đặt
- Kiểm tra cấu hình CORS trong app.py

### Lỗi Database Connection:
- Kiểm tra DATABASE_URL
- Đảm bảo database đang chạy
- Kiểm tra firewall/network

### Lỗi 404 API:
- Kiểm tra API_BASE_URL trong config.js
- Đảm bảo backend đã deploy thành công

## 7. Cấu Trúc File

```
LTM_TLFINALQ/
├── app.py              # Backend Flask
├── models.py           # Database models
├── config.py           # Backend config
├── requirements.txt    # Python dependencies
├── index.html          # Frontend chính
├── app.js             # Frontend JavaScript
├── config.js          # Frontend config
└── database_schema.sql # Database schema
```

## 8. Deployment Checklist

- [ ] Backend deployed trên Render
- [ ] Database được tạo và kết nối
- [ ] Environment variables được set
- [ ] Frontend config.js được cập nhật
- [ ] Test đăng ký/đăng nhập
- [ ] Test thêm giao dịch
- [ ] Test thêm danh mục

## 9. Bảo Mật

- Sử dụng HTTPS cho production
- Không commit sensitive data
- Sử dụng JWT token mạnh
- Validate input ở cả frontend và backend