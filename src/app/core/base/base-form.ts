import { Location } from '@angular/common';
import { AbstractControl, FormGroup } from '@angular/forms';

export class BaseForm {
  constructor(protected readonly location: Location) {}
  public form!: FormGroup;
  public loading$!: boolean;

  isValid(controlName: string, ValidatorType: string): boolean {
    const control = this.form.controls[controlName];

    if (control) {
      const result =
        control.hasError(ValidatorType) &&
        (control.touched || control.dirty || this.form.invalid);

      return result;
    }

    return false;
  }

  isValidForm(): boolean {
    if (this.form.valid) {
      return true;
    }
    return false;
  }

  cancel(): void {
    this.location.back();
  }
}
