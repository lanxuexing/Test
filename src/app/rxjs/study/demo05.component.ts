import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval, of, concat as rxConcat, merge as rxMerge } from 'rxjs';
import { skip, take, takeLast, last, concat, startWith, merge } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo05',
    template: `
        <h3>Rxjs Demo05 To Study! -- Operators操作符(skip, takeLast, last, concat, startWith, merge)</h3>
        <button class="mgLeft" (click)="skipHandler()">skip</button>
        <button class="mgLeft" (click)="takeLastHandler()">takeLast</button>
        <button class="mgLeft" (click)="lastHandler()">last</button>
        <button class="mgLeft" (click)="concatHandler()">concat</button>
        <button class="mgLeft" (click)="startWithHandler()">startWith</button>
        <button class="mgLeft" (click)="mergeHandler()">merge</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo05Component implements OnInit, OnDestroy {
    skipSubscription: Subscription;
    takeLastSubscription: Subscription;
    lastSubscription: Subscription;
    concatSubscription: Subscription;
    concatSubscription2: Subscription;
    startWithSubscription: Subscription;
    mergeSubscription: Subscription;
    mergeSubscription2: Subscription;

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    skipHandler() {
        /**
         * 略过前几个送出元素
         * 例如：interval(1000).pipe(skip(3))
         * source:      -----0-----1-----2-----3--..
         *                        skip(3)
         * newest:      -----------------------3--..
         */
        const skipObservable = interval(1000).pipe(skip(3), take(3));
        this.skipSubscription = skipObservable.subscribe({
            next: (value) => { console.log('=====skip操作符: ', value); },
            error: (err) => { console.log('=====skip操作符: Error: ', err); },
            complete: () => { console.log('=====skip操作符: complete!'); }
        });
    }

    takeLastHandler() {
        /**
         * takeLast必须等到整个observable完成(complete)，才能知道最后的元素有哪些，并且同步送出
         * 例如：interval(1000).pipe(take(4), takeLast(2))
         * source:      -----0-----1-----2-----3|
         *                      takeLast(2)
         * newest:      -----------------------(2,3)|
         */
        const takeLastObservable = interval(1000).pipe(take(4), takeLast(2));
        this.takeLastSubscription = takeLastObservable.subscribe({
            next: (value) => { console.log('=====takeLast操作符: ', value); },
            error: (err) => { console.log('=====takeLast操作符: Error: ', err); },
            complete: () => { console.log('=====takeLast操作符: complete!'); }
        });
    }

    lastHandler() {
        /**
         * 取得最后一个元素
         * 例如：interval(1000).pipe(take(4), last())
         * source:      -----0-----1-----2-----3|
         *                      last()
         * newest:      -----------------------3|
         */
        const lastObsverable = interval(1000).pipe(take(4), last());
        this.lastSubscription = lastObsverable.subscribe({
            next: (value) => { console.log('=====last操作符: ', value); },
            error: (err) => { console.log('=====last操作符: Error: ', err); },
            complete: () => { console.log('=====last操作符: complete!'); }
        });
    }

    concatHandler() {
        /**
         * 把多个observable 实例合并成一个, 必须先等前一个observable完成(complete)，才会继续下一个
         * source1:     -----0-----1-----2|
         * source2:     (3)|
         * source3:     (45)|
         *            concat()
         * newest:      -----0-----1-----2-----(345|
         */
        const source01 = interval(1000).pipe(take(3));
        const source02 = of(3);
        const source03 = of(4, 5);
        // 第一种写法：使用Operator操作符
        const concatObservable = source01.pipe(concat(source02, source03));
        this.concatSubscription = concatObservable.subscribe({
            next: (value) => { console.log('=====concat操作符: ', value); },
            error: (err) => { console.log('=====concat操作符: Error: ', err); },
            complete: () => { console.log('=====concat操作符: complete!'); }
        });
        // 第二种写法：使用rxjs内置静态函数
        const concatObservable2 = rxConcat(source01, source02, source03);
        this.concatSubscription2 = concatObservable2.subscribe({
            next: (value) => { console.log('=====concat2操作符: ', value); },
            error: (err) => { console.log('=====concat2操作符: Error: ', err); },
            complete: () => { console.log('=====concat2操作符: complete!'); }
        });
    }

    startWithHandler() {
        /**
         * 一开始就要发送的元素, startWith 的值是一开始就同步发出的
         * 例如：interval(1000).pipe(startWith(0))
         * source:      -----0-----1-----2-----3--..
         *                     startWith(0)
         * newest:      0-----0-----1-----2-----3--..
         */
        const startWidthObservable = interval(1000).pipe(startWith(0), take(4));
        this.startWithSubscription = startWidthObservable.subscribe({
            next: (value) => { console.log('=====startWith操作符: ', value); },
            error: (err) => { console.log('=====startWith操作符: Error: ', err); },
            complete: () => { console.log('=====startWith操作符: complete!'); }
        });
    }

    mergeHandler() {
        /**
         * 把多个observable同时处理, merge 的逻辑有点像是OR(||)，就是当两个observable 其中一个被触发时都可以被处理，这很常用在一个以上的按钮具有部分相同的行为。
         * source:      ----0----1----2|
         * source2:     --0--1--2--3--4--5|
         *                   merge()
         * newest:      --0-01--21-3--(24)--5|
         */
        const observable01 = interval(500).pipe(take(3));
        const observable02 = interval(300).pipe(take(6));
        // 第一种写法：使用Operator操作符
        const mergeObservable = observable01.pipe(merge(observable02));
        this.mergeSubscription = mergeObservable.subscribe({
            next: (value) => { console.log('=====merge操作符: ', value); },
            error: (err) => { console.log('=====merge操作符: Error: ', err); },
            complete: () => { console.log('=====merge操作符: complete!'); }
        });
        // 第二种写法：使用rxjs内置静态函数
        const mergeObservable2 = rxMerge(observable01, observable02);
        this.mergeSubscription2 = mergeObservable2.subscribe({
            next: (value) => { console.log('=====merge2操作符: ', value); },
            error: (err) => { console.log('=====merge2操作符: Error: ', err); },
            complete: () => { console.log('=====merge2操作符: complete!'); }
        });
    }

    ngOnDestroy() {
        if (this.skipSubscription) {
            this.skipSubscription.unsubscribe();
        }
        if (this.takeLastSubscription) {
            this.takeLastSubscription.unsubscribe();
        }
        if (this.lastSubscription) {
            this.lastSubscription.unsubscribe();
        }
        if (this.concatSubscription) {
            this.concatSubscription.unsubscribe();
        }
        if (this.concatSubscription2) {
            this.concatSubscription2.unsubscribe();
        }
        if (this.startWithSubscription) {
            this.startWithSubscription.unsubscribe();
        }
        if (this.mergeSubscription) {
            this.mergeSubscription.unsubscribe();
        }
        if (this.mergeSubscription2) {
            this.mergeSubscription2.unsubscribe();
        }
    }
}
