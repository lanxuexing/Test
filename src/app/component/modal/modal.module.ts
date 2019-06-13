import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DraggableModule } from './draggable';
import { ModalComponent } from './modal/modal.component';
import { ResizableModule } from './resizable';

@NgModule({
    imports: [
        CommonModule,
        ResizableModule,
        DraggableModule,
      ],
      declarations: [
        ModalComponent,
      ],
      exports: [
        ModalComponent,
      ],
      providers: []
})
export class ModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule
    };
  }
}

