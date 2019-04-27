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

const COMMON = [
    ShareComponent,
    FromComponent,
    TooltipDemoComponent,
];

@NgModule({
    declarations: [...COMMON],
    imports: [CommonModule, ShareRoutingModule, FormsModule, ReactiveFormsModule, TooltipModule.forRoot(), CoreModule],
    exports: [...COMMON],
    providers: [ShareService],
})
export class ShareModule { }
