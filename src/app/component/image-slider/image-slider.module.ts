import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgImageSliderComponent } from './image-slider.component';
import { SliderCustomImageComponent } from './slider-custom-image/slider-custom-image.component';
import { SliderLightboxComponent } from './slider-lightbox/slider-lightbox.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgImageSliderComponent,
        SliderCustomImageComponent,
        SliderLightboxComponent
    ],
    exports: [NgImageSliderComponent]
})
export class ImageSliderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImageSliderModule
    };
  }
}
