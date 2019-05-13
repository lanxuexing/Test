import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { SCROLL_SERVICE_PROVIDER } from './scroll.service';

import { NzAffixComponent } from './affix.component';
import { Platform } from './platform.service';

@NgModule({
  declarations: [NzAffixComponent],
  exports: [NzAffixComponent],
  imports: [CommonModule],
  providers: [SCROLL_SERVICE_PROVIDER, Platform]
})
export class NzAffixModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzAffixModule
    };
  }
}
