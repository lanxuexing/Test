import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectiveService } from './direct.service';
import { DirectiveRoutingModule } from './directive.routing';
import { DirectiveComponent } from './directive.component';
import { StickyThingDemoComponent } from './sticky-thing/demo.component';
import { CoreModule } from '../core/core.module';
import { EllipsisDemoComponent } from './ellipsis/demo.component';
import { ClickOutsidesDemoComponent } from './click-outsides/demo.component';
import { StickyThingModule } from './sticky-thing/sticky-thing.module';
import { EllipsisModule } from './ellipsis/ellipsis.module';
import { ClickOutsidesModule } from './click-outsides/click-outsides.module';
import { AutosizeModule } from './autosize/autosize.module';
import { AutoSizeDemoComponent } from './autosize/demo.component';
import { TooltipWindowDemoComponent } from './tooltip-window/demo.component';
import { TooltipWindowComponent, TooltipWindowDirective } from './tooltip-window/tooltip-window.directive';

const COMMON = [
  DirectiveComponent,
  StickyThingDemoComponent,
  EllipsisDemoComponent,
  ClickOutsidesDemoComponent,
  AutoSizeDemoComponent,
  TooltipWindowDemoComponent,
  TooltipWindowComponent,
  TooltipWindowDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    DirectiveRoutingModule,
    StickyThingModule.forRoot(),
    EllipsisModule.forRoot(),
    ClickOutsidesModule.forRoot(),
    AutosizeModule.forRoot()
  ],
  declarations: [...COMMON],
  entryComponents: [TooltipWindowComponent],
  providers: [DirectiveService],
  exports: [...COMMON]
})
export class DirectiveModule {
}
