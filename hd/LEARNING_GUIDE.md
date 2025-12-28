# Hướng Dẫn Ôn Tập & Bảo Vệ Đồ Án QuizHub

Tài liệu này được thiết kế cho nhóm 2 người, tập trung trọng tâm vào **Angular (Frontend)** theo yêu cầu môn học, đồng thời chia sẻ kiến thức Backend để cả hai đều nắm được hệ thống.

---

## 🟢 PHẦN CHUNG (CẢ 2 NGƯỜI CÙNG HỌC)
**Trọng tâm: Angular 17 (Frontend)**
Đây là phần quan trọng nhất để bảo vệ đồ án. Cả hai bạn cần nắm vững các concept sau đã được áp dụng trong project:

### 1. Standalone Components (Kiến trúc mới của Angular)
*   **Code:** Xem `QuizListComponent`, `ProfileComponent`.
*   **Cần hiểu:** Tại sao dùng `standalone: true`? (Không cần `AppModule`, import trực tiếp các module cần dùng vào `imports: []`).
*   **Lazy Loading:** Xem `app.routes.ts` để thấy cách dùng `loadComponent` giúp tải trang nhanh hơn.

### 2. Services & Dependency Injection (DI)
*   **Code:** `AuthService`, `QuizService`, `NotificationService`.
*   **Cần hiểu:**
    *   `@Injectable({ providedIn: 'root' })` nghĩa là gì? (Service duy nhất toàn app - Singleton).
    *   Cách gọi API: `this.http.get(...)`, `this.http.post(...)`.
    *   **RxJS:** Hiểu `Observable` và `.subscribe()` (cơ chế bất đồng bộ, chờ dữ liệu từ server về).

### 3. Routing & Navigation
*   **Code:** `app.routes.ts`, `auth.guard.ts`.
*   **Cần hiểu:**
    *   Cách định nghĩa đường dẫn (`path: 'quiz/:id'`).
    *   Cách lấy tham số trên URL (`ActivatedRoute`).
    *   **Guards:** `AuthGuard` chặn người chưa đăng nhập như thế nào? (Kiểm tra xem `currentUser` có null không).

### 4. Forms & Reactive Forms
*   **Code:** `QuizCreateComponent` (Rất quan trọng).
*   **Cần hiểu:**
    *   `FormBuilder`, `FormGroup`, `FormControl`.
    *   **FormArray:** Cách xử lý danh sách câu hỏi động (thêm/xóa câu hỏi tùy ý).
    *   Validate dữ liệu (`Validators.required`).

### 5. Angular Material
*   **Code:** `material.module.ts` và HTML các component.
*   **Cần hiểu:** Cách sử dụng các thẻ `mat-card`, `mat-table`, `mat-dialog` để tạo giao diện đẹp.

---

## 🔵 PHẦN BACKEND (CHIA 2 NGƯỜI)
Mặc dù trọng tâm là Frontend, nhưng các bạn cần chia nhau nắm Backend để trả lời câu hỏi về dữ liệu.

### Người A: Phụ trách Core & Authentication
**Nhiệm vụ:** Nắm vững cấu trúc dự án và bảo mật.

1.  **Cấu trúc Spring Boot:**
    *   Hiểu luồng đi: `Controller` (nhận request) -> `Service` (xử lý logic) -> `Repository` (gọi DB).
    *   File cấu hình: `application.properties` (kết nối MySQL).
2.  **Authentication (Quan trọng):**
    *   Xem `AuthController.java`, `AuthService.java`.
    *   Hiểu `BCryptPasswordEncoder`: Tại sao password trong database lại là chuỗi ký tự loằng ngoằng? (Do đã được mã hóa).
    *   Cơ chế Login: Kiểm tra username -> so sánh password -> trả về User.
3.  **Database & JPA:**
    *   Xem `User.java`, `UserRepository.java`.
    *   Hiểu các annotation: `@Entity`, `@Id`, `@GeneratedValue`.

### Người B: Phụ trách Nghiệp vụ & Tính năng Nâng cao
**Nhiệm vụ:** Nắm vững các tính năng chính của Quiz và File xử lý.

1.  **Quiz & Result Logic:**
    *   Xem `QuizController.java`, `QuizService.java`.
    *   Hiểu cách lưu bài thi và chấm điểm trong `ResultService.java`.
2.  **Tính năng Import File (Điểm cộng):**
    *   **Code:** `FileParsingService.java`.
    *   Cần giải thích được: "Em dùng thư viện **Apache POI** để đọc file Word và **PDFBox** để đọc file PDF. Sau đó dùng **Regular Expression (Regex)** để 'bắt' lấy các dòng bắt đầu bằng 'Câu 1', 'A.', 'B.'... để tách lấy dữ liệu".
    *   Đây là tính năng ăn điểm kỹ thuật cao.
3.  **Notification & Report:**
    *   Hiểu cách `ReportService` gửi thông báo cho Admin khi có báo cáo xấu.

---

## 💡 MẸO TRẢ LỜI CÂU HỎI BẢO VỆ
1.  **Nếu thầy hỏi về Frontend:** "Tại sao dùng Angular 17?"
    *   Trả lời: "Nhóm em muốn sử dụng công nghệ mới nhất với **Standalone Components** để giảm bớt sự phức tạp của Modules (NgModule) và tăng hiệu năng tải trang."
2.  **Nếu thầy hỏi về Backend:** "Làm sao để import được file Word?"
    *   (Người B trả lời): "Bọn em xử lý phía server (Backend), upload file lên và dùng thư viện chuyên dụng để đọc text, sau đó dùng thuật toán Regex để phân tích cấu trúc câu hỏi."
3.  **Nếu thầy hỏi về Database:** "Dữ liệu được lưu như thế nào?"
    *   (Người A trả lời): "Bọn em dùng MySQL kết hợp với Hibernate (JPA) để tự động ánh xạ các Class Java (Entity) thành bảng trong Database."

---
*Chúc hai bạn ôn tập tốt và đạt điểm cao!*
