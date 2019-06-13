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

const COMMON = [
  DirectiveComponent,
  StickyThingDemoComponent,
  EllipsisDemoComponent,
  ClickOutsidesDemoComponent,
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
  ],
  declarations: [...COMMON],
  providers: [DirectiveService],
  exports: [...COMMON]
})
export class DirectiveModule {
}
