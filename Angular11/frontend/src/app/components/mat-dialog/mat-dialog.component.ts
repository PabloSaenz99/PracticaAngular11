import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject, Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
@Injectable({ providedIn: 'root' })
export class MatDialogComponent {

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
}

  openDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog.open(MatDialogComponent, {
      data,
      width: '400px',
      disableClose: true,
    }).afterClosed();
  }
  /*
  onConfirm(): void {
    this.dialog.open(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }*/
}

export class ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText: string;

  constructor(private title1: string, private message1: string,
      private confirm?:string, private cancel?:string){
    this.title = title1;
    this.message = message1;
    this.confirmText = confirm? confirm:"Yes";
    this.cancelText = cancel? cancel:"No";
  }
}