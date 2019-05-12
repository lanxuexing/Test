import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NzCarouselContentDirective } from './carousel-content.directive';
import { NzCarouselComponent } from './carousel.component';
import { Platform } from './platform.service';

@NgModule({
  declarations: [NzCarouselComponent, NzCarouselContentDirective],
  exports: [NzCarouselComponent, NzCarouselContentDirective],
  imports: [CommonModule],
  providers: [Platform]
})
export class NzCarouselModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzCarouselModule
    };
  }
}
