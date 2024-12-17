import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
    
      onCancel(): void {
        this.dialogRef.close(false);
      }
    
      onConfirm(): void {
        this.dialogRef.close(true);
      }
}
