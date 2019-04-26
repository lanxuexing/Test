import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tooltip } from './tooltip.component';

export function getWindow(): any { return window }

@NgModule({
  declarations: [Tooltip],
  exports: [Tooltip],
  imports: [CommonModule],
  entryComponents: [Tooltip],
})
export class TooltipModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TooltipModule, providers: []}
  }
}