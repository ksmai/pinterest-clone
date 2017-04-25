import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'pin-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class.dark-theme') dark = false;

  toggleLight(): void {
    this.dark = !this.dark;
  }
}
