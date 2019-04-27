import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsHomeComponent } from './rxjs-home.component';
import { ShareReplayComponent } from './share-replay.component';

const routes: Routes = [
    { path: '', component: RxjsHomeComponent },
    { path: 'share-replay', component: ShareReplayComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RxjsRoutingModule {}
