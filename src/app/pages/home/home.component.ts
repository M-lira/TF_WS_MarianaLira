import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, MdbCarouselModule, MdbRippleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
