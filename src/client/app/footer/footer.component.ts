import { Component } from '@angular/core';

@Component({
  selector: 'pin-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  author = 'ksmai';
  link = 'https://github.com/ksmai/pinterest-clone';
  year = (new Date()).getFullYear();
}
