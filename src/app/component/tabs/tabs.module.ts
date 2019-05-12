import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NzTabBodyComponent } from './tab-body.component';
import { NzTabLabelDirective } from './tab-label.directive';
import { NzTabComponent } from './tab.component';
import { NzTabDirective } from './tab.directive';
import { NzTabsInkBarDirective } from './tabs-ink-bar.directive';
import { NzTabsNavComponent } from './tabs-nav.component';
import { NzTabSetComponent } from './tabset.component';
import { NzAddOnModule } from './addon/addon.module';
import { ObserversModule } from './observe-content.module';

@NgModule({
  declarations: [
    NzTabComponent,
    NzTabDirective,
    NzTabSetComponent,
    NzTabsNavComponent,
    NzTabLabelDirective,
    NzTabsInkBarDirective,
    NzTabBodyComponent
  ],
  exports: [
    NzTabComponent,
    NzTabDirective,
    NzTabSetComponent,
    NzTabsNavComponent,
    NzTabLabelDirective,
    NzTabsInkBarDirective,
    NzTabBodyComponent
  ],
  imports: [CommonModule, ObserversModule.forRoot(), NzAddOnModule.forRoot()]
})
export class NzTabsModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: NzTabsModule
    };
  }
}
