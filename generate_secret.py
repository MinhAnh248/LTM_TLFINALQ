#!/usr/bin/env python3
"""
Script tạo JWT Secret Key mạnh cho production
Chạy: python generate_secret.py
"""

import secrets
import string

def generate_jwt_secret(length=64):
    """Tạo JWT secret key ngẫu nhiên"""
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(secrets.choice(alphabet) for _ in range(length))

if __name__ == "__main__":
    secret = generate_jwt_secret()
    print("JWT Secret Key được tạo:")
    print(f"JWT_SECRET_KEY={secret}")
    print("\nCopy dòng trên và paste vào Environment Variables trên Render")