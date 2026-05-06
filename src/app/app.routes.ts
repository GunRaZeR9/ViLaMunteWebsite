import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { RatesComponent } from './pages/rates/rates.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { RulesComponent } from './pages/rules/rules.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'rates', component: RatesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
