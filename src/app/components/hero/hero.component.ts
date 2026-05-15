import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Input() imageUrl: string = 'assets/images/2023/07/DJI_0682.jpg';
  @Input() imageAlt: string = 'ViiLa Munte';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showCta: boolean = true;
}
