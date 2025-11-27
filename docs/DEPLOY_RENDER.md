# Hướng Dẫn Deploy Lên Render

## Bước 1: Chuẩn bị Database (MIỄN PHÍ)

### Tùy chọn A: Supabase (Khuyến nghị)
1. Truy cập https://supabase.com
2. Đăng ký tài khoản miễn phí
3. Tạo project mới
4. Vào Settings > Database
5. Copy "Connection string" (URI format)

### Tùy chọn B: Neon
1. Truy cập https://neon.tech
2. Đăng ký tài khoản miễn phí
3. Tạo database mới
4. Copy connection string

## Bước 2: Deploy Backend lên Render

### 2.1. Tạo Web Service
1. Truy cập https://render.com
2. Đăng nhập/Đăng ký
3. Chọn "New" > "Web Service"
4. Connect GitHub repository hoặc upload code

### 2.2. Cấu hình Web Service
- **Name**: `expense-tracker-backend`
- **Environment**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`

### 2.3. Thêm Environment Variables
Trong phần "Environment Variables":

```
DATABASE_URL=postgresql://your-database-connection-string
JWT_SECRET_KEY=your-super-secret-key-here-make-it-long-and-random
FLASK_ENV=production
```

**Lưu ý**: 
- Thay `your-database-connection-string` bằng connection string từ Supabase/Neon
- Tạo JWT_SECRET_KEY mạnh (ít nhất 32 ký tự ngẫu nhiên)

## Bước 3: Cấu hình Frontend

### 3.1. Cập nhật config.js
Sau khi backend deploy thành công, copy URL Render và cập nhật:

```javascript
const CONFIG = {
    API_BASE_URL: 'https://your-app-name.onrender.com',
    // ... các cấu hình khác giữ nguyên
};
```

### 3.2. Deploy Frontend
**Tùy chọn A: Netlify (Khuyến nghị)**
1. Truy cập https://netlify.com
2. Drag & drop thư mục chứa index.html, app.js, config.js
3. Site sẽ tự động deploy

**Tùy chọn B: Vercel**
1. Truy cập https://vercel.com
2. Import project từ GitHub
3. Deploy tự động

**Tùy chọn C: GitHub Pages**
1. Push code lên GitHub repository
2. Vào Settings > Pages
3. Chọn source branch

## Bước 4: Test Deployment

### 4.1. Test Backend API
```
GET https://your-app-name.onrender.com/
```

Kết quả mong đợi:
```json
{
    "message": "LTM Final Project API",
    "status": "running",
    "endpoints": { ... }
}
```

### 4.2. Test Frontend
1. Mở URL frontend
2. Thử đăng ký tài khoản mới
3. Đăng nhập
4. Thêm giao dịch test

## Bước 5: Troubleshooting

### Backend không khởi động
- Kiểm tra logs trên Render Dashboard
- Đảm bảo DATABASE_URL đúng format
- Kiểm tra requirements.txt

### Frontend không kết nối được API
- Kiểm tra API_BASE_URL trong config.js
- Kiểm tra CORS settings
- Mở Developer Tools để xem lỗi

### Database connection error
- Kiểm tra DATABASE_URL
- Đảm bảo database đang chạy
- Kiểm tra IP whitelist (nếu có)

## Bước 6: Cấu hình Production

### Bảo mật
- Sử dụng HTTPS
- JWT secret key mạnh
- Validate input
- Rate limiting

### Performance
- Enable gzip compression
- Optimize database queries
- Use CDN cho static files

## URLs Mẫu

Sau khi deploy thành công:
- **Backend**: https://expense-tracker-backend.onrender.com
- **Frontend**: https://your-frontend-url.netlify.app

## Lưu ý quan trọng

1. **Render Free Tier**: Service sẽ sleep sau 15 phút không hoạt động
2. **Database**: Supabase/Neon có giới hạn miễn phí
3. **CORS**: Đã được cấu hình trong Flask app
4. **Environment Variables**: Không commit vào Git

## Checklist Deploy

- [ ] Database được tạo (Supabase/Neon)
- [ ] Backend deploy thành công trên Render
- [ ] Environment variables được set
- [ ] Frontend config.js được cập nhật
- [ ] Frontend deploy thành công
- [ ] Test đăng ký/đăng nhập
- [ ] Test thêm giao dịch
- [ ] Test AI prediction (nếu có)