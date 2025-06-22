import { Component, Input, OnInit } from '@angular/core';
import { Technology, Testimonial, Tool } from '../mock/models/mock.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss',
})
export class TechnologiesComponent implements OnInit {
  @Input() technologies!: Technology[];
  @Input() tools!: Tool[];
  @Input() learning!: Tool[];
  @Input() testimonials!: Testimonial[];

  currentSlide = 0;
  slideWidth = 20;
  intervalId: any;
  isPaused = true;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.clearCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      const maxIndex = this.technologies.length - 4;
      this.currentSlide = (this.currentSlide + 1) % (maxIndex + 1);
    }, 1200);
  }

  clearCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  pauseCarousel() {
    this.clearCarousel();
  }

  resumeCarousel() {
    this.startCarousel();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  trackById(index: number): number {
    return index;
  }

  trackByIdTool(index: number): number {
    return index;
  }

  trackByIdLearning(index: number): number {
    return index;
  }

  trackByIdTestimonial(index: number): number {
    return index;
  }
}
