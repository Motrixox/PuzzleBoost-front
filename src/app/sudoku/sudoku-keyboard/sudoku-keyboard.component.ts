import { Component, EventEmitter, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-sudoku-keyboard',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './sudoku-keyboard.component.html',
  styleUrl: './sudoku-keyboard.component.css'
})
export class SudokuKeyboardComponent {
  @Output() keyPressed: EventEmitter<number> = new EventEmitter<number>();

  insertNumber(key: number): void {
    this.keyPressed.emit(key);
  }
}
