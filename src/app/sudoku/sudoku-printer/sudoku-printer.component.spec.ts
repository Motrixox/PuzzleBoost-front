import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuPrinterComponent } from './sudoku-printer.component';

describe('SudokuPrinterComponent', () => {
  let component: SudokuPrinterComponent;
  let fixture: ComponentFixture<SudokuPrinterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuPrinterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SudokuPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
