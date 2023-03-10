import { Component, Input } from '@angular/core';

@Component({
  selector: 'wky-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() companyTitle;
}
