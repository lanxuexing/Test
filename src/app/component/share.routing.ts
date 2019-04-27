import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareComponent } from './share.component';
import { FromComponent } from './from/from.component';
import { TooltipDemoComponent } from './tooltip/demo.component';

const routes: Routes = [
    { path: '', component: ShareComponent },
    { path: 'from', component: FromComponent },
    { path: 'tooltip', component: TooltipDemoComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShareRoutingModule {}
