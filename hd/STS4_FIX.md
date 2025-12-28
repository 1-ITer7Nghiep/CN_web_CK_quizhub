# ✅ SỬA LỖI STS4 - IMPORT PROJECT ĐÚNG CÁCH

## Vấn đề: "There are no projects in your workspace"

Bạn đã chọn **backend** làm workspace, nhưng cần **import** project vào workspace.

---

## CÁCH FIX (2 BƯỚC ĐƠN GIẢN):

### Bước 1: Đóng STS4 hiện tại
- Click **Cancel**
- File → Exit (đóng STS4)

### Bước 2: Mở lại và Import đúng

#### 2.1. Khởi động STS4
- Khi hỏi workspace: Chọn **QuizHub** (folder cha)
  ```
  D:\Nam4_HK1\CN_web\CuoiKi\QuizHub
  ```
- Click **Launch**

#### 2.2. Import Backend Project
1. **File** → **Import...**
2. Chọn: **Maven** → **Existing Maven Projects**
3. Click **Next**
4. **Root Directory:** Click Browse → Chọn:
   ```
   D:\Nam4_HK1\CN_web\CuoiKi\QuizHub\backend
   ```
5. Sẽ thấy: **pom.xml** được check ✓
6. Click **Finish**

#### 2.3. Đợi Build
- Thanh loading dưới góc phải
- "Building workspace..." → "Downloading dependencies..."
- **Đợi 2-5 phút** (download Maven dependencies lần đầu)

---

## Bước 3: Chạy Application

Sau khi build xong:

1. **Package Explorer** (bên trái) sẽ thấy project **backend**
2. Mở cây thư mục:
   ```
   backend
   └── src/main/java
       └── com.quizhub
           └── QuizHubApplication.java
   ```
3. **Right-click** vào **QuizHubApplication.java**
4. **Run As** → **Spring Boot App**

---

## Kết quả mong đợi

**Console** (tab dưới) hiện:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

Started QuizHubApplication in 5.234 seconds
```

✅ **Backend running tại http://localhost:8080**

---

## Screenshot để đối chiếu:

### 1. Import Maven Project:
![Import](uploaded_image_0_1766815103713.png)

### 2. Package Explorer sau khi import:
Sẽ thấy project **backend** với icon Maven (M)

---

## ⚠️ Nếu vẫn lỗi "Cannot resolve dependencies"

1. Right-click project **backend**
2. **Maven** → **Update Project...**
3. Check **Force Update of Snapshots/Releases**
4. Click **OK**
5. Đợi download lại

---

## TÓM TẮT:
1. ❌ **KHÔNG** chọn backend làm workspace
2. ✅ **CÓ:** Chọn QuizHub làm workspace
3. ✅ **CÓ:** Import backend từ File → Import → Maven
