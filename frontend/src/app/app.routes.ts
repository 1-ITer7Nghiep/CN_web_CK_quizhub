import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'quiz',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./features/quiz/quiz-list/quiz-list.component').then(m => m.QuizListComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('./features/quiz/quiz-create/quiz-create.component').then(m => m.QuizCreateComponent)
            },
            {
                path: ':id/edit',
                loadComponent: () => import('./features/quiz/quiz-create/quiz-create.component').then(m => m.QuizCreateComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./features/quiz/quiz-detail/quiz-detail.component').then(m => m.QuizDetailComponent)
            }
        ]
    },
    {
        path: 'result',
        canActivate: [authGuard],
        loadComponent: () => import('./features/result/result.component').then(m => m.ResultComponent)
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/user/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'admin',
        canActivate: [authGuard], // Add AdminGuard later if needed, for now AuthGuard is enough to load, component checks role
        loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
