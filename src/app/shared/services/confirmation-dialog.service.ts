import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Delete conversion history item</h2>
    <mat-dialog-content>
      Are you sure you want to delete this item?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onConfirm()">No</button>
      <button mat-raised-button color="warn" (click)="onNotConfirm()" cdkFocusInitial>Yes</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule,MatDialogModule],
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onConfirm() {
    this.matDialogRef.close(false);
  }

  onNotConfirm() {
    this.matDialogRef.close(true);
  }
}


@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  matDialog = inject(MatDialog);

  constructor() { }

  openDialog(): Observable<boolean> {
    return this.matDialog.open(ConfirmationDialogComponent).afterClosed();
  }
}
