import { Component, computed, inject, Input, Signal } from '@angular/core';
import { Service, ServiceLangs } from '../mock/models/mock.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.scss',
})
export class MyServicesComponent {
  @Input() services!: Service[];

  private translationService = inject(TranslationService);

  currentLanguage: Signal<string> = computed(() =>
    this.translationService.lang()
  );

  allServices: Signal<ServiceLangs[]> = computed(() => {
    return this.currentLanguage() === 'en'
      ? this.services.flatMap((srvcs) => srvcs.en)
      : this.services.flatMap((srvcs) => srvcs.es);
  });

  trackById(index: number): number {
    return index;
  }
}
