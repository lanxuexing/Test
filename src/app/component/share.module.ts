import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FromComponent } from './from/from.component';
import { ShareComponent } from './share.component';
import { ShareService } from './share.service';
import { TooltipDemoComponent } from './tooltip/demo.component';
import { TooltipModule } from './tooltip/tooltip.module';
import { ShareRoutingModule } from './share.routing';

const COMMON = [
    ShareComponent,
    FromComponent,
    TooltipDemoComponent,
];

@NgModule({
    declarations: [...COMMON],
    imports: [CommonModule, ShareRoutingModule, FormsModule, ReactiveFormsModule, TooltipModule.forRoot()],
    exports: [...COMMON],
    providers: [ShareService],
})
export class ShareModule { }
