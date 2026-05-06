import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

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
  imports: [CommonModule, TranslateModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];

  constructor(
    private http: HttpClient,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.http.get<Review[]>('assets/data/reviews-mock.json').subscribe(data => {
      this.reviews = data;
    });
  }

  getReviewText(review: Review): string {
    return this.translate.currentLang === 'ro' ? review.text : review.textEn;
  }

  getRating(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
}
