import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuCanvasComponent } from './sudoku-canvas.component';

describe('SudokuCanvasComponent', () => {
  let component: SudokuCanvasComponent;
  let fixture: ComponentFixture<SudokuCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuCanvasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SudokuCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
