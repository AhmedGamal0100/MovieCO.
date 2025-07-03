import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { formDeactivationGuard } from './guards/form-deactivation.guard';
import { HomeContainerComponent } from './pages/home-container/home-container.component';

export const routes: Routes = [
    { path: '', redirectTo: 'movie/movies', pathMatch: 'full' },
    {
        path: 'movie', component: HomeComponent,
        children: [
            { path: 'movies', component: HomeContainerComponent, pathMatch: 'full' }
        ]
    },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), pathMatch: 'full' },
    { path: 'register', canDeactivate: [formDeactivationGuard], loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent) }
];
