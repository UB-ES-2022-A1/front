import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private snackBar: MatSnackBar) {}
  openSnackBar(message: string, action: string, type: number) {
    // Success snackbar
    if (type === 0) {
      this.snackBar.open(message, action, {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        panelClass: ['custom-success-snackbar'],
      });
    }
    // error snackbar
    else if (type === 1) {
      this.snackBar.open(message, action, {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['custom-error-snackbar'],
      });
    }
    // Warning snackbar
    else if (type === 2) {
      this.snackBar.open(message, action, {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['custom-warning-snackbar'],
      });
    }
    // Info snackbar
    else if (type === 3) {
      this.snackBar.open(message, action, {
        verticalPosition: 'top',
        horizontalPosition: 'left',
      });
    }
  }
}
