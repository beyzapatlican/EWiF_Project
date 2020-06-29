import {Component, Injector, OnInit} from '@angular/core';
import {MobileChecker} from '../services/mobile-checker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'EWiF-Project';

  constructor(private mobileChecker: MobileChecker) {}

  ngOnInit() {
    this.mobileChecker.checkIsMobile();
  }

}
