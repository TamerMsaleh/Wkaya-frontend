import { Component, Input } from '@angular/core';

@Component({
  selector: 'wky-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent {
  @Input() companyTitle;
}
