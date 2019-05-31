import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from, interval, fromEvent, empty } from 'rxjs';
import { zip, scan, startWith, merge, mapTo, buffer, take, bufferTime, bufferCount, filter } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo08',
    template: `
        <h3>Rxjs Demo08 To Study! -- Operators操作符(scan, buffer, bufferTime, bufferCount)</h3>
        <button class="mgLeft" (click)="scanHandler()">scan</button>
        <button class="mgLeft" (click)="bufferHandler()">buffer</button>
        <button class="mgLeft" (click)="bufferTimeHandler()">bufferTime</button>
        <button class="mgLeft" (click)="bufferCountHandler()">bufferCount</button>
        <button class="mgLeft" (click)="reduceHandler()">JS版Reduce</button>
        <button class="mgLeft" (click)="exapleHandler()">实例</button>
        <button class="mgLeft" (click)="addMinusHandler()">AddMinus</button>
        <button class="mgLeft" id="add">Add</button>
        <button class="mgLeft" id="minus">Minus</button
        <p id="state"></p>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo08Component implements OnInit, OnDestroy {
    scanSubscription: Subscription;
    bufferSubscription: Subscription;
    calcValue = 0; // 初始值为0
    bufferTimerSubscription: Subscription;
    bufferCountSubscription: Subscription;
    exampleSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    scanHandler() {
        /**
         * scan需要传两个参数，第一个是callback 第二个则是起始状态，这个callback 执行时，会传入两个参数一个是原本的状态，第二个是修改原本状态的参数，最后回传一个新的状态，再继续执行。
         * scan 一定会回传一个observable 实例
         * 例如: from('hello').pipe(zip(interval(600), (x, y) => x),scan((origin, next) => origin + next, ''))
         * source:        -----h-----e-----l-----l-----0|
         *          scan((origin, next) => origin + next, '')
         * newest:        -----h-----(he)-----(hel)-----(hell)-----(hello)|
         */
        const scanObservable = from('hello').pipe(
            zip(interval(600), (x, y) => x),
            scan((origin, next) => origin + next, '')
        );
        this.scanSubscription = scanObservable.subscribe({
            next: (value) => { console.log('=====scan操作符: ', value); },
            error: (err) => { console.log('=====scan操作符: Error: ', err); },
            complete: () => { console.log('=====scan操作符: complete!'); }
        });
    }

    bufferHandler() {
        /**
         * 缓冲阵列
         * buffer 是个大家族buffer bufferCount bufferTime bufferToggle bufferWhen
         * buffer 要传入一个observable(source2)，它会把原本的observable (source)送出的元素缓存在阵列中，等到传入的observable(source2) 送出元素时，就会触发把缓存的元素送出。
         * source1:       --0--1--2--3--4--5--6--7--..
         * source2:       ----------0-----------1---..
         *                   source1.pipe(buffer(source2))
         * newest:        ----------([0, 1, 2])-----------([3, 4, 5])---..
         */
        const source1 = interval(300);
        const source2 = interval(1000);
        const bufferObservable = source1.pipe(buffer(source2)).pipe(take(3));
        this.bufferSubscription = bufferObservable.subscribe({
            next: (value) => { console.log('=====buffer操作符: ', value); },
            error: (err) => { console.log('=====buffer操作符: Error: ', err); },
            complete: () => { console.log('=====buffer操作符: complete!'); }
        });
    }

    bufferTimeHandler() {
        /**
         * 每隔一定时间输出缓冲阵列
         */
        const source1 = interval(300);
        const source2 = source1.pipe(bufferTime(1000)).pipe(take(4));
        this.bufferTimerSubscription = source2.subscribe({
            next: (value) => { console.log('=====bufferTimer操作符: ', value); },
            error: (err) => { console.log('=====bufferTimer操作符: Error: ', err); },
            complete: () => { console.log('=====bufferTimer操作符: complete!'); }
        });
    }

    bufferCountHandler() {
        /**
         * 用变量缓冲阵列
         */
        const source1 = interval(300);
        const source2 = source1.pipe(bufferCount(3)).pipe(take(4));
        this.bufferCountSubscription = source2.subscribe({
            next: (value) => { console.log('=====bufferCount操作符: ', value); },
            error: (err) => { console.log('=====bufferCount操作符: Error: ', err); },
            complete: () => { console.log('=====bufferCount操作符: complete!'); }
        });
    }

    exapleHandler() {
        const clicks = fromEvent(document, 'click');
        const emapleObservable = clicks.pipe(
            bufferTime(500),
            filter(arr => arr.length >= 2)
        );
        this.exampleSubscription = emapleObservable.subscribe({
            next: (value) => { console.log('=====实例: ', value); },
            error: (err) => { console.log('=====实例: Error: ', err); },
            complete: () => { console.log('=====实例: complete!'); }
        });
    }

    reduceHandler() {
        const arr = [1, 2, 3, 4];
        const result = arr.reduce((origin, next) => {
            console.log(origin);
            return origin + next;
        }, 0);
        console.log('result: ', result);
    }

    addMinusHandler() {
        const add = document.getElementById('add');
        const minus = document.getElementById('minus');
        const state = document.getElementById('state');
        const addObservable = fromEvent(add, 'click').pipe(mapTo(1));
        const minusObservable = fromEvent(minus, 'click').pipe(mapTo(-1));
        this.scanSubscription = empty().pipe(
            startWith(0),
            merge(addObservable, minusObservable),
            scan((origin, next) => origin + next, 0)
        ).subscribe({
            next: (value) => { console.log('=====scan操作符: ', value); state.innerHTML = `当前值: ${value}`; },
            error: (err) => { console.log('=====scan操作符: Error: ', err); },
            complete: () => { console.log('=====scan操作符: complete!'); }
        });
    }

    ngOnDestroy() {
        if (this.scanSubscription) {
            this.scanSubscription.unsubscribe();
        }
        if (this.bufferSubscription) {
            this.bufferSubscription.unsubscribe();
        }
        if (this.bufferTimerSubscription) {
            this.bufferTimerSubscription.unsubscribe();
        }
        if (this.bufferCountSubscription) {
            this.bufferCountSubscription.unsubscribe();
        }
        if (this.exampleSubscription) {
            this.exampleSubscription.unsubscribe();
        }
    }
}
