import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModules } from '../../../shared/modules/material.module';
import { QuizService } from '../../../core/services/quiz.service';
import { ResultService } from '../../../core/services/result.service';
import { AuthService } from '../../../core/services/auth.service';
import { ReportService } from '../../../core/services/report.service';
import { Quiz } from '../../../shared/models/quiz.model';
import { Question } from '../../../shared/models/question.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-quiz-detail',
    standalone: true,
    imports: [CommonModule, ...MaterialModules],
    templateUrl: './quiz-detail.component.html',
    styleUrl: './quiz-detail.component.css'
})
export class QuizDetailComponent implements OnInit, OnDestroy {
    quiz: Quiz | null = null;
    questions: Question[] = [];
    answers: { [key: number]: number } = {};
    timeLeft: number = 0;
    timerInterval: any;
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private quizService: QuizService,
        private resultService: ResultService,
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.loadQuiz(id);
    }

    ngOnDestroy(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    loadQuiz(id: number): void {
        this.loading = true;
        this.quizService.getQuizById(id).subscribe({
            next: (quiz) => {
                this.quiz = quiz;
                this.timeLeft = quiz.duration * 60; // Convert to seconds
                this.startTimer();
                this.questions = quiz.questions || [];
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading quiz:', err);
                this.snackBar.open('Lỗi khi tải quiz', 'Đóng', { duration: 3000 });
                this.router.navigate(['/quiz']);
            }
        });
    }

    startTimer(): void {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.submitQuiz();
            }
        }, 1000);
    }

    get formattedTime(): string {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    selectAnswer(questionId: number, answer: number): void {
        this.answers[questionId] = answer;
    }

    isSelected(questionId: number, option: number): boolean {
        return this.answers[questionId] === option;
    }

    submitQuiz(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // Calculate score
        let correctAnswers = 0;
        this.questions.forEach(q => {
            const userAnswer = this.answers[q.id];
            // Debug log
            console.log(`Q${q.id}: User=${userAnswer} (type ${typeof userAnswer}), Correct=${q.correctAnswer} (type ${typeof q.correctAnswer})`);

            if (userAnswer !== undefined && Number(userAnswer) === Number(q.correctAnswer)) {
                correctAnswers++;
            }
        });

        const score = (correctAnswers / this.questions.length) * 100;
        const user = this.authService.currentUser;

        if (!user) {
            this.snackBar.open('Lỗi xác thực người dùng', 'Đóng', { duration: 3000 });
            return;
        }

        // Save result
        this.resultService.saveResult({
            userId: user.id,
            quizId: this.quiz!.id,
            score: score,
            quizTitle: this.quiz!.title
        }).subscribe({
            next: () => {
                this.snackBar.open(`Hoàn thành! Điểm: ${score.toFixed(2)}%`, 'Đóng', { duration: 5000 });
                this.router.navigate(['/result']);
            },
            error: (err) => {
                console.error('Error saving result:', err);
                this.snackBar.open('Lỗi khi lưu kết quả', 'Đóng', { duration: 3000 });
            }
        });
    }

    getOption(question: Question, optionNumber: number): string {
        switch (optionNumber) {
            case 1: return question.option1;
            case 2: return question.option2;
            case 3: return question.option3;
            case 4: return question.option4;
            default: return '';
        }
    }
}
