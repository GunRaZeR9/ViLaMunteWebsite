import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent {
  rates = [
    {
      season: 'rates.seasonRules.high',
      price: '55 RON',
      description: 'Mai - Septembrie'
    },
    {
      season: 'rates.seasonRules.mid',
      price: '40 RON',
      description: 'martie, aprilie, octombrie'
    },
    {
      season: 'rates.seasonRules.low',
      price: '30 RON',
      description: 'noiembrie - februarie'
    }
  ];
}
