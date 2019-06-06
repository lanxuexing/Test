import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-rxjs-demo16',
    template: `
        <h3>Rxjs Demo16 To Study! -- Operators操作符(window, windowToggle, groupBy)</h3>
        <button class="mgLeft" (click)="windowHandler()">window</button>
        <button class="mgLeft" (click)="windowToggleHandler()">windowToggle</button>
        <button class="mgLeft" id="btn">Button-Click</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo16Component implements OnInit, OnDestroy {
    windowSubscription: Subscription;
    windowToggleSubscription: Subscription;

    constructor() {}

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    windowHandler() {
        /**
         * window把一段时间内送出的元素拆出来放到新的observable变成Observable<T> => Observable<Observable<T>>，这里可以和buffer类比
         * 即：buffer 是把拆分出来的元素放到阵列并送出阵列；window 是把拆分出来的元素放到observable 并送出observable
         */
    }

    windowToggleHandler() {}

    ngOnDestroy() {
        if (this.windowSubscription) {
            this.windowSubscription.unsubscribe();
        }
        if (this.windowToggleSubscription) {
            this.windowToggleSubscription.unsubscribe();
        }
    }
}
