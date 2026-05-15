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

  private groupTypeLabel(): string {
    const map: Record<string, string> = {
      friends: 'Prieteni / Familie',
      teambuilding: 'Team-building',
      event: 'Eveniment privat',
    };
    return map[this.groupType] || '—';
  }

  submitForm(): void {
    if (this.name && this.message) {
      const lines = [
        `Bună ziua! Doresc să fac o rezervare la ViiLa Munte.`,
        ``,
        `👤 Nume: ${this.name}`,
        this.email ? `✉️ Email: ${this.email}` : null,
        this.phone ? `📞 Telefon: ${this.phone}` : null,
        this.checkIn ? `📅 Check-in: ${this.checkIn}` : null,
        this.checkOut ? `📅 Check-out: ${this.checkOut}` : null,
        this.groupType ? `👥 Tip grup: ${this.groupTypeLabel()}` : null,
        this.persons ? `🧑‍🤝‍🧑 Persoane: ${this.persons}` : null,
        ``,
        `💬 ${this.message}`,
      ]
        .filter((l) => l !== null)
        .join('\n');

      window.open(`https://wa.me/40740618773?text=${encodeURIComponent(lines)}`, '_blank');
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
