import { Directive, ElementRef, Input, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[appFadeIn]', standalone: true })
export class FadeInDirective implements OnInit, OnDestroy {
  @Input() appFadeIn: 'up' | 'left' | 'right' | '' = 'up';
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;
    el.classList.add('animate', `animate--${this.appFadeIn || 'up'}`);
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          this.observer!.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
