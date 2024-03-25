import { Injectable } from '@angular/core';
import { SudokuBoard } from '../models/sudokuBoard.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  private apiBaseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getRandomSudoku(): Observable<SudokuBoard>{
    return this.http.get<SudokuBoard>(
      `${this.apiBaseUrl}/api/Sudoku/getRandomSudoku`
      );
  }

  getSudokuBySeed(seed: number): Observable<SudokuBoard>{
    return this.http.get<SudokuBoard>(
      `${this.apiBaseUrl}/api/Sudoku/GetSudokuBySeed/` + seed
      );
  }

  getSudokuByLevel(level: number): Observable<SudokuBoard>{
    return this.http.get<SudokuBoard>(
      `${this.apiBaseUrl}/api/Sudoku/GetSudokuByLevel/` + level
      );
  }

  solveSudoku(board: number[][]): Observable<number[][]>{
    return this.http.post<number[][]>(
      `${this.apiBaseUrl}/api/Sudoku/solveSudoku`,
      board
      );
  }
}