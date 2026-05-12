import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface PageMeta {
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private pages: Record<string, PageMeta> = {
    home: {
      title: 'ViiLa Munte — Cabană exclusivă în Munții Călimani',
      description:
        'ViiLa Munte Toplița - Cabană de lemn pentru 20 persoane în Munții Călimani. Închiriere integrală, biliard, saună, ciubăr și internet Starlink. Ideală pentru teambuilding și evenimente private.',
    },
    rates: {
      title: 'Cazare 20 persoane Toplița — Camere și Facilități | ViiLa Munte',
      description:
        'Descoperă ViiLa Munte, locația ideală pentru teambuilding în Harghita. Cabană în Călimani cu 20 de locuri, 7 băi, ciubăr și saună. Rezervă integral!',
    },
    calendar: {
      title: 'Teambuilding & Evenimente | ViiLa Munte Toplița',
      description:
        'Organizează un teambuilding de neuitat în inima munților. ViiLa Munte — cabană exclusivă pentru 20 de persoane în Munții Călimani.',
    },
    gallery: {
      title: 'Acces & Atracții Toplița | ViiLa Munte',
      description:
        'Cum ajungi la ViiLa Munte și ce poți vizita în zonă. Toplița, Munții Călimani, trasee montane, surse termale și atracții naturale.',
    },
    contact: {
      title: 'Rezervare & Contact | ViiLa Munte Toplița',
      description:
        'Rezervă ViiLa Munte — cabană exclusivă pentru 20 persoane în Munții Călimani. Contactează-ne pentru disponibilitate și prețuri.',
    },
  };

  constructor(private titleService: Title, private metaService: Meta) {}

  set(page: string): void {
    const p = this.pages[page];
    if (!p) return;
    this.titleService.setTitle(p.title);
    this.metaService.updateTag({ name: 'description', content: p.description });
    this.metaService.updateTag({ property: 'og:title', content: p.title });
    this.metaService.updateTag({ property: 'og:description', content: p.description });
  }
}
