import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OurStoryComponent } from './pages/our-story/our-story.component';
import { AmenitiesComponent } from './pages/amenities/amenities.component';
import { TeambuildingComponent } from './pages/teambuilding/teambuilding.component';
import { RulesComponent } from './pages/rules/rules.component';
import { BookNowComponent } from './pages/book-now/book-now.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'our-story', component: OurStoryComponent },
  { path: 'amenities', component: AmenitiesComponent },
  { path: 'teambuilding', component: TeambuildingComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'book-now', component: BookNowComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'cookie-policy', component: CookiePolicyComponent },
  { path: '**', redirectTo: '' }
];
