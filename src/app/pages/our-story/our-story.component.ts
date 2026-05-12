import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeroComponent, FadeInDirective],
  templateUrl: './our-story.component.html',
  styleUrls: ['./our-story.component.scss']
})
export class OurStoryComponent implements OnInit {
  attractionIndices = [0, 1, 2, 3, 4];

  attractionImages = [
    'assets/images/3.drumul/DJI_0326.webp',
    'assets/images/3.drumul/787.webp',
    'assets/images/3.drumul/DJI_0003.webp',
    'assets/images/1.HOMEPAGE/viilamunte%202.webp',
    'assets/images/1.HOMEPAGE/viilamunte%206.webp',
  ];

  constructor(private seo: SeoService) {}
  ngOnInit(): void { this.seo.set('gallery'); }
}
