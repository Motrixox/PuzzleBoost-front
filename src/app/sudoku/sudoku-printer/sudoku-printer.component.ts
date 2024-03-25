import { Component } from '@angular/core';
import { SudokuCanvasComponent } from '../sudoku-canvas/sudoku-canvas.component';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-sudoku-printer',
  standalone: true,
  imports: [
    SudokuCanvasComponent
  ],
  templateUrl: './sudoku-printer.component.html',
  styleUrl: './sudoku-printer.component.css'
})
export class SudokuPrinterComponent {
canvasCollection: HTMLCollectionOf<HTMLCanvasElement>;

constructor()
{
  this.canvasCollection = document.getElementsByTagName("canvas")
}


  print()
  {
    var pdf = new jsPDF();

     for (let i = 0; i < this.canvasCollection.length; i++) {
      let x = 13 * ((i % 2) + 1) + 85 * (i % 2);
      let y = 10 * (Math.floor(i / 2) + 1) + 85 * Math.floor(i / 2);
      pdf.addImage(this.canvasCollection[i], 'JPEG', x, y, 85, 85);
     }

    
    pdf.save("sudoku-" + new Date().toLocaleDateString() + ".pdf");
    
    location.reload();
  }
}
