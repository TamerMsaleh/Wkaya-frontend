import { Component ,Input} from '@angular/core';

@Component({
  selector: 'wky-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() id;
  scrollToView(){
    let offset = 50; // sticky nav height
    let el = document.getElementById('signup') as any; // element you are scrolling to
    el.scrollIntoView({ top: (el.offsetTop - offset), left: 0, behavior: 'smooth' });
  }
}
