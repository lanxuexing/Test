import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { FromComponent } from './from/from.component';
import { ShareComponent } from './share.component';
import { ShareRoutingModule } from './share.routing';
import { ShareService } from './share.service';
import { TooltipDemoComponent } from './tooltip/demo.component';
import { TooltipModule } from './tooltip/tooltip.module';
import { MultiSelectDropDownModule } from './multiselect-dropdown/multiselect-dropdown.module';
import { MultiselectDropdownDemoComponent } from './multiselect-dropdown/demo.component';
import { NzProgressModule } from './progress/progress.module';
import { ProgressDemoComponent } from './progress/demo.component';
import { NzCarouselModule } from './carousel/carousel.module';
import { CarouselDemoComponent } from './carousel/demo.component';
import { DividerDemoComponent } from './divider/demo.component';
import { NzDividerModule } from './divider/divider.module';

const COMMON = [
    ShareComponent,
    FromComponent,
    TooltipDemoComponent,
    MultiselectDropdownDemoComponent,
    ProgressDemoComponent,
    CarouselDemoComponent,
    DividerDemoComponent,
];

@NgModule({
    declarations: [...COMMON],
    imports: [
        CommonModule,
        ShareRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TooltipModule.forRoot(),
        CoreModule,
        MultiSelectDropDownModule.forRoot(),
        NzProgressModule.forRoot(),
        NzCarouselModule.forRoot(),
        NzDividerModule.forRoot(),
    ],
    exports: [...COMMON],
    providers: [ShareService],
})
export class ShareModule { }
