import { Component } from '@angular/core';
import { SudokuCanvasComponent } from '../sudoku-canvas/sudoku-canvas.component';
import { SudokuKeyboardComponent } from '../sudoku-keyboard/sudoku-keyboard.component';

@Component({
  selector: 'app-sudoku-solver-page',
  standalone: true,
  imports: [
    SudokuCanvasComponent,
    SudokuKeyboardComponent
  ],
  templateUrl: './sudoku-solver-page.component.html',
  styleUrl: './sudoku-solver-page.component.css'
})
export class SudokuSolverPageComponent {

}
