import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { SeoService } from '../../services/seo.service';

interface PhotoCollection {
  label: string;
  images: string[];
  previewCount: number;
}

@Component({
  selector: 'app-teambuilding',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, HeroComponent, FadeInDirective],
  templateUrl: './teambuilding.component.html',
  styleUrls: ['./teambuilding.component.scss']
})
export class TeambuildingComponent implements OnInit, OnDestroy {
  featureIndices = [0, 1, 2, 3];
  activityIndices = [0, 1, 2, 3];

  galleryCollection: PhotoCollection = {
    label: 'Galerie Teambuilding',
    images: [
      'assets/images/4.teambuilding/teambuilding-biliard.webp',
      'assets/images/4.teambuilding/teambuilding-ciubar.webp',
      'assets/images/4.teambuilding/teambuilding-gratar.webp',
      'assets/images/4.teambuilding/teambuilding-sauna.webp',
    ],
    previewCount: 3,
  };

  lightboxOpen = false;
  lightboxImages: string[] = [];
  lightboxIndex = 0;
  lightboxLabel = '';

  constructor(private seo: SeoService) {}

  ngOnInit(): void { this.seo.set('calendar'); }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  openLightbox(): void {
    const col = this.galleryCollection;
    col.images.forEach(src => { const i = new Image(); i.src = src; });
    this.lightboxImages = col.images;
    this.lightboxIndex = 0;
    this.lightboxLabel = col.label;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  navigateLightbox(direction: 1 | -1): void {
    const len = this.lightboxImages.length;
    this.lightboxIndex = (this.lightboxIndex + direction + len) % len;
  }

  getCardPositionClass(index: number, total: number): string {
    if (total === 1) return 'tb-deck__card--solo';
    if (total === 2) return index === 0 ? 'tb-deck__card--left' : 'tb-deck__card--right';
    if (index === 0) return 'tb-deck__card--left';
    if (index === 1) return 'tb-deck__card--center';
    return 'tb-deck__card--right';
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape')     this.closeLightbox();
    if (event.key === 'ArrowRight') this.navigateLightbox(1);
    if (event.key === 'ArrowLeft')  this.navigateLightbox(-1);
  }
}
