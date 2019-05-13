import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[nzClassListAdd]',
  exportAs: 'nzClassListAdd'
})
export class NzClassListAddDirective {
  classList: string[] = [];

  @Input()
  set nzClassListAdd(list: string[]) {
    this.classList.forEach(name => {
      this.renderer.removeClass(this.elementRef.nativeElement, name);
    });
    list.forEach(name => {
      this.renderer.addClass(this.elementRef.nativeElement, name);
    });
    this.classList = list;
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
