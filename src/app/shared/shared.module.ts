import { ConfirmModalComponent } from './../components/confirm-modal/confirm-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

const MATERIAL_MODULE = [
  FlexLayoutModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
];

const COMPONENTS = [ConfirmModalComponent];

const MODULES = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...MATERIAL_MODULE, ...MODULES],
  exports: [...MATERIAL_MODULE, ...MODULES, ...COMPONENTS],
})
export class SharedModule {}
