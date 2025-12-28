import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModules } from '../../../shared/modules/material.module';
import { AuthService } from '../../../core/services/auth.service';
import { ReportService, Report } from '../../../core/services/report.service';
import { User } from '../../../shared/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, ...MaterialModules],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
    users: User[] = [];
    reports: Report[] = [];
    loading = false;

    constructor(
        private authService: AuthService,
        private reportService: ReportService,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    goBack(): void {
        this.router.navigate(['/quiz']);
    }

    ngOnInit(): void {
        this.loadUsers();
        this.loadReports();
    }

    loadUsers(): void {
        this.loading = true;
        this.authService.getAllUsers().subscribe({
            next: (users) => {
                this.users = users;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading users:', err);
                this.snackBar.open('Lỗi tải danh sách users', 'Đóng', { duration: 3000 });
                this.loading = false;
            }
        });
    }

    loadReports(): void {
        this.reportService.getAllReports().subscribe({
            next: (reports) => {
                this.reports = reports;
            },
            error: (err) => {
                console.error('Error loading reports:', err);
                this.snackBar.open('Lỗi tải danh sách báo cáo', 'Đóng', { duration: 3000 });
            }
        });
    }

    updateReportStatus(report: Report, status: string): void {
        // Map UI text 'Duyệt'/'Từ chối' to API status 'RESOLVED'/'REJECTED' if needed, 
        // but assuming HTML sends 'RESOLVED'/'REJECTED' directly.
        // If HTML sends 'Duyệt', map it:
        const apiStatus = status === 'Duyệt' ? 'RESOLVED' : (status === 'Từ chối' ? 'REJECTED' : status);

        this.reportService.updateReportStatus(report.id, apiStatus).subscribe({
            next: (updatedReport) => {
                if (status === 'RESOLVED' || status === 'REJECTED') {
                    this.reports = this.reports.filter(r => r.id !== report.id);
                    this.snackBar.open('Đã xử lý và xóa báo cáo', 'Đóng', { duration: 3000 });
                } else {
                    report.status = updatedReport.status;
                    this.snackBar.open('Cập nhật trạng thái thành công', 'Đóng', { duration: 3000 });
                }
            },
            error: (err) => {
                console.error('Error updating report:', err);
                this.snackBar.open('Lỗi cập nhật trạng thái', 'Đóng', { duration: 3000 });
            }
        });
    }
}
