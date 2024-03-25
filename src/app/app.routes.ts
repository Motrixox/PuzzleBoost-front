import { Routes } from '@angular/router';
import { SudokuPageComponent } from './sudoku/sudoku-page/sudoku-page.component';
import { SudokuSolverPageComponent } from './sudoku/sudoku-solver-page/sudoku-solver-page.component';
import { SudokuPrinterComponent } from './sudoku/sudoku-printer/sudoku-printer.component';

export const routes: Routes = [
    {path: '', component:SudokuPageComponent},
    {path: 'sudoku', component:SudokuPageComponent},
    {path: 'solver', component:SudokuSolverPageComponent},
    {path: 'print', component:SudokuPrinterComponent}
];
