import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, NgClass, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  translationService = inject(TranslateService);
  cLang = inject(TranslationService);
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  isMobile = false;
  isOverflowing = false;
  lang: Signal<string> = computed(() => this.cLang.lang());
  activeDropdown = signal<'cv' | 'lang' | null>(null);
  @ViewChild('cv') cv!: ElementRef<HTMLButtonElement>;
  @ViewChild('toggleLang') toggleLang!: ElementRef<HTMLButtonElement>;

  ngOnInit() {
    document.documentElement.classList.add('darkTheme');
  }

  scrolltoSection(sectionId: string): void {
    setTimeout(() => {
      const el = document.querySelector(`#${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Elemento con id ${sectionId} no encontrado`);
      }
    }, 100);
  }

  toggleLanguage(lang: string) {
    this.translationService.use(lang);
    this.cLang.setCurrentLang(lang);
  }

  moveToSection() {
    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
  }

  donwloadCV(type: string) {
    const link = document.createElement('a');
    link.href = `assets/cv/cv-${type}.pdf`; // Path to your CV file
    link.download = 'CV.pdf'; // Name of the downloaded file
    link.click();
  }

  ngAfterViewInit(): void {
    this.checkState();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkState();
  }

  checkState() {
    const width = window.innerWidth;
    this.isMobile = width < 768; // sm breakpoint de Tailwind
    this.isOverflowing =
      this.menuContainer?.nativeElement.scrollWidth >
      this.menuContainer?.nativeElement.clientWidth;
  }

  getGropdownPosition(): string {
    // Si es móvil => dropdown-top
    if (this.isMobile) return 'dropdown-top';
    // Si hay overflow => dropdown normal (hacia abajo)
    return this.isOverflowing ? 'dropdown' : '';
  }

  toggleTheme(): void {
    const root = document.documentElement;
    const currentTheme = root.classList.contains('lightTheme')
      ? 'lightTheme'
      : 'darkTheme';
    const newTheme = currentTheme === 'lightTheme' ? 'darkTheme' : 'lightTheme';

    root.classList.remove(currentTheme);
    root.classList.add(newTheme);
  }

  toggleDropdown(menu: 'cv' | 'lang' | null): void {
    // const current = this.activeDropdown(); // lee el valor actual

    // Si ya está abierto el mismo menú, lo cerramos
    // if (current === menu) {
    //   this.activeDropdown.set(null);
    //   return;
    // }

    // Abrimos el nuevo menú
    this.activeDropdown.set(menu);

    // Cerramos el otro si estaba abierto
    if (menu === 'cv' && this.activeDropdown() === 'lang') {
      this.toggleLang.nativeElement.click();
    } else if (menu === 'lang' && this.activeDropdown() === 'cv') {
      this.cv.nativeElement.click();
    }
  }
}
