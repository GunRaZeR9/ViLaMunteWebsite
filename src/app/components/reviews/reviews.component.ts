import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  textEn: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TranslateModule, AsyncPipe],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  private http = inject(HttpClient);
  public translate = inject(TranslateService);

  reviews$: Observable<Review[]> = this.http.get<Review[]>('assets/data/reviews-mock.json');

  getReviewText(review: Review): string {
    return this.translate.currentLang === 'ro' ? review.text : review.textEn;
  }

  getRating(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
}
