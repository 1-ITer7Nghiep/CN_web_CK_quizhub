import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModules } from '../../../shared/modules/material.module';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            this.authService.login(username, password).subscribe({
                next: () => {
                    this.snackBar.open('Đăng nhập thành công!', 'Đóng', { duration: 3000 });
                    this.router.navigate(['/quiz']);
                },
                error: (err) => {
                    this.snackBar.open('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.', 'Đóng', { duration: 3000 });
                    console.error('Login error:', err);
                }
            });
        }
    }

    goToRegister(): void {
        this.router.navigate(['/register']);
    }
}
