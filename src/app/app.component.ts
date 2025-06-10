import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
  private translate = inject(TranslateService);

  constructor() {
    // Configura los idiomas disponibles y el idioma por defecto
    this.translate.setDefaultLang('es'); // Establece 'es' como idioma por defecto

    // Intenta usar el idioma guardado o el del navegador, o recurre al por defecto
    const browserLang = this.translate.getBrowserLang();
    const currentLang = browserLang?.match(/en|es/) ? browserLang : 'es'; // Ajusta 'en|es' a tus idiomas
    this.translate.use(currentLang); // Establece el idioma inicial a usar

    // console.log('Idioma por defecto:', this.translate.getDefaultLang());
    // console.log('Idioma actual:', this.translate.currentLang);
  }
}
