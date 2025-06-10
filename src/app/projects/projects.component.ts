import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal, Signal } from '@angular/core';
import { Project } from '../mock/models/mock.model';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  @Input() projects!: Project[];
  galleryModal = false;

  displayGallery: boolean = false;
  displayedProjectImages: Signal<string[]> = signal([]);
  projectTitle: string = '';
  currentSlide: number = 0;

  loadModal(project: Project) {
    if (!project.images) {
      return;
    }
    this.projectTitle = project.title;
    this.displayedProjectImages = computed(() => project.images);
    this.galleryModal = true;
  }

  closeModal() {
    this.galleryModal = false;
    this.displayedProjectImages = signal([]);
    this.projectTitle = '';
    this.currentSlide = 0;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  nextSlide() {
    this.currentSlide =
      (this.currentSlide + 1) % this.displayedProjectImages().length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.displayedProjectImages().length) %
      this.displayedProjectImages().length;
  }
}
