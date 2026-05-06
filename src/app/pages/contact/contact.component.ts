import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://maps.google.com/maps?q=Balan,+Harghita,+Romania&output=embed'
    );
  }

  submitForm(): void {
    if (this.name && this.email && this.message) {
      const mailtoLink = `mailto:contact@viilamunte.ro?subject=Contact from ${this.name}&body=${this.message}`;
      window.location.href = mailtoLink;
      this.resetForm();
    }
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
