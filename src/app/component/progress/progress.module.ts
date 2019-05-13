import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NzProgressComponent } from './progress.component';

@NgModule({
  exports: [NzProgressComponent],
  declarations: [NzProgressComponent],
  imports: [CommonModule]
})
export class NzProgressModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzProgressModule
    };
  }
}
