import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

interface BlockedDate {
  start: string;
  end: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  blockedDates: BlockedDate[] = [];
  calendarDays: (number | null)[] = [];
  monthName = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBlockedDates();
    this.generateCalendar();
  }

  private loadBlockedDates(): void {
    this.http.get<{ blocked: BlockedDate[] }>('assets/data/calendar-mock.json').subscribe(data => {
      this.blockedDates = data.blocked;
      this.generateCalendar();
    });
  }

  private generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDays.push(i);
    }

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthName = `${monthNames[this.currentMonth]} ${this.currentYear}`;
  }

  isDateBlocked(day: number): boolean {
    if (!day) return false;
    const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.blockedDates.some(block => dateStr >= block.start && dateStr <= block.end);
  }

  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }
}
