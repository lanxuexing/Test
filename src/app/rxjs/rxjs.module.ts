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

const COMMON = [
    RxjsHomeComponent,
    ShareReplayComponent,
    RxjsDemo01Component,
    RxjsDemo02Component,
    RxjsDemo03Component,
];

@NgModule({
    declarations: [ ...COMMON ],
    imports: [ CommonModule, RxjsRoutingModule, CoreModule ],
    exports: [...COMMON ],
    providers: [ RxjsService ],
})
export class RxjsModule {}
