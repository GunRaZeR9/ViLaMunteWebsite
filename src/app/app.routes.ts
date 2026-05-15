import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'our-story',
    loadComponent: () => import('./pages/our-story/our-story.component').then(m => m.OurStoryComponent)
  },
  {
    path: 'amenities',
    loadComponent: () => import('./pages/amenities/amenities.component').then(m => m.AmenitiesComponent)
  },
  {
    path: 'teambuilding',
    loadComponent: () => import('./pages/teambuilding/teambuilding.component').then(m => m.TeambuildingComponent)
  },
  {
    path: 'rules',
    loadComponent: () => import('./pages/rules/rules.component').then(m => m.RulesComponent)
  },
  {
    path: 'book-now',
    loadComponent: () => import('./pages/book-now/book-now.component').then(m => m.BookNowComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: 'cookie-policy',
    loadComponent: () => import('./pages/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent)
  },
  { path: '**', redirectTo: '' }
];
