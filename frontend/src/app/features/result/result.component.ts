import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModules } from '../../shared/modules/material.module';
import { ResultService } from '../../core/services/result.service';
import { AuthService } from '../../core/services/auth.service';
import { Result } from '../../shared/models/result.model';

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [CommonModule, ...MaterialModules],
    templateUrl: './result.component.html',
    styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
    results: Result[] = [];
    loading = false;

    constructor(
        private resultService: ResultService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadResults();
    }

    loadResults(): void {
        const user = this.authService.currentUser;
        if (!user) {
            this.snackBar.open('Vui lòng đăng nhập', 'Đóng', { duration: 3000 });
            this.router.navigate(['/login']);
            return;
        }

        this.loading = true;
        this.resultService.getUserResults(user.id).subscribe({
            next: (results) => {
                this.results = results;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading results:', err);
                this.snackBar.open('Lỗi khi tải kết quả', 'Đóng', { duration: 3000 });
                this.loading = false;
            }
        });
    }

    getScoreClass(score: number): string {
        if (score >= 80) return 'score-excellent';
        if (score >= 60) return 'score-good';
        return 'score-poor';
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    }

    backToQuizList(): void {
        this.router.navigate(['/quiz']);
    }
}
