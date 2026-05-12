import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-book-now',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, HeroComponent, FadeInDirective],
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss']
})
export class BookNowComponent implements OnInit {
  name = '';
  email = '';
  phone = '';
  checkIn = '';
  checkOut = '';
  groupType = '';
  persons = '';
  message = '';

  constructor(private seo: SeoService) {}

  ngOnInit(): void { this.seo.set('contact'); }

  submitForm(): void {
    if (this.name && this.email && this.message) {
      const body = encodeURIComponent(
        `Tip grup: ${this.groupType}\nCheck-in: ${this.checkIn}\nCheck-out: ${this.checkOut}\nPersoane: ${this.persons}\nTelefon: ${this.phone}\n\n${this.message}`
      );
      const subject = encodeURIComponent(`Cerere rezervare - ${this.name}`);
      window.location.href = `mailto:contact@viilamunte.ro?subject=${subject}&body=${body}`;
      this.resetForm();
    }
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.checkIn = '';
    this.checkOut = '';
    this.groupType = '';
    this.persons = '';
    this.message = '';
  }
}
