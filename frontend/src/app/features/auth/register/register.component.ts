import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModules } from '../../../shared/modules/material.module';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(5)]],
            confirmPassword: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const { username, password, confirmPassword } = this.registerForm.value;

            if (password !== confirmPassword) {
                this.snackBar.open('Mật khẩu không khớp!', 'Đóng', { duration: 3000 });
                return;
            }

            this.authService.register(username, password).subscribe({
                next: () => {
                    this.snackBar.open('Đăng ký thành công!', 'Đóng', { duration: 3000 });
                    this.router.navigate(['/quiz']);
                },
                error: (err) => {
                    this.snackBar.open('Đăng ký thất bại. Tên đăng nhập có thể đã tồn tại.', 'Đóng', { duration: 3000 });
                    console.error('Register error:', err);
                }
            });
        }
    }

    goToLogin(): void {
        this.router.navigate(['/login']);
    }
}
