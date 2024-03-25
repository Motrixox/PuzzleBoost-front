import { Component } from '@angular/core';
import { SudokuCanvasComponent } from '../sudoku-canvas/sudoku-canvas.component';
import { SudokuKeyboardComponent } from '../sudoku-keyboard/sudoku-keyboard.component';

@Component({
  selector: 'app-sudoku-page',
  standalone: true,
  imports: [ 
    SudokuCanvasComponent, 
    SudokuKeyboardComponent
  ],
  templateUrl: './sudoku-page.component.html',
  styleUrl: './sudoku-page.component.css'
})
export class SudokuPageComponent {

}
