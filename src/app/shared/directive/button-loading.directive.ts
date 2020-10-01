import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appButton][loading]',
})
export class ButtonLoadingDirective implements OnChanges {
  @Input()
  loading: boolean;

  @Input()
  disabled = false;

  @Input()
  color: string;
  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.loading) {
      return;
    }

    if (changes.loading.currentValue) {
      const htmlElement = (this.elementRef.nativeElement as HTMLInputElement);
      htmlElement.classList.add(...['kt-spinner', 'kt-spinner--right', 'kt-spinner--sm', 'kt-spinner--light']);
      htmlElement.disabled = true;
    } else if (!changes.loading.firstChange) {
      const htmlElement = (this.elementRef.nativeElement as HTMLInputElement);
      htmlElement.classList.remove(...['kt-spinner', 'kt-spinner--right', 'kt-spinner--sm', 'kt-spinner--light']);
      htmlElement.disabled = this.disabled;
    }
  }

}
