import { Directive, ElementRef, HostListener, Input } from'@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
    selector: '[onReturn]'
})
export class OnReturnDirective {
  private el: ElementRef;
  @Input() onReturn: string;
  constructor(private _el: ElementRef) {
      this.el = this._el;
  }
  @HostListener('keydown', ['$event']) onKeyDown(e) {
      if ((e.which == 13 || e.keyCode == 13)) {
          e.preventDefault();
          
          if (e.srcElement.nextElementSibling) {
            console.log('e.srcElement.nextElementSibling>>',e.srcElement.nextElementSibling);
              e.srcElement.nextElementSibling.focus();
          }
          else{
              console.log('close keyboard');
          }
          return;
      }

  }

}