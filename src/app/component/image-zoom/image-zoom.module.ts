import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageZoomComponent } from './image-zoom.component';

export * from './image-zoom.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ImageZoomComponent
    ],
    exports: [
        ImageZoomComponent
    ]
})
export class ImageZoomModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ImageZoomModule,
        };
    }
}
