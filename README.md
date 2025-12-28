# QuizHub - Hệ thống Quiz Trực tuyến (Angular 17 + Spring Boot)

Đồ án cuối kỳ môn Công nghệ Web. Tài hướng hướng dẫn chạy dự án dành cho thành viên nhóm.

## 🚀 Tính năng nổi bật

### Người dùng (User)
*   **Làm bài thi:** Trắc nghiệm, có đồng hồ đếm ngược, tự động nộp bài.
*   **Trang cá nhân:** Xem thông tin, danh sách Quiz đã tạo.
*   **Tạo Quiz thông minh:**
    *   Nhập tay từng câu.
    *   **MỚI:** Import từ file **Word (.docx)** và **PDF** tự động.
    *   Import từ JSON.
*   **Hệ thống thông báo:** Nhận thông báo khi report được xử lý.

### Quản trị viên (Admin)
*   **Dashboard:** Thống kê báo cáo (Report).
*   **Xử lý vi phạm:** Duyệt hoặc từ chối các báo cáo bài thi xấu.
*   **Quản lý:** Xóa bất kỳ bài thi nào vi phạm.

---

## 🛠️ Cài đặt môi trường (Bắt buộc)

Để chạy được dự án, máy tính cần cài sẵn:
1.  **Java JDK 17+** (Kiểm tra: `java -version`)
2.  **Node.js 18+** (Kiểm tra: `node -v`)
3.  **MySQL** (Nên dùng XAMPP, start module MySQL cổng 3306).
4.  **Git** (Để clone code về).

---

## 🏃‍♂️ Hướng dẫn chạy dự án (Từng bước)

### Bước 1: Chuẩn bị Cơ sở dữ liệu
1.  Mở XAMPP -> Start **Apache** và **MySQL**.
2.  Vào `http://localhost/phpmyadmin`.
3.  Tạo database mới tên là: `quizhub` (UTF-8 General CI).
    *   *Lưu ý: Không cần tạo bảng, Backend sẽ tự tạo bảng khi chạy lần đầu.*

### Bước 2: Chạy Backend (Spring Boot)
1.  Mở terminal (CMD/PowerShell) tại thư mục `backend`:
    ```bash
    cd backend
    ```
2.  Chạy lệnh khởi động:
    ```bash
    ./mvnw spring-boot:run
    ```
    *(Nếu máy chưa có Maven, lệnh này sẽ tự tải. Chờ khoảng 1-2 phút).*
3.  Khi thấy dòng `Started QuizHubApplication in ...` là thành công.
    *   Backend chạy tại: `http://localhost:8080`

### Bước 3: Chạy Frontend (Angular)
1.  Mở một terminal **mới** (không tắt terminal backend).
2.  Đi vào thư mục `frontend`:
    ```bash
    cd frontend
    ```
3.  Cài đặt thư viện (chỉ cần làm lần đầu):
    ```bash
    npm install
    ```
4.  Chạy ứng dụng:
    ```bash
    npm start
    ```
5.  Truy cập trình duyệt: `http://localhost:4200`

---

## 👤 Tài khoản Demo

| Tài khoản | Username | Password | Quyền |
|---|---|---|---|
| Admin | `admin` | `admin` | Quản lý toàn bộ, xem Report |
| User | `user1` | `admin` | Tạo quiz, làm bài |

---

## ⚠️ Khắc phục lỗi thường gặp

1.  **Lỗi: Port 8080 already in use**
    *   Tắt các ứng dụng đang chiếm cổng 8080 (Skype, WebServer khác).
    *   Hoặc đổi port trong `backend/src/main/resources/application.properties`.

2.  **Lỗi: Database connect fail**
    *   Kiểm tra XAMPP đã Bật MySQL chưa.
    *   Kiểm tra file cấu hình `backend/.../application.properties` xem username/password DB đã đúng với máy bạn chưa (Default: root / rỗng).

3.  **Lỗi: Frontend không gọi được API**
    *   Chắc chắn Backend đang chạy và không bị lỗi.
    *   Nhấn F12 bên Frontend, tab Console xem lỗi đỏ là gì.

---

## 📚 Tài liệu học tập (Dành cho nhóm)
*   Xem file **[LEARNING_GUIDE.md](hd/LEARNING_GUIDE.md)** trong thư mục `hd` để ôn tập code bảo vệ.
*   Xem hướng dẫn đẩy code: **[GIT_PUSH_GUIDE.md](hd/GIT_PUSH_GUIDE.md)**.
*   Mẫu file import câu hỏi: **[SAMPLE_QUIZ_FORMAT.md](hd/SAMPLE_QUIZ_FORMAT.md)**.
