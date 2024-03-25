import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    MatIcon,
    MatDivider
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
