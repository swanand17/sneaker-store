import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sneaker-store';
  sidenavOpened = false;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  @HostBinding('class') className = '';

  themeControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  isDarkModeSelected(darkModeActive: any) {
    this.themeControl.setValue(darkModeActive);
    this.className = darkModeActive ? 'darkMode' : '';
  }

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
    this.sidenav?.toggle(this.sidenavOpened);
  }

  toggleTheme() {
    this.isDarkModeSelected(this.themeControl.value);
  }
}
