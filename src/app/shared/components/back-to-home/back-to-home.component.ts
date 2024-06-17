import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-to-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './back-to-home.component.html',
  styleUrl: './back-to-home.component.scss'
})
export class BackToHomeComponent {

}
