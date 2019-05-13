import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NzCardGridDirective } from './card-grid.directive';
import { NzCardLoadingComponent } from './card-loading.component';
import { NzCardMetaComponent } from './card-meta.component';
import { NzCardTabComponent } from './card-tab.component';
import { NzCardComponent } from './card.component';
import { NzAddOnModule } from './addon/addon.module';

@NgModule({
  imports: [CommonModule, NzAddOnModule.forRoot()],
  declarations: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent],
  exports: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardLoadingComponent, NzCardTabComponent]
})
export class NzCardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzCardModule
    };
  }
}
