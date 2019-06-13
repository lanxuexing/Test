import { NgModule, ModuleWithProviders } from '@angular/core';
import { StickyThingDirective } from './sticky-thing.directive';

@NgModule({
  declarations: [StickyThingDirective],
  exports: [StickyThingDirective]
})
export class StickyThingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StickyThingModule
    };
  }
}
