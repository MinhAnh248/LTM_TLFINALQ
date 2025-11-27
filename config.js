// Cấu hình ứng dụng
window.CONFIG = {
    // QUAN TRỌNG: Thay đổi URL này thành URL Render thực tế của bạn
    // Ví dụ: 'https://expense-tracker-backend.onrender.com'
    API_URL: 'https://your-render-app-url.onrender.com',
    
    // Để test local, sử dụng: 'http://localhost:5000'
    // API_URL: 'http://localhost:5000',
    
    // Cấu hình khác
    APP_NAME: 'Quản Lý Chi Tiêu',
    VERSION: '1.0.0',
    
    // Cấu hình hiển thị
    CURRENCY: 'VND',
    LOCALE: 'vi-VN',
    
    // Cấu hình thời gian
    TOKEN_EXPIRY_DAYS: 30,
    
    // Danh mục mặc định
    DEFAULT_CATEGORIES: {
        EXPENSE: [
            { name: 'Ăn uống', icon: '🍔' },
            { name: 'Giải trí', icon: '🎮' },
            { name: 'Mua sắm', icon: '🛒' },
            { name: 'Di chuyển', icon: '🚗' },
            { name: 'Y tế', icon: '🏥' },
            { name: 'Giáo dục', icon: '📚' }
        ],
        INCOME: [
            { name: 'Lương', icon: '💰' },
            { name: 'Thưởng', icon: '🎁' },
            { name: 'Đầu tư', icon: '📈' },
            { name: 'Khác', icon: '💵' }
        ]
    }
};

// Export cho sử dụng trong các file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.CONFIG;
}