import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectiveComponent } from './directive.component';
import { StickyThingDemoComponent } from './sticky-thing/demo.component';
import { EllipsisDemoComponent } from './ellipsis/demo.component';

const routes: Routes = [
    { path: '', component: DirectiveComponent },
    { path: 'sticky-thing', component: StickyThingDemoComponent },
    { path: 'ellipsis', component: EllipsisDemoComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DirectiveRoutingModule {}
