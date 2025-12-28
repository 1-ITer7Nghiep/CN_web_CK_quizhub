import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialModules } from '../../../shared/modules/material.module';
import { QuizService } from '../../../core/services/quiz.service';
import { AuthService } from '../../../core/services/auth.service';
import { QuizRequest, QuestionRequest } from '../../../shared/models/quiz.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-quiz-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
    templateUrl: './quiz-create.component.html',
    styleUrl: './quiz-create.component.css'
})
export class QuizCreateComponent implements OnInit {
    quizForm: FormGroup;
    isEditMode = false;
    quizId: number | null = null;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private quizService: QuizService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.quizForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            duration: [10, [Validators.required, Validators.min(1)]],
            questions: this.fb.array([])
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.quizId = Number(id);
            this.loadQuiz(this.quizId);
        } else {
            // Add first question by default only in create mode
            this.addQuestion();
        }
    }

    get questions(): FormArray {
        return this.quizForm.get('questions') as FormArray;
    }

    loadQuiz(id: number): void {
        this.loading = true;
        this.quizService.getQuizById(id).subscribe({
            next: (quiz) => {
                this.quizForm.patchValue({
                    title: quiz.title,
                    description: quiz.description,
                    duration: quiz.duration
                });

                // Clear default questions if any
                this.questions.clear();

                // Add questions from quiz
                if (quiz.questions) {
                    quiz.questions.forEach(q => {
                        const questionGroup = this.fb.group({
                            questionText: [q.questionText, Validators.required],
                            option1: [q.option1, Validators.required],
                            option2: [q.option2, Validators.required],
                            option3: [q.option3, Validators.required],
                            option4: [q.option4, Validators.required],
                            correctAnswer: [q.correctAnswer, Validators.required]
                        });
                        this.questions.push(questionGroup);
                    });
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading quiz:', err);
                this.snackBar.open('Lỗi khi tải thông tin quiz', 'Đóng', { duration: 3000 });
                this.router.navigate(['/quiz']);
            }
        });
    }

    addQuestion(): void {
        const questionGroup = this.fb.group({
            questionText: ['', Validators.required],
            option1: ['', Validators.required],
            option2: ['', Validators.required],
            option3: ['', Validators.required],
            option4: ['', Validators.required],
            correctAnswer: [1, Validators.required]
        });
        this.questions.push(questionGroup);
    }

    removeQuestion(index: number): void {
        if (this.questions.length > 1) {
            this.questions.removeAt(index);
        } else {
            this.snackBar.open('Quiz phải có ít nhất 1 câu hỏi', 'Đóng', { duration: 3000 });
        }
    }

    onSubmit(): void {
        if (this.quizForm.valid) {
            const user = this.authService.currentUser;
            if (!user) {
                this.snackBar.open('Vui lòng đăng nhập', 'Đóng', { duration: 3000 });
                return;
            }

            const quizData: QuizRequest = {
                ...this.quizForm.value,
                createdBy: user.id
            };

            if (this.isEditMode && this.quizId) {
                this.quizService.updateQuiz(this.quizId, quizData).subscribe({
                    next: () => {
                        this.snackBar.open('Cập nhật quiz thành công!', 'Đóng', { duration: 3000 });
                        this.router.navigate(['/quiz']);
                    },
                    error: (err) => {
                        console.error('Error updating quiz:', err);
                        this.snackBar.open('Lỗi khi cập nhật quiz', 'Đóng', { duration: 3000 });
                    }
                });
            } else {
                this.quizService.createQuiz(quizData).subscribe({
                    next: () => {
                        this.snackBar.open('Tạo quiz thành công!', 'Đóng', { duration: 3000 });
                        this.router.navigate(['/quiz']);
                    },
                    error: (err) => {
                        console.error('Error creating quiz:', err);
                        this.snackBar.open('Lỗi khi tạo quiz', 'Đóng', { duration: 3000 });
                    }
                });
            }
        }
    }

    cancel(): void {
        this.router.navigate(['/quiz']);
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (!file) return;

        const fileName = file.name.toLowerCase();

        // JSON Import (Legacy - Client side)
        if (fileName.endsWith('.json')) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                try {
                    const json = JSON.parse(e.target.result);
                    if (Array.isArray(json)) {
                        this.questions.clear();
                        this.processQuestions(json);
                        this.snackBar.open(`Đã nhập ${this.questions.length} câu hỏi từ JSON!`, 'Đóng', { duration: 3000 });
                    }
                } catch (error) {
                    this.snackBar.open('Lỗi đọc file JSON', 'Đóng', { duration: 3000 });
                }
            };
            reader.readAsText(file);
        }
        // Word/PDF Import (New - Server side)
        else if (fileName.endsWith('.docx') || fileName.endsWith('.pdf')) {
            this.loading = true;
            this.quizService.parseFile(file).subscribe({
                next: (questions) => {
                    this.loading = false;
                    if (questions && questions.length > 0) {
                        this.questions.clear();
                        this.processQuestions(questions);
                        this.snackBar.open(`Đã nhập ${questions.length} câu hỏi thành công!`, 'Đóng', { duration: 3000 });
                    } else {
                        this.snackBar.open('Không tìm thấy câu hỏi nào hợp lệ trong file', 'Đóng', { duration: 3000 });
                    }
                },
                error: (err) => {
                    this.loading = false;
                    console.error('Import error:', err);
                    this.snackBar.open('Lỗi khi import file. Kiểm tra lại định dạng!', 'Đóng', { duration: 3000 });
                }
            });
        }
        else {
            this.snackBar.open('Chỉ hỗ trợ file .json, .docx, .pdf', 'Đóng', { duration: 3000 });
        }
    }

    processQuestions(data: any[]): void {
        data.forEach(q => {
            if (q.questionText && q.option1 && q.option2 && q.option3 && q.option4 && q.correctAnswer) {
                const questionGroup = this.fb.group({
                    questionText: [q.questionText, Validators.required],
                    option1: [q.option1, Validators.required],
                    option2: [q.option2, Validators.required],
                    option3: [q.option3, Validators.required],
                    option4: [q.option4, Validators.required],
                    correctAnswer: [q.correctAnswer, Validators.required]
                });
                this.questions.push(questionGroup);
            }
        });
    }
}
