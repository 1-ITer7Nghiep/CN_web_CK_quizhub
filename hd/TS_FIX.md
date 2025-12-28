# Fix TypeScript Module Resolution

## Vấn đề
TypeScript Language Server chưa nhận diện được các module đã tạo.

## Giải pháp

### 1. Restart TypeScript Server trong VS Code
**Ctrl + Shift + P** → gõ "TypeScript: Restart TS Server"

### 2. Reload Window
**Ctrl + Shift + P** → gõ "Developer: Reload Window"

### 3. Kiểm tra lại paths
Đảm bảo các import paths đúng với cấu trúc thư mục.

### 4. Clear VS Code cache
Đóng VS Code hoàn toàn và mở lại project.

## Nếu vẫn lỗi

Chạy lệnh này để verify TypeScript config:
```bash
cd frontend
npx tsc --noEmit
```

Lệnh này sẽ check TypeScript errors mà không build.
