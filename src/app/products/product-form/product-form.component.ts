import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseForm } from '../../core/base/base-form';
import { MODEL_CONFIRM_TYPE } from '../../core/models/enums/model-confirm-type-enum';
import { ConfirmModalComponent } from './../../components/confirm-modal/confirm-modal.component';
import { PRODUCT } from './../../core/models/products';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent
  extends BaseForm
  implements OnInit, OnChanges
{
  constructor(
    protected override readonly location: Location,
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder
  ) {
    super(location);
    this._initForm();
  }
  hide: boolean = true;
  @Output() addedProduct = new EventEmitter<PRODUCT>();
  @Output() deletedProduct = new EventEmitter<PRODUCT>();
  @Output() cancelForm = new EventEmitter<boolean>();
  @Input() product!: PRODUCT | null;

  ngOnInit(): void {}

  onSubmitForm(): void {
    if (this.form.valid) {
      this._openDialog(MODEL_CONFIRM_TYPE.save, {
        type: MODEL_CONFIRM_TYPE.save,
        title: 'Save Changes',
        subTitle: 'Are you sure you want to save changes made?',
      });
    }
  }

  onDeleteProduct(): void {
    this._openDialog(MODEL_CONFIRM_TYPE.delete, {
      type: MODEL_CONFIRM_TYPE.delete,
      title: `Delete ${this.product?.name}`,
      subTitle:
        'Are you sure you want to delete product? Once deleted, you wont be able to access it again.',
    });
  }

  onCancelForm(): void {
    this.form.reset();
    this.product = null;
    this.cancelForm.emit();
  }

  private _openDialog(type: MODEL_CONFIRM_TYPE, data: any): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '450px',
      data: data,
      enterAnimationDuration: '1500ms',
      exitAnimationDuration: '1000ms',
    });

    switch (type) {
      case MODEL_CONFIRM_TYPE.delete:
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.deletedProduct.emit(this.product!);
            this.onCancelForm();
          }
        });
        break;

      case MODEL_CONFIRM_TYPE.save:
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.addedProduct.emit(this.form.value);
            this.onCancelForm();
          }
        });
        break;

      default:
        return;
    }
  }

  private _initForm(): void {
    this.form = this.fb.group({
      id: new UntypedFormControl(Date.now().toString()),
      name: new UntypedFormControl(null, [Validators.required]),
      type: new UntypedFormControl(1, [Validators.required]),
      category: new UntypedFormControl(null, [Validators.required]),
      isSubCategory: new UntypedFormControl(false, [Validators.required]),
      referenceId: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.required]),
      fees: new UntypedFormControl(null, [Validators.required]),
      discound: new UntypedFormControl(null, [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'].currentValue) {
      this.product = changes['product'].currentValue;
      this.form.patchValue({ ...this.product });
    }
  }
}
