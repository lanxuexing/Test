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
import { NzBackTopModule } from './back-top/back-top.module';
import { BackTopDemoComponent } from './back-top/demo.component';
import { CardDemoComponent } from './card/demo.component';
import { NzCardModule } from './card/card.module';
import { NzTabsModule } from './tabs/tabs.module';
import { TabsDemoComponent, NzDemoTabContentLazyComponent, NzDemoTabContentEagerlyComponent } from './tabs/demo.component';
import { StatisticDemoComponent } from './statistic/demo.component';
import { NzStatisticModule } from './statistic/statistic.module';
import { NzAffixModule } from './affix/affix.module';
import { AffixDemoComponent } from './affix/demo.component';
import { PaginationDemoComponent } from './pagination/demo.component';
import { NzPaginationModule } from './pagination/pagination.module';
import { NzCollapseModule } from './collapse/collapse.module';
import { CollapesDemoComponent } from './collapse/demo.component';

const COMMON = [
    ShareComponent,
    FromComponent,
    TooltipDemoComponent,
    MultiselectDropdownDemoComponent,
    ProgressDemoComponent,
    CarouselDemoComponent,
    DividerDemoComponent,
    BackTopDemoComponent,
    CardDemoComponent,
    TabsDemoComponent,
    NzDemoTabContentLazyComponent,
    NzDemoTabContentEagerlyComponent,
    StatisticDemoComponent,
    AffixDemoComponent,
    PaginationDemoComponent,
    CollapesDemoComponent,
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
        NzBackTopModule.forRoot(),
        NzCardModule.forRoot(),
        NzTabsModule.forRoot(),
        NzStatisticModule.forRoot(),
        NzAffixModule.forRoot(),
        NzPaginationModule.forRoot(),
        NzCollapseModule.forRoot(),
    ],
    exports: [...COMMON],
    providers: [ShareService],
})
export class ShareModule { }
