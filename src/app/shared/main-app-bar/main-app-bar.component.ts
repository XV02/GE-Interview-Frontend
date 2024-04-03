import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-app-bar',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './main-app-bar.component.html',
  styleUrl: './main-app-bar.component.sass'
})
export class MainAppBarComponent {
  isLoggedIn: boolean = false;

}
