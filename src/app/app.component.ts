import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './global-shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'wakya-frontend';
  constructor(private router: Router, public token: TokenService) {}
}
