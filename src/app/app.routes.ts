import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OurStoryComponent } from './pages/our-story/our-story.component';
import { AmenitiesComponent } from './pages/amenities/amenities.component';
import { TeambuildingComponent } from './pages/teambuilding/teambuilding.component';
import { RulesComponent } from './pages/rules/rules.component';
import { BookNowComponent } from './pages/book-now/book-now.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: OurStoryComponent },
  { path: 'rates', component: AmenitiesComponent },
  { path: 'calendar', component: TeambuildingComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'contact', component: BookNowComponent },
  { path: '**', redirectTo: '' }
];
