import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuSolverPageComponent } from './sudoku-solver-page.component';

describe('SudokuSolverPageComponent', () => {
  let component: SudokuSolverPageComponent;
  let fixture: ComponentFixture<SudokuSolverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuSolverPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SudokuSolverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
