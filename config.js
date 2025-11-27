// Cấu hình API URL cho production và development
const CONFIG = {
    // Thay đổi URL này khi deploy lên Render
    API_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api' 
        : 'https://expense-tracker-backend.onrender.com/api',
    
    // Hoặc sử dụng biến môi trường
    // API_URL: process.env.NODE_ENV === 'production' 
    //     ? 'https://your-app-name.onrender.com/api'
    //     : 'http://localhost:5000/api'
};