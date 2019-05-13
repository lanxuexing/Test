import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FromComponent } from './from/from.component';
import { ShareComponent } from './share.component';
import { TooltipDemoComponent } from './tooltip/demo.component';
import { MultiselectDropdownDemoComponent } from './multiselect-dropdown/demo.component';
import { ProgressDemoComponent } from './progress/demo.component';
import { CarouselDemoComponent } from './carousel/demo.component';
import { DividerDemoComponent } from './divider/demo.component';
import { BackTopDemoComponent } from './back-top/demo.component';
import { CardDemoComponent } from './card/demo.component';
import { TabsDemoComponent } from './tabs/demo.component';
import { StatisticDemoComponent } from './statistic/demo.component';
import { AffixDemoComponent } from './affix/demo.component';

const routes: Routes = [
    { path: '', component: ShareComponent },
    { path: 'from', component: FromComponent },
    { path: 'tooltip', component: TooltipDemoComponent },
    { path: 'multiselect-dropdown', component: MultiselectDropdownDemoComponent },
    { path: 'progress', component: ProgressDemoComponent },
    { path: 'carousel', component: CarouselDemoComponent },
    { path: 'divider', component: DividerDemoComponent },
    { path: 'back-top', component: BackTopDemoComponent },
    { path: 'card', component: CardDemoComponent },
    { path: 'tabs', component: TabsDemoComponent },
    { path: 'statistic', component: StatisticDemoComponent },
    { path: 'affix', component: AffixDemoComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShareRoutingModule {}
