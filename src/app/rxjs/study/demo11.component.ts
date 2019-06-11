import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Subscription } from 'rxjs';
import { distinct, distinctUntilChanged, zip } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo11',
    template: `
        <h3>Rxjs Demo11 To Study! -- Operators操作符(distinct, distinctUntilChanged)</h3>
        <button (click)="distinctHandler()">distinct</button>
        <button class="mgLeft" (click)="distinctOfObjectHandler()">distinct【object】</button>
        <button class="mgLeft" (click)="distinctOfFlushesHandler()">distinct【flushes】</button>
        <button class="mgLeft" (click)="distinctUntilChangedHandler()">distinctUntilChanged</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo11Component implements OnInit, OnDestroy {
    distinctSubscription: Subscription;
    distinctUntilChangedSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    distinctHandler() {
        /**
         * 过滤重复
         * 例如： from(['a', 'b', 'c', 'a', 'b']).pipe(zip(interval(300), (x, y) => x)).pipe(distinct())
         * source1;          -----a-----b-----c-----a-----b|
         * source2:          ---1---2---3---4---5---6---7---8--..
         *                        zip(interval(300))
         * newest:           -----a-b---c---a---b|
         *                          distinct()
         * example:          -----a-b---c|
         */
        const source = from(['a', 'b', 'c', 'a', 'b']).pipe(zip(interval(300), (x, y) => x));
        const distinctObservable = source.pipe(distinct());
        this.distinctSubscription = distinctObservable.subscribe({
            next: (value) => { console.log('=====distinct操作符: ', value); },
            error: (err) => { console.log('=====distinct操作符: Error: ', err); },
            complete: () => { console.log('=====distinct操作符: complete!'); }
        });
    }

    distinctOfObjectHandler() {
        const source1 = from([{value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'a'}, {value: 'c'}]).pipe(
            zip(interval(300), (x, y) => x)
        );
        const source2 = source1.pipe(distinct(x => {
            return x.value;
        }));
        this.distinctSubscription = source2.subscribe({
            next: (value) => { console.log('=====distinct操作符: ', value); },
            error: (err) => { console.log('=====distinct操作符: Error: ', err); },
            complete: () => { console.log('=====distinct操作符: complete!'); }
        });
    }

    distinctOfFlushesHandler() {
        /**
         * flushes observale在送出元素的时候，会把distinct的暂存清空，所以说之后的暂存就会从来来过（主要是解决暂存的Set越来越大的问题，本质的new Set()去除重复）
         * source :         --a--b--c--a--c|
         * flushes:         ------------0---...
         *              distinct(null, flushes);
         * example:         --a--b--c-----c|
         */
        const source1 = from(['a', 'b', 'c', 'a', 'c']).pipe(
            zip(interval(300), (x, y) => x)
        );
        const source2 = interval(1300);
        const exapmple = source1.pipe(
            distinct(null, source2)
        );
        this.distinctSubscription = exapmple.subscribe({
            next: (value) => { console.log('=====distinct操作符: ', value); },
            error: (err) => { console.log('=====distinct操作符: Error: ', err); },
            complete: () => { console.log('=====distinct操作符: complete!'); }
        });
    }

    distinctUntilChangedHandler() {
        /**
         * distinctUntilChanged也是去除重复，但是只会跟最后一次送出的元素比较，不会每个都进行对比
         * source:          -----a-----b-----c-----c-----b|
         *                      distinctUntilChanged()
         * newest:          -----a-----b-----c-----------b|
         */
        const source = from(['a', 'b', 'c', 'c', 'c', 'b']).pipe(
            zip(interval(300), (x, y) => x)
        );
        const distinctUnitChangedObservable = source.pipe(
            distinctUntilChanged()
        );
        this.distinctUntilChangedSubscription = distinctUnitChangedObservable.subscribe({
            next: (value) => { console.log('=====distinctUntilChanged操作符: ', value); },
            error: (err) => { console.log('=====distinctUntilChanged操作符: Error: ', err); },
            complete: () => { console.log('=====distinctUntilChanged操作符: complete!'); }
        });
    }

    ngOnDestroy() {
        if (this.distinctSubscription) {
            this.distinctSubscription.unsubscribe();
        }
        if (this.distinctUntilChangedSubscription) {
            this.distinctUntilChangedSubscription.unsubscribe();
        }
    }
}
