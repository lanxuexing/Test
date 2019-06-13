import { NgModule, ModuleWithProviders } from '@angular/core';
import { EllipsisDirective } from './ellipsis.directive';

@NgModule({
  declarations: [EllipsisDirective],
  exports: [EllipsisDirective]
})
export class EllipsisModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EllipsisModule
    };
  }
}
