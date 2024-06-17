import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar item do histórico de conversões</h2>
    <mat-dialog-content>
      Tem certeza que deseja deletar esse item?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onConfirm()">Não</button>
      <button mat-raised-button color="warn" (click)="onNotConfirm()" cdkFocusInitial>Sim</button>
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
