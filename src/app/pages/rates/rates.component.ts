import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, HeroComponent, FadeInDirective],
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  kitchenItems = [0, 1, 2, 3, 4, 5, 6, 7];

  roomImages = [
    'assets/images/2.cabana/DDM02737-HDR.webp',
    'assets/images/2.cabana/DDM02742-HDR.webp',
    'assets/images/2.cabana/DDM02745-HDR.webp',
    'assets/images/2.cabana/DDM02748-HDR.webp',
  ];

  constructor(private seo: SeoService) {}
  ngOnInit(): void { this.seo.set('rates'); }
}
