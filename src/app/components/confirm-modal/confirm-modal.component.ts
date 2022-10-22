import { MODEL_CONFIRM_TYPE } from './../../core/models/enums/model-confirm-type-enum';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  modelConfirmEnum = MODEL_CONFIRM_TYPE;
  ngOnInit(): void {
    console.log('data => ', this.data);
  }
}
