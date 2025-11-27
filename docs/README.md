# 💰 Ứng Dụng Quản Lý Chi Tiêu Cá Nhân

Ứng dụng web quản lý chi tiêu cá nhân với tính năng AI dự đoán và phân tích tài chính.

## 🚀 Tính Năng

- ✅ Đăng ký/Đăng nhập người dùng
- ✅ Quản lý giao dịch thu/chi
- ✅ Phân loại theo danh mục
- ✅ Thống kê chi tiêu theo tháng
- ✅ AI dự đoán chi tiêu tương lai
- ✅ Giao diện responsive, thân thiện

## 🛠️ Công Nghệ

**Backend:**
- Flask (Python)
- SQLAlchemy (ORM)
- JWT Authentication
- PostgreSQL/SQLite
- AI/ML cho dự đoán

**Frontend:**
- HTML5, CSS3, JavaScript
- Bootstrap 5
- Chart.js cho biểu đồ
- Responsive design

## 📦 Cài Đặt & Chạy

### 1. Chạy Local (Development)

```bash
# Clone repository
git clone <repository-url>
cd LTM_TLFINALQ

# Cài đặt dependencies
pip install -r requirements.txt

# Tạo file .env
cp .env.example .env
# Chỉnh sửa .env với thông tin database

# Chạy ứng dụng
python app.py
```

Mở http://localhost:5000 để xem API
Mở index.html trong trình duyệt để xem frontend

### 2. Deploy Production

Xem hướng dẫn chi tiết trong [DEPLOY_RENDER.md](DEPLOY_RENDER.md)

**Tóm tắt:**
1. Tạo database miễn phí trên Supabase/Neon
2. Deploy backend lên Render
3. Deploy frontend lên Netlify/Vercel
4. Cấu hình environment variables

## 🗄️ Cấu Trúc Database

```sql
- vai_tro (id, loai_vai_tro, mo_ta)
- nguoi_dung (id, vai_tro_id, ho_ten, email, mat_khau, so_du)
- danh_muc (id, nguoi_dung_id, loai_danh_muc, ten_danh_muc, icon)
- giao_dich (id, danh_muc_id, so_tien, mo_ta, ngay)
- tich_luy (id, nguoi_dung_id, ten_tich_luy, so_tien_muc_tieu)
- vay_no (id, nguoi_dung_id, ho_ten_vay_no, loai, so_tien)
```

## 🔧 API Endpoints

```
GET  /                     # API info
POST /api/auth/register    # Đăng ký
POST /api/auth/login       # Đăng nhập
GET  /api/user/profile     # Thông tin user
POST /api/giao-dich        # Thêm giao dịch
GET  /api/giao-dich        # Lấy danh sách giao dịch
POST /api/danh-muc         # Thêm danh mục
GET  /api/danh-muc         # Lấy danh sách danh mục
GET  /api/thong-ke         # Thống kê tài chính
GET  /api/ai/prediction    # AI dự đoán
```

## 🎯 Hướng Dẫn Sử Dụng

1. **Đăng ký tài khoản** với email và mật khẩu
2. **Đăng nhập** vào hệ thống
3. **Thêm giao dịch** thu/chi với danh mục
4. **Xem thống kê** chi tiêu theo tháng
5. **Sử dụng AI** để dự đoán chi tiêu tương lai

## 🔒 Bảo Mật

- Mật khẩu được hash bằng bcrypt
- JWT token cho authentication
- CORS được cấu hình đúng
- Input validation ở cả frontend và backend

## 📱 Screenshots

[Thêm screenshots của ứng dụng ở đây]

## 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết

## 👥 Nhóm Phát Triển

- **Backend**: Flask API, Database, AI Module
- **Frontend**: UI/UX, JavaScript, Responsive Design
- **DevOps**: Deployment, CI/CD, Database Management

## 🆘 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra [DEPLOY_RENDER.md](DEPLOY_RENDER.md)
2. Xem logs trên Render Dashboard
3. Kiểm tra Developer Console trong trình duyệt
4. Tạo issue trên GitHub

---

**Phiên bản**: 1.0.0  
**Cập nhật**: 2024