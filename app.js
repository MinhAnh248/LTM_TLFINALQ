// Cấu hình API - Sử dụng từ config.js hoặc mặc định
const API_BASE_URL = (typeof CONFIG !== 'undefined' && CONFIG.API_BASE_URL) 
    ? CONFIG.API_BASE_URL 
    : 'https://your-render-app-url.onrender.com'; // Thay bằng URL Render của bạn

let currentUser = null;
let authToken = null;

// Utility functions
function showAlert(elementId, message, type = 'error') {
    const alertElement = document.getElementById(elementId);
    alertElement.textContent = message;
    alertElement.className = `alert ${type}`;
    alertElement.style.display = 'block';
    
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 5000);
}

function formatCurrency(amount) {
    const locale = (typeof CONFIG !== 'undefined' && CONFIG.LOCALE) ? CONFIG.LOCALE : 'vi-VN';
    const currency = (typeof CONFIG !== 'undefined' && CONFIG.CURRENCY) ? CONFIG.CURRENCY : 'VND';
    
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Có lỗi xảy ra');
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Auth functions
function toggleForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

async function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const balance = parseFloat(document.getElementById('registerBalance').value) || 0;

    if (!name || !email || !password) {
        showAlert('registerAlert', 'Vui lòng điền đầy đủ thông tin');
        return;
    }

    try {
        const result = await apiCall('/api/auth/register', 'POST', {
            ho_ten: name,
            email: email,
            mat_khau: password,
            so_du: balance
        });

        showAlert('registerAlert', 'Đăng ký thành công! Vui lòng đăng nhập.', 'success');
        setTimeout(() => {
            toggleForm();
        }, 2000);
    } catch (error) {
        showAlert('registerAlert', error.message);
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showAlert('loginAlert', 'Vui lòng nhập email và mật khẩu');
        return;
    }

    try {
        const result = await apiCall('/api/auth/login', 'POST', {
            email: email,
            mat_khau: password
        });

        authToken = result.access_token;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userId', result.user_id);

        await loadDashboard();
    } catch (error) {
        showAlert('loginAlert', error.message);
    }
}

function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('dashboard').classList.remove('active');
}

// Dashboard functions
async function loadDashboard() {
    try {
        // Load user profile
        const profile = await apiCall('/api/user/profile');
        currentUser = profile;

        // Load statistics
        const stats = await apiCall('/api/thong-ke');

        // Update UI
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');

        // Update stats
        document.getElementById('monthlyIncome').textContent = formatCurrency(stats.thu_nhap_thang_nay);
        document.getElementById('monthlyExpense').textContent = formatCurrency(stats.chi_tieu_thang_nay);
        document.getElementById('currentBalance').textContent = formatCurrency(stats.so_du);

        // Load transactions and categories
        await loadTransactions();
        await loadCategories();

    } catch (error) {
        showAlert('dashboardAlert', 'Không thể tải dữ liệu: ' + error.message);
    }
}

// Transaction functions
async function loadTransactions() {
    try {
        const transactions = await apiCall('/api/giao-dich');
        const categories = await apiCall('/api/danh-muc');
        
        const transactionTableBody = document.getElementById('transactionTableBody');
        if (!transactionTableBody) return;

        transactionTableBody.innerHTML = '';

        transactions.forEach(transaction => {
            const category = categories.find(cat => cat.id === transaction.danh_muc_id);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(transaction.ngay).toLocaleDateString('vi-VN')}</td>
                <td>${category ? category.ten_danh_muc : 'Không xác định'}</td>
                <td>${formatCurrency(transaction.so_tien)}</td>
                <td>${transaction.mo_ta || ''}</td>
            `;
            transactionTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading transactions:', error);
    }
}

async function addTransaction() {
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const description = document.getElementById('transactionDescription').value;
    const categoryId = document.getElementById('transactionCategory').value;
    const date = document.getElementById('transactionDate').value;

    if (!amount || !categoryId) {
        showAlert('dashboardAlert', 'Vui lòng nhập đầy đủ thông tin giao dịch');
        return;
    }

    try {
        await apiCall('/api/giao-dich', 'POST', {
            danh_muc_id: parseInt(categoryId),
            so_tien: amount,
            mo_ta: description,
            ngay: date || new Date().toISOString()
        });

        showAlert('dashboardAlert', 'Thêm giao dịch thành công!', 'success');
        
        // Reset form
        document.getElementById('transactionAmount').value = '';
        document.getElementById('transactionDescription').value = '';
        document.getElementById('transactionDate').value = '';

        // Reload data
        await loadDashboard();
    } catch (error) {
        showAlert('dashboardAlert', error.message);
    }
}

// Category functions
async function loadCategories() {
    try {
        const categories = await apiCall('/api/danh-muc');
        
        // Update category select
        const categorySelect = document.getElementById('transactionCategory');
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">Chọn danh mục</option>';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = `${category.icon || ''} ${category.ten_danh_muc} (${category.loai_danh_muc})`;
                categorySelect.appendChild(option);
            });
        }

        // Update category table
        const categoryTableBody = document.getElementById('categoryTableBody');
        if (categoryTableBody) {
            categoryTableBody.innerHTML = '';
            categories.forEach(category => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${category.icon || ''}</td>
                    <td>${category.ten_danh_muc}</td>
                    <td>${category.loai_danh_muc}</td>
                `;
                categoryTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function addCategory() {
    const name = document.getElementById('categoryName').value;
    const type = document.getElementById('categoryType').value;
    const icon = document.getElementById('categoryIcon').value;

    if (!name || !type) {
        showAlert('dashboardAlert', 'Vui lòng nhập tên và loại danh mục');
        return;
    }

    try {
        await apiCall('/api/danh-muc', 'POST', {
            ten_danh_muc: name,
            loai_danh_muc: type,
            icon: icon
        });

        showAlert('dashboardAlert', 'Thêm danh mục thành công!', 'success');
        
        // Reset form
        document.getElementById('categoryName').value = '';
        document.getElementById('categoryIcon').value = '';

        // Reload categories
        await loadCategories();
    } catch (error) {
        showAlert('dashboardAlert', error.message);
    }
}

// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.nav-tabs button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show/hide content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    const targetContent = document.getElementById(tabName + 'Tab');
    if (targetContent) {
        targetContent.style.display = 'block';
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
        authToken = savedToken;
        loadDashboard();
    }

    // Set default date to today
    const dateInput = document.getElementById('transactionDate');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
});