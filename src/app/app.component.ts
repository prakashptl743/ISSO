import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutoLogoutService } from './services/autologout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogger';
  checked: boolean;
  constructor(public router: Router,private service: AutoLogoutService) {}
}
