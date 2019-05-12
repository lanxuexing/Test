import { Directive } from '@angular/core';

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[nz-tab]',
  exportAs: 'nzTab'
})
export class NzTabDirective {}
