import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NzCollapsePanelComponent } from './collapse-panel.component';
import { NzCollapseComponent } from './collapse.component';
import { NzAddOnModule } from './addon/addon.module';

@NgModule({
  declarations: [NzCollapsePanelComponent, NzCollapseComponent],
  exports: [NzCollapsePanelComponent, NzCollapseComponent],
  imports: [CommonModule, NzAddOnModule.forRoot()]
})
export class NzCollapseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzCollapseModule
    };
  }
}
