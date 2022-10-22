import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Directive({
  selector: '[appComponentBase]',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ComponentBase implements OnDestroy {
  destroy$ = new Subject<void>();
  descriptionTooltipPosition: string = 'top';
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
