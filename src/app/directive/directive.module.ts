import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DirectiveService } from './direct.service';
import { DirectiveRoutingModule } from './directive.routing';
import { StickyThingDirective } from './sticky-thing/sticky-thing.directive';
import { DirectiveComponent } from './directive.component';
import { StickyThingDemoComponent } from './sticky-thing/demo.component';
import { CoreModule } from '../core/core.module';
import { EllipsisDirective } from './ellipsis/ellipsis.directive';
import { EllipsisDemoComponent } from './ellipsis/demo.component';

const COMMON = [
  DirectiveComponent,
  StickyThingDirective,
  StickyThingDemoComponent,
  EllipsisDirective,
  EllipsisDemoComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    DirectiveRoutingModule
  ],
  declarations: [...COMMON],
  providers: [DirectiveService],
  exports: [...COMMON]
})
export class DirectiveModule {
}
