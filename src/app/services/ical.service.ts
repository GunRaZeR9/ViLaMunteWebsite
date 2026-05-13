import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IcalService {
  private http = inject(HttpClient);

  /**
   * Your Airbnb listing iCal URL.
   * Find it at: Airbnb Host dashboard → Calendar → Export Calendar (link at the bottom).
   * Replace the placeholder below with your actual URL.
   */
  private readonly AIRBNB_ICAL_URL =
    'https://www.airbnb.com/calendar/ical/YOUR_LISTING_ID.ics?s=YOUR_SECRET';

  private readonly PROXY_URL = '/ical-proxy.php';
  private readonly CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

  private cache$: Observable<Date[]> | null = null;
  private cacheTime = 0;

  getBlockedDates(): Observable<Date[]> {
    const now = Date.now();
    if (this.cache$ && now - this.cacheTime < this.CACHE_TTL_MS) {
      return this.cache$;
    }
    this.cacheTime = now;
    this.cache$ = this.http
      .get(`${this.PROXY_URL}?url=${encodeURIComponent(this.AIRBNB_ICAL_URL)}`, {
        responseType: 'text',
      })
      .pipe(
        map(ics => this.parseBlockedDates(ics)),
        catchError(() => of([] as Date[])),
        shareReplay(1)
      );
    return this.cache$;
  }

  private parseBlockedDates(icsText: string): Date[] {
    const blocked = new Set<string>();
    const events = icsText.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) ?? [];

    for (const event of events) {
      const startMatch = event.match(/DTSTART(?:;[^:]*)?:(\d{8})/);
      const endMatch = event.match(/DTEND(?:;[^:]*)?:(\d{8})/);
      if (!startMatch || !endMatch) continue;

      const start = this.parseIcsDate(startMatch[1]);
      const end = this.parseIcsDate(endMatch[1]);
      const cur = new Date(start);

      while (cur < end) {
        blocked.add(this.toKey(cur));
        cur.setDate(cur.getDate() + 1);
      }
    }

    return Array.from(blocked).map(key => new Date(key + 'T00:00:00'));
  }

  private parseIcsDate(s: string): Date {
    return new Date(
      parseInt(s.slice(0, 4)),
      parseInt(s.slice(4, 6)) - 1,
      parseInt(s.slice(6, 8))
    );
  }

  toKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
