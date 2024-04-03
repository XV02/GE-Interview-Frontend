import { Component } from '@angular/core';
import { MainAppBarComponent } from '../../shared/main-app-bar/main-app-bar.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MainAppBarComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.sass'
})
export class LandingPageComponent {

}
