import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-call-now-fab',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './call-now-fab.component.html',
  styleUrls: ['./call-now-fab.component.scss']
})
export class CallNowFabComponent {
  phoneNumber = 'tel:+40XXXXXXXXX';
}
