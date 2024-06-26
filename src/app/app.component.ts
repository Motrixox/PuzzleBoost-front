import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from '../app/header/header.component';
import { SudokuPageComponent } from './sudoku/sudoku-page/sudoku-page.component';
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        RouterLink,
        HeaderComponent,
        SudokuPageComponent,
        FooterComponent
    ]
})
export class AppComponent {
  title = 'PuzzleBoost';
}
