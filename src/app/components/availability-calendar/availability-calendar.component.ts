import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IcalService } from '../../services/ical.service';

interface CalDay {
  date: Date | null;
  key: string;
  isBlocked: boolean;
  isPast: boolean;
  isToday: boolean;
}

interface CalMonth {
  label: string;
  weeks: CalDay[][];
}

@Component({
  selector: 'app-availability-calendar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.scss'],
})
export class AvailabilityCalendarComponent implements OnInit {
  private ical = inject(IcalService);
  private translate = inject(TranslateService);

  loading = signal(true);
  hasError = signal(false);
  private blockedSet = signal<Set<string>>(new Set());

  readonly DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  months = computed<CalMonth[]>(() => {
    const today = new Date();
    const blocked = this.blockedSet();
    const locale = this.translate.currentLang === 'ro' ? 'ro-RO' : 'en-US';
    return [0, 1].map(i => this.buildMonth(today, i, blocked, locale));
  });

  ngOnInit(): void {
    this.ical.getBlockedDates().subscribe({
      next: dates => {
        this.blockedSet.set(new Set(dates.map(d => this.ical.toKey(d))));
        this.loading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.loading.set(false);
      },
    });
  }

  private buildMonth(
    today: Date,
    monthOffset: number,
    blocked: Set<string>,
    locale: string
  ): CalMonth {
    const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = base.getFullYear();
    const month = base.getMonth();
    const label = base.toLocaleDateString(locale, { month: 'long', year: 'numeric' });

    const todayKey = this.ical.toKey(today);
    const firstDow = (base.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: CalDay[] = [];
    for (let i = 0; i < firstDow; i++) {
      cells.push({ date: null, key: '', isBlocked: false, isPast: false, isToday: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const key = this.ical.toKey(date);
      cells.push({
        date,
        key,
        isBlocked: blocked.has(key),
        isPast: key < todayKey,
        isToday: key === todayKey,
      });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ date: null, key: '', isBlocked: false, isPast: false, isToday: false });
    }

    const weeks: CalDay[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }

    return { label, weeks };
  }
}
