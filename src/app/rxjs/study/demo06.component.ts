import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { take, combineLatest } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo06',
    template: `
        <h3>Rxjs Demo06 To Study! -- Operators操作符(combineLatest, withLatestFrom, zip)</h3>
        <button class="mgLeft" (click)="combineLatestHandler()">combineLatest</button>
        <button class="mgLeft" (click)="withLatestFromHandler()">withLatestFrom</button>
        <button class="mgLeft" (click)="zipHandler()">zip</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo06Component implements OnInit, OnDestroy {
    combineLatestSubscription: Subscription;
    withLatestFromSubscription: Subscription;
    zipSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    combineLatestHandler() {
        /**
         * 取得各个observable 最后送出的值，再输出成一个值
         * combineLatest可以接收多个observable，最后一个参数是callback function，这个callback function接收的参数数量跟合并的observable数量相同
         * source:      ----0----1----2|
         * newest:      --0--1--2--3--4--5|
         *          combineLatest(newest, (x, y) => x + y);
         * example:     ----01--23-4--(56)--7|
         */
        const source = interval(500).pipe(take(3));
        const newest = interval(300).pipe(take(6));
        const combineLatestObservable = source.pipe(combineLatest(newest, (x, y) => x + y));
        this.combineLatestSubscription = combineLatestObservable.subscribe({
            next: (value) => { console.log('=====combineLatest操作符: ', value); },
            error: (err) => { console.log('=====combineLatest操作符: Error: ', err); },
            complete: () => { console.log('=====combineLatest操作符: complete!'); }
        });
    }

    withLatestFromHandler() {}

    zipHandler() {}

    ngOnDestroy() {
        if (this.combineLatestSubscription) {
            this.combineLatestSubscription.unsubscribe();
        }
        if (this.withLatestFromSubscription) {
            this.withLatestFromSubscription.unsubscribe();
        }
        if (this.zipSubscription) {
            this.zipSubscription.unsubscribe();
        }
    }
}
