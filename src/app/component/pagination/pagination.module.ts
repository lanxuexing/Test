import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzPaginationComponent } from './pagination.component';
import { NzI18nService } from './i18n.service';

@NgModule({
  declarations: [NzPaginationComponent],
  exports: [NzPaginationComponent],
  imports: [CommonModule, FormsModule],
  providers: [NzI18nService]
})
export class NzPaginationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NzPaginationModule
    };
  }
}
