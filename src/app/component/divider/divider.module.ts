import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NzAddOnModule } from './addon/addon.module';
import { NzDividerComponent } from './divider.component';
import { NzUpdateHostClassService } from './update-host-class.service';

@NgModule({
  imports: [CommonModule, NzAddOnModule.forRoot()],
  declarations: [NzDividerComponent],
  exports: [NzDividerComponent],
  providers: [NzUpdateHostClassService]
})
export class NzDividerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzDividerModule
    };
  }
}

