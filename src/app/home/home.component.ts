import { Component, computed, signal } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import info from './../mock/mock.json';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../mock/models/mock.model';
import { TechnologiesComponent } from '../technologies/technologies.component';
import { MyServicesComponent } from '../my-services/my-services.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    ProjectsComponent,
    TechnologiesComponent,
    ContactComponent,
    MyServicesComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  navData = signal<PortfolioData>(info);
  activeItem = signal<any>(null);
  mobileMenuOpen = false;

  projectsData = computed(() => this.navData()!.projects);
  techData = computed(() => this.navData()!.technologies);
  toolsData = computed(() => this.navData()!.tools);
  learningData = computed(() => this.navData()!.learning);
  aboutData = computed(() => this.navData()!.about);
  servicesData = computed(() => this.navData()!.services);
  testimonialsData = computed(() => this.navData()!.testimonial);
  // contactData = computed(() => this.navData()!.about.contact);
  aboutDataa() {
    console.log(this.servicesData());
  }
}
