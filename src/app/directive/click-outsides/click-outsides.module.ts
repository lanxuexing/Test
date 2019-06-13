import { NgModule, ModuleWithProviders } from '@angular/core';
import { ClickOutsidesDirective } from './click-outsides.directive';

@NgModule({
  declarations: [ClickOutsidesDirective],
  exports: [ClickOutsidesDirective]
})
export class ClickOutsidesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ClickOutsidesModule
    };
  }
}
