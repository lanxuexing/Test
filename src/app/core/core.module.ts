import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BackComponent } from './back/back.component';

const COMMON = [
    BackComponent,
];

@NgModule({
    declarations: [...COMMON],
    imports: [ CommonModule ],
    exports: [...COMMON],
    providers: [],
})
export class CoreModule {}
