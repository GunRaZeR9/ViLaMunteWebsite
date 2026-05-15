import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { SeoService } from '../../services/seo.service';

interface RoomCollection {
  key: string;
  label: string;
  labelKey: string;
  descriptionKey: string;
  images: string[];
  previewCount: number;
}

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, HeroComponent, FadeInDirective],
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit, OnDestroy {
  kitchenItems = [0, 1, 2, 3, 4, 5, 6, 7];

  roomCollections: RoomCollection[] = [
    {
      key: 'apt',
      label: 'Apartament',
      labelKey: 'cabin.rooms.label.apt',
      descriptionKey: 'cabin.rooms.apt',
      images: [
        'assets/images/2.cabana/camera-2-pers-1.webp',
        'assets/images/2.cabana/camera-2-pers-2.webp',
        'assets/images/2.cabana/camera-2-pers-3.webp',
      ],
      previewCount: 3,
    },
    {
      key: 'double',
      label: 'Cameră Dublă',
      labelKey: 'cabin.rooms.label.double',
      descriptionKey: 'cabin.rooms.double',
      images: Array.from({ length: 7 }, (_, i) =>
        `assets/images/2.cabana/camera-2-pers-${i + 4}.webp`),
      previewCount: 3,
    },
    {
      key: 'triple',
      label: 'Cameră Triplă',
      labelKey: 'cabin.rooms.label.triple',
      descriptionKey: 'cabin.rooms.triple',
      images: [
        'assets/images/2.cabana/camera-3-pers-1.webp',
        'assets/images/2.cabana/camera-3-pers-2.webp',
        'assets/images/2.cabana/camera-3-pers-baie-1.webp',
      ],
      previewCount: 3,
    },
    {
      key: 'mansard',
      label: 'Cameră Mansardă',
      labelKey: 'cabin.rooms.label.mansard',
      descriptionKey: 'cabin.rooms.mansard',
      images: [
        'assets/images/2.cabana/camera-3-pers-baie-1.webp',
        'assets/images/2.cabana/camera-3-pers-1.webp',
        'assets/images/2.cabana/camera-3-pers-2.webp',
      ],
      previewCount: 3,
    },
  ];

  lightboxOpen = false;
  lightboxImages: string[] = [];
  lightboxIndex = 0;
  lightboxLabel = '';

  constructor(private seo: SeoService, @Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void { this.seo.set('rates'); }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = '';
  }

  openLightbox(collection: RoomCollection): void {
    if (isPlatformBrowser(this.platformId)) {
      collection.images.forEach(src => { const i = new Image(); i.src = src; });
    }
    this.lightboxImages = collection.images;
    this.lightboxIndex = 0;
    this.lightboxLabel = collection.label;
    this.lightboxOpen = true;
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = '';
  }

  navigateLightbox(direction: 1 | -1): void {
    const len = this.lightboxImages.length;
    this.lightboxIndex = (this.lightboxIndex + direction + len) % len;
  }

  getCardPositionClass(index: number, total: number): string {
    if (total === 1) return 'room-deck__card--solo';
    if (total === 2) return index === 0 ? 'room-deck__card--left' : 'room-deck__card--right';
    if (index === 0) return 'room-deck__card--left';
    if (index === 1) return 'room-deck__card--center';
    return 'room-deck__card--right';
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape')     this.closeLightbox();
    if (event.key === 'ArrowRight') this.navigateLightbox(1);
    if (event.key === 'ArrowLeft')  this.navigateLightbox(-1);
  }
}
