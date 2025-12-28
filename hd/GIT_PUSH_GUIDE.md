# Hướng dẫn Đẩy Code lên GitHub

Đây là các bước để bạn đưa toàn bộ dự án này lên GitHub để chia sẻ cho bạn bè.

### Bước 1: Tạo Repository trên GitHub
1.  Đăng nhập vào [GitHub](https://github.com).
2.  Bấm dấu **+** ở góc phải trên -> Chọn **New repository**.
3.  Đặt tên Repository (ví dụ: `QuizHub-Final`).
4.  Chọn **Public** hoặc **Private** tùy ý.
5.  **KHÔNG** tích vào các ô "Add a README file", ".gitignore" (vì mình đã có sẵn rồi).
6.  Bấm **Create repository**.

### Bước 2: Đẩy code từ máy lên GitHub
1.  Mở Terminal (hoặc CMD/Git Bash) tại thư mục gốc của dự án `QuizHub`.
2.  Chạy lần lượt các lệnh sau (copy và paste):

```bash
# 1. Khởi tạo Git (nếu chưa có)
git init

# 2. Thêm tất cả file vào Git
git add .

# 3. Lưu trạng thái hiện tại
git commit -m "Final Commit: Complete Project with Import File & Notification"

# 4. Đổi tên nhánh chính thành main (chuẩn mới)
git branch -M main

# 5. Kết nối với GitHub (Thay link bên dưới bằng link repo bạn vừa tạo ở Bước 1)
git remote add origin https://github.com/USERNAME/QuizHub-Final.git

# 6. Đẩy code lên
git push -u origin main
```

*(Lưu ý: Nếu GitHub hỏi đăng nhập, hãy nhập Username/Password hoặc dùng Token nếu được yêu cầu).*

---

### Bước 3: Gửi cho bạn cùng nhóm
Sau khi đẩy xong, bạn chỉ cần gửi link GitHub đó cho bạn kia.
Bảo bạn ấy làm theo file **README.md** để cài đặt môi trường và chạy dự án.
