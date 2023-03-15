import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuItems = new BehaviorSubject([]);
  currentLang = new BehaviorSubject(false);
  constructor() {}
}
