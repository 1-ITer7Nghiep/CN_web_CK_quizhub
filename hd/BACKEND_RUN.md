# 🚀 CHẠY BACKEND - 2 CÁCH

## ✅ CÁCH 1: DÙNG STS4 (KHUYẾN NGHỊ)

### Bước 1: Mở STS4
1. Mở **Spring Tool Suite 4**
2. File → Open Projects from File System...

### Bước 2: Import Project
1. **Directory:** Chọn `d:\Nam4_HK1\CN_web\CuoiKi\QuizHub\backend`
2. Click **Finish**
3. Đợi STS4 build project (thanh loading dưới góc phải)

### Bước 3: Chạy Application
1. Tìm file **`QuizHubApplication.java`** trong Package Explorer
   - Path: `src/main/java` → `com.quizhub` → `QuizHubApplication.java`
2. **Right-click** vào file → **Run As** → **Spring Boot App**

### Bước 4: Kiểm tra
Console sẽ hiện:
```
Started QuizHubApplication in X.XXX seconds (JVM running for Y.YYY)
```

✅ **Backend chạy tại:** http://localhost:8080

---

## 🔧 CÁCH 2: CÀI MAVEN (nếu muốn dùng command line)

### Download Maven:
1. Vào: https://maven.apache.org/download.cgi
2. Download: **apache-maven-3.9.x-bin.zip**

### Cài đặt:
1. Giải nén vào `C:\Program Files\Apache\maven`
2. Thêm vào **Environment Variables:**
   - System Properties → Environment Variables
   - Path → New → `C:\Program Files\Apache\maven\bin`
3. Restart terminal/VS Code

### Kiểm tra:
```bash
mvn -version
```

Sau đó mới chạy:
```bash
cd backend
mvn spring-boot:run
```

---

## ⚡ NHANH NHẤT: DÙNG STS4!

Không cần cài Maven, chỉ cần:
1. Mở STS4
2. Import project `backend`
3. Run As → Spring Boot App
4. XONG!

---

## 🐛 Nếu STS4 báo lỗi "Cannot resolve dependencies"

1. **Right-click** project → **Maven** → **Update Project**
2. Check **Force Update**
3. Click **OK**
4. Đợi download dependencies (Internet cần kết nối)

---

## ✅ KẾT QUẢ MONG ĐỢI

Console hiện:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.5)

...
Started QuizHubApplication in X.XXX seconds
```

Backend sẵn sàng cho frontend kết nối!
