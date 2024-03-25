import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuKeyboardComponent } from './sudoku-keyboard.component';

describe('SudokuKeyboardComponent', () => {
  let component: SudokuKeyboardComponent;
  let fixture: ComponentFixture<SudokuKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuKeyboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SudokuKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
