import {HostListener, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MobileChecker {
  isMobile = false;

  checkIsMobile() {
    this.isMobile = matchMedia('(pointer:coarse)').matches;
  }
}
