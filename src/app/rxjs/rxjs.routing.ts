import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsHomeComponent } from './rxjs-home.component';
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

const routes: Routes = [
    { path: '', component: RxjsHomeComponent },
    { path: 'demo01', component: RxjsDemo01Component },
    { path: 'demo02', component: RxjsDemo02Component },
    { path: 'demo03', component: RxjsDemo03Component },
    { path: 'demo04', component: RxjsDemo04Component },
    { path: 'demo05', component: RxjsDemo05Component },
    { path: 'demo06', component: RxjsDemo06Component },
    { path: 'demo07', component: RxjsDemo07Component },
    { path: 'demo08', component: RxjsDemo08Component },
    { path: 'demo09', component: RxjsDemo09Component },
    { path: 'demo10', component: RxjsDemo10Component },
    { path: 'demo11', component: RxjsDemo11Component },
    { path: 'demo12', component: RxjsDemo12Component },
    { path: 'demo13', component: RxjsDemo13Component },
    { path: 'demo14', component: RxjsDemo14Component },
    { path: 'demo15', component: RxjsDemo15Component },
    { path: 'share-replay', component: ShareReplayComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RxjsRoutingModule {}
