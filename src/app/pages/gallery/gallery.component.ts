import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: string[] = [];
  selectedImage: string | null = null;

  ngOnInit(): void {
    this.loadGalleryImages();
  }

  private loadGalleryImages(): void {
    this.images = [
      'assets/images/2021/02/21.jpg',
      'assets/images/2021/02/WhatsApp-Image-2021-02-10-at-16.10.11.jpeg',
      'assets/images/2021/09/003-1-1024x576.jpg',
    ].filter(img => img);
  }

  openLightbox(image: string): void {
    this.selectedImage = image;
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }
}
