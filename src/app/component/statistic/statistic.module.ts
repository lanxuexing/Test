import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NzCountdownComponent } from './countdown.component';
import { NzStatisticNumberComponent } from './statistic-number.component';
import { NzStatisticComponent } from './statistic.component';
import { NzTimeRangePipe } from './time-range.pipe';
import { Platform } from './platform.service';
import { NzAddOnModule } from './addon/addon.module';

@NgModule({
  imports: [CommonModule, NzAddOnModule.forRoot()],
  declarations: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent, NzTimeRangePipe],
  exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticNumberComponent, NzTimeRangePipe],
  providers: [Platform]
})
export class NzStatisticModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzStatisticModule
    };
  }
}
