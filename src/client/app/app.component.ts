import { Component, HostBinding, OnInit } from '@angular/core';

import { StorageService } from './core/storage.service';

@Component({
  selector: 'pin-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class.dark-theme') dark = false;

  constructor(private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.dark = !!this.storageService.getItem('dark');
  }

  toggleLight(): void {
    this.dark = !this.dark;
    this.storageService.setItem('dark', this.dark);
  }
}
