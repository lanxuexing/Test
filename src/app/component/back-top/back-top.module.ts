import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NzBackTopComponent } from './back-top.component';
import { SCROLL_SERVICE_PROVIDER } from './scroll.service';
import { Platform } from './platform.service';

@NgModule({
  declarations: [NzBackTopComponent],
  exports: [NzBackTopComponent],
  imports: [CommonModule],
  providers: [SCROLL_SERVICE_PROVIDER, Platform]
})
export class NzBackTopModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzBackTopModule
    };
  }
}
