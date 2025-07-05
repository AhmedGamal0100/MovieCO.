import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { formDeactivationGuard } from './guards/form-deactivation.guard';
import { HomeContainerComponent } from './pages/home-container/home-container.component';
import { homeGuard } from './guards/home.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: '', component: HomeContainerComponent, pathMatch: 'full' },
            { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.detailsComponent), pathMatch: 'full' }, 
            { path: 'details-tv/:id', loadComponent: () => import('./pages/details-tv/details-tv.component').then(m => m.DetailsTvComponent), pathMatch: 'full' },
            { path: 'wishlist', loadComponent: () => import('./pages/wish-list/wish-list.component').then(m => m.WishListComponent), pathMatch: 'full' },
            { path: 'playing', loadComponent: () => import('./pages/movies-playing/movies-playing.component').then(m => m.MoviesPlayingComponent), pathMatch: 'full' },
            { path: 'popular', loadComponent: () => import('./pages/movies-popular/movies-popular.component').then(m => m.MoviesPopularComponent), pathMatch: 'full' },
            { path: 'coming', loadComponent: () => import('./pages/movies-coming/movies-coming.component').then(m => m.MoviesComingComponent), pathMatch: 'full' },
            { path: 'tv-trend', loadComponent: () => import('./pages/tv-trend/tv-trend.component').then(m => m.TvTrendComponent), pathMatch: 'full' },
            { path: 'search', loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent), pathMatch: 'full' }
        ]
    },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), pathMatch: 'full' },
    { path: 'register', canDeactivate: [formDeactivationGuard], loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent) }
];
