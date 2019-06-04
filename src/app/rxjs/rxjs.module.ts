import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { RxjsHomeComponent } from './rxjs-home.component';
import { RxjsRoutingModule } from './rxjs.routing';
import { RxjsService } from './rxjs.service';
import { ShareReplayComponent } from './share-replay.component';
import { RxjsDemo01Component } from './study/demo01.component';
import { RxjsDemo02Component } from './study/demo02.component';
import { RxjsDemo03Component } from './study/demo03.component';
import { RxjsDemo04Component } from './study/demo04.component';
import { RxjsDemo05Component } from './study/demo05.component';
import { RxjsDemo06Component } from './study/demo06.component';
import { RxjsDemo07Component } from './study/demo07.component';
import { RxjsDemo08Component } from './study/demo08.component';
import { RxjsDemo09Component } from './study/demo09.component';
import { RxjsDemo10Component } from './study/demo10.component';
import { RxjsDemo11Component } from './study/demo11.component';

const COMMON = [
    RxjsHomeComponent,
    ShareReplayComponent,
    RxjsDemo01Component,
    RxjsDemo02Component,
    RxjsDemo03Component,
    RxjsDemo04Component,
    RxjsDemo05Component,
    RxjsDemo06Component,
    RxjsDemo07Component,
    RxjsDemo08Component,
    RxjsDemo09Component,
    RxjsDemo10Component,
    RxjsDemo11Component,
];

@NgModule({
    declarations: [ ...COMMON ],
    imports: [ CommonModule, RxjsRoutingModule, CoreModule ],
    exports: [...COMMON ],
    providers: [ RxjsService ],
})
export class RxjsModule {}
