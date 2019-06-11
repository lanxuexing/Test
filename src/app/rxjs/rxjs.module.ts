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
import { RxjsDemo12Component } from './study/demo12.component';
import { RxjsDemo13Component } from './study/demo13.component';
import { RxjsDemo14Component } from './study/demo14.component';
import { RxjsDemo15Component } from './study/demo15.component';
import { FormsModule } from '@angular/forms';
import { RxjsDemo16Component } from './study/demo16.component';
import { RxjsDemo17Component } from './study/demo17.component';
import { RxjsDemo18Component } from './study/demo18.component';
import { RxjsDemo19Component } from './study/demo19.component';

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
    RxjsDemo12Component,
    RxjsDemo13Component,
    RxjsDemo14Component,
    RxjsDemo15Component,
    RxjsDemo16Component,
    RxjsDemo17Component,
    RxjsDemo18Component,
    RxjsDemo19Component,
];

@NgModule({
    declarations: [ ...COMMON ],
    imports: [ CommonModule, FormsModule, RxjsRoutingModule, CoreModule ],
    exports: [...COMMON ],
    providers: [ RxjsService ],
})
export class RxjsModule {}
