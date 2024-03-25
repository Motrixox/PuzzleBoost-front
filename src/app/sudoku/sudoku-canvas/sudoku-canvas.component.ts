import { Component, ElementRef, ViewChild, AfterViewInit, Input, booleanAttribute, OnDestroy, HostListener } from '@angular/core';
import { SudokuService } from '../../../services/sudoku.service';

@Component({
  selector: 'app-sudoku-canvas',
  standalone: true,
  imports: [],
  templateUrl: './sudoku-canvas.component.html',
  styleUrl: './sudoku-canvas.component.css'
})
export class SudokuCanvasComponent implements AfterViewInit {
  @ViewChild('sudokuCanvas', { static: true }) sudokuCanvasRef!: ElementRef<HTMLCanvasElement>;
  @Input({ transform: booleanAttribute }) solverMode: boolean;
  @Input({ transform: booleanAttribute }) printerMode: boolean;

  cellSize!: number;
  boardStart!: number[][]; 
  board!: number[][];
  solution!: number[][];
  selectedCell = { x: -1, y: -1 };
  ctx!: CanvasRenderingContext2D;
  sudokuId: number;
  difficulty: number;
  mistakes: number;



  constructor(private sudokuService: SudokuService)
  {
    this.solverMode = false;
    this.printerMode = false;
    this.sudokuId = 0;
    this.difficulty = 0.0;
    this.mistakes = 0;
    this.boardStart = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.board = JSON.parse(JSON.stringify(this.boardStart));
    this.solution = JSON.parse(JSON.stringify(this.boardStart));
  }

  ngAfterViewInit() {
    const canvas = this.sudokuCanvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    if(!this.solverMode)
    {
      this.loadRandomSudoku();
    }

    canvas.addEventListener('click', (event) => {
      const x = Math.floor(event.offsetX / this.cellSize);
      const y = Math.floor(event.offsetY / this.cellSize);

      this.selectedCell = { x, y };
      this.drawSudoku(this.ctx!);
    });

    this.adjustCanvasSize();
  }

  loadRandomSudoku()
  {
    this.sudokuService.getRandomSudoku()
    .subscribe(
      {
        next: (items) => {
          this.boardStart = items.board;
          this.solution = items.solution;
          this.board = JSON.parse(JSON.stringify(this.boardStart));
          this.sudokuId = items.id;
          this.difficulty = items.difficulty;
          this.drawSudoku(this.ctx!);
        },
        error: (response) => {
          console.log(response);
        }
      }
    )
  }

  loadSudokuOfLevel(level: number)
  {
    this.sudokuService.getSudokuByLevel(level)
    .subscribe(
      {
        next: (items) => {
          this.boardStart = items.board;
          this.solution = items.solution;
          this.board = JSON.parse(JSON.stringify(this.boardStart));
          this.sudokuId = items.id;
          this.difficulty = items.difficulty;
          this.drawSudoku(this.ctx!);
        },
        error: (response) => {
          console.log(response);
        }
      }
    )
  }

  sendSolve()
  {
    this.sudokuService.solveSudoku(this.board)
    .subscribe(
      {
        next: (items) => {
          this.board = items;
          this.drawSudoku(this.ctx!);
        },
        error: (response) => {
          console.log(response);
        }
      }
    )
  }

  @HostListener('window:resize', ['$event'])
  adjustCanvasSize() {
    const canvas = this.sudokuCanvasRef.nativeElement;
    const container = canvas.parentElement!;
    console.log(this.printerMode);
    if(this.printerMode)
    {
      canvas.width = 500;
      canvas.height = 500;
      this.ctx.font = '40px Arial';
      this.cellSize = canvas.width / 9;
      this.drawSudoku(this.ctx);
      return;
    }

    if(container.clientWidth > 0.4 * window.innerWidth && window.innerWidth > 1000)
    {
      canvas.width = 0.4 * window.innerWidth;
      canvas.height = 0.4 * window.innerWidth;
    }
    else
    {
      canvas.width = container.clientWidth;
      canvas.height = container.clientWidth;
    }

    if(canvas.width < 400)
    {
      this.ctx.font = '34px Arial';
    }
    else
    {
      this.ctx.font = '40px Arial';
    }

    this.cellSize = canvas.width / 9;
    this.drawSudoku(this.ctx);
  }

  insertNumber(number: number): void {
    if(number == -1)
    {
      this.cancelSelection();
      return;
    }
    if (this.selectedCell.x !== -1 && this.selectedCell.y !== -1 && this.boardStart[this.selectedCell.y][this.selectedCell.x] === 0) {
      this.board[this.selectedCell.y][this.selectedCell.x] = number;
      this.drawSudoku(this.ctx!);
    }
  }

  clearCell(): void {
    if (this.selectedCell.x !== -1 && this.selectedCell.y !== -1 && this.boardStart[this.selectedCell.y][this.selectedCell.x] === 0) {
      this.board[this.selectedCell.y][this.selectedCell.x] = 0;
      this.drawSudoku(this.ctx!);
    }
  }

  cancelSelection(): void {
    this.selectedCell = { x: -1, y: -1 };
    this.drawSudoku(this.ctx);
  }

  drawGrid(ctx: CanvasRenderingContext2D): void {
    
    ctx.beginPath();
    for (let x = 0; x <= ctx.canvas.width; x += this.cellSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }
    for (let y = 0; y <= ctx.canvas.height; y += this.cellSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 4;
    for (let i = 0; i <= 9; i += 3) {
      ctx.moveTo(i * this.cellSize, 0);
      ctx.lineTo(i * this.cellSize, ctx.canvas.height);
      ctx.moveTo(0, i * this.cellSize);
      ctx.lineTo(ctx.canvas.width, i * this.cellSize);
    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  drawMistakes(ctx: CanvasRenderingContext2D)
  {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j] == 0 || this.solution[i][j] == 0)
          continue;
        else if(this.board[i][j] != this.solution[i][j])
        {
          ctx.fillStyle = 'red';
          ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }

  drawCurrentSelection(ctx: CanvasRenderingContext2D)
  {
    if (this.selectedCell.x !== -1 && this.selectedCell.y !== -1 && !this.printerMode) {
      ctx.fillStyle = 'lightblue';
      ctx.fillRect(this.selectedCell.x * this.cellSize, this.selectedCell.y * this.cellSize, this.cellSize, this.cellSize);
    }
  }

  drawNumbers(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j] !== 0) {
          if (this.boardStart[i][j] !== 0) {
            ctx.fillStyle = 'black';
          } else {
            ctx.fillStyle = 'blue';
          }
          ctx.fillText(this.board[i][j].toString(), j * this.cellSize + this.cellSize / 2, i * this.cellSize + this.cellSize / 2);
        }
      }
    }
  }

  clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  drawSudoku(ctx: CanvasRenderingContext2D): void {
    this.clearCanvas(ctx);
    this.drawCurrentSelection(ctx);
    this.drawMistakes(ctx);
    this.drawGrid(ctx);
    this.drawNumbers(ctx);
  }
}