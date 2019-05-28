import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rxjs-demo04',
    template: `
        <h3>Rxjs Demo04 To Study! -- Operators操作符(take, first, takeUntil, concatAll)</h3>
        <button class="mgLeft" (click)="takeHandler()">take</button>
        <button class="mgLeft" (click)="firstHandler()">first</button>
        <button class="mgLeft" (click)="takeUntilHandler()">takeUntil</button>
        <button class="mgLeft" (click)="concatAllHandler()">concatAll</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo04Component implements OnInit {
    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }
}
