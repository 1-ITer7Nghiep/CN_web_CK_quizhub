import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModules } from '../../../shared/modules/material.module';
import { QuizService } from '../../../core/services/quiz.service';
import { AuthService } from '../../../core/services/auth.service';
import { ReportService } from '../../../core/services/report.service';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { Quiz } from '../../../shared/models/quiz.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-quiz-list',
    standalone: true,
    imports: [CommonModule, ...MaterialModules],
    templateUrl: './quiz-list.component.html',
    styleUrl: './quiz-list.component.css'
})
export class QuizListComponent implements OnInit {
    quizzes: Quiz[] = [];
    loading = false;
    notifications: Notification[] = [];
    unreadCount = 0;

    constructor(
        private quizService: QuizService,
        public authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private reportService: ReportService,
        private notificationService: NotificationService
    ) { }

    // ... existing code ...

    reportQuiz(event: Event, quiz: Quiz): void {
        event.stopPropagation(); // Prevent navigating to quiz detail
        const user = this.authService.currentUser;
        if (!user) {
            this.snackBar.open('Vui lòng đăng nhập để báo cáo', 'Đóng', { duration: 3000 });
            return;
        }

        const reason = prompt(`Nhập lý do báo cáo quiz "${quiz.title}":`);
        if (reason) {
            this.reportService.createReport({
                quizId: quiz.id,
                reporterId: user.id,
                reason: reason
            }).subscribe({
                next: () => {
                    this.snackBar.open('Đã gửi báo cáo thành công', 'Đóng', { duration: 3000 });
                },
                error: (err) => {
                    console.error('Error reporting quiz:', err);
                    this.snackBar.open('Lỗi khi gửi báo cáo', 'Đóng', { duration: 3000 });
                }
            });
        }
    }

    ngOnInit(): void {
        this.loadQuizzes();
        this.loadNotifications();
        this.notificationService.unreadCount$.subscribe(count => {
            this.unreadCount = count;
        });
    }

    loadNotifications(): void {
        const user = this.authService.currentUser;
        if (user) {
            this.notificationService.getUserNotifications(user.id).subscribe(notifs => {
                this.notifications = notifs;
            });
            this.notificationService.getUnreadCount(user.id).subscribe();
        }
    }

    markAsRead(notification: Notification): void {
        if (!notification.read) {
            this.notificationService.markAsRead(notification.id).subscribe(() => {
                notification.read = true;
            });
        }
    }

    loadQuizzes(): void {
        this.loading = true;
        this.quizService.getAllQuizzes().subscribe({
            next: (quizzes) => {
                this.quizzes = quizzes;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading quizzes:', err);
                this.snackBar.open('Lỗi khi tải danh sách quiz', 'Đóng', { duration: 3000 });
                this.loading = false;
            }
        });
    }

    startQuiz(quizId: number): void {
        this.router.navigate(['/quiz', quizId]);
    }

    canDelete(quiz: Quiz): boolean {
        const user = this.authService.currentUser;
        if (!user) return false;
        return quiz.createdBy === user.id || this.authService.isAdmin();
    }

    deleteQuiz(quiz: Quiz): void {
        if (confirm(`Bạn có chắc chắn muốn xóa quiz "${quiz.title}"?`)) {
            const user = this.authService.currentUser!;
            this.quizService.deleteQuiz(quiz.id, user.id, this.authService.isAdmin()).subscribe({
                next: () => {
                    this.snackBar.open('Xóa quiz thành công!', 'Đóng', { duration: 3000 });
                    this.loadQuizzes();
                },
                error: (err) => {
                    console.error('Error deleting quiz:', err);
                    this.snackBar.open('Lỗi khi xóa quiz', 'Đóng', { duration: 3000 });
                }
            });
        }
    }

    createQuiz(): void {
        this.router.navigate(['/quiz/create']);
    }

    editQuiz(quizId: number): void {
        this.router.navigate(['/quiz', quizId, 'edit']);
    }

    viewResults(): void {
        this.router.navigate(['/result']);
    }

    goToAdmin(): void {
        this.router.navigate(['/admin']);
    }

    goToProfile(): void {
        this.router.navigate(['/profile']);
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
