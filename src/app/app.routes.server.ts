import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '',               renderMode: RenderMode.Prerender },
  { path: 'our-story',      renderMode: RenderMode.Prerender },
  { path: 'amenities',      renderMode: RenderMode.Prerender },
  { path: 'teambuilding',   renderMode: RenderMode.Prerender },
  { path: 'rules',          renderMode: RenderMode.Prerender },
  { path: 'book-now',       renderMode: RenderMode.Prerender },
  { path: 'terms',          renderMode: RenderMode.Prerender },
  { path: 'privacy-policy', renderMode: RenderMode.Prerender },
  { path: 'cookie-policy',  renderMode: RenderMode.Prerender },
  { path: '**',             renderMode: RenderMode.Client },
];
