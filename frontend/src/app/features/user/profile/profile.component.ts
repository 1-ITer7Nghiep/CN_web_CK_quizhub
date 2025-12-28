import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MaterialModules } from '../../../shared/modules/material.module';
import { AuthService } from '../../../core/services/auth.service';
import { QuizService } from '../../../core/services/quiz.service';
import { User } from '../../../shared/models/user.model';
import { Quiz } from '../../../shared/models/quiz.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ...MaterialModules],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  myQuizzes: Quiz[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    if (this.user && this.user.id) {
      this.loadMyQuizzes(this.user.id);
    }
  }

  loadMyQuizzes(userId: number): void {
    this.loading = true;
    this.quizService.getQuizzesByUser(userId).subscribe({
      next: (quizzes) => {
        this.myQuizzes = quizzes;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading my quizzes', err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/quiz']);
  }

  startQuiz(id: number): void {
    this.router.navigate(['/quiz', id]);
  }
}
