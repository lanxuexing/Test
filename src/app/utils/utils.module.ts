import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StringTemplateOutletDirective } from './string-template-outlet.directive';

@NgModule({
    imports: [CommonModule],
    exports: [StringTemplateOutletDirective],
    declarations: [StringTemplateOutletDirective]
})
export class UtilsModule {
}