import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxjsHomeComponent } from './rxjs-home.component';
import { RxjsRoutingModule } from './rxjs.routing';
import { RxjsService } from './rxjs.service';
import { ShareReplayComponent } from './share-replay.component';

const COMMON = [
    RxjsHomeComponent,
    ShareReplayComponent,
];

@NgModule({
    declarations: [ ...COMMON ],
    imports: [ CommonModule, RxjsRoutingModule ],
    exports: [...COMMON ],
    providers: [ RxjsService ],
})
export class RxjsModule {}
