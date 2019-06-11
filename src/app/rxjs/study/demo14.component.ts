import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent, interval, from } from 'rxjs';
import { concatMap, take, switchMap, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo14',
    template: `
        <h3>Rxjs Demo14 To Study! -- Operators操作符(switchMap, mergeMap, concatMap)</h3>
        <button (click)="switchMapHandler()">switchMap</button>
        <button class="mgLeft" (click)="mergeMapHandler()">mergeMap</button>
        <button class="mgLeft" (click)="concatMapHandler()">concatMap</button>
        <button class="mgLeft" (click)="concatMapFromNetMapHandler()">concatMap【网络请求】</button>
        <button class="mgLeft" (click)="switchMapFromNetMapHandler()">switchMap【网络请求】</button>
        <button class="mgLeft" (click)="mergeMapFromNetMapHandler()">mergeMap【网络请求】</button>
        <button class="mgLeft" id="btn">Button-Click</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo14Component implements OnInit, OnDestroy {
    concatAllSubscription: Subscription;
    switchMapSubscription: Subscription;
    mergeMapSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束

        /**
         * 使用说明：
         * 1. concatMap用在可以确定内部的observable结束时间比外部observable发送时间来快的情境，并且不希望有任何并行处理行为，适合少数要一次一次完成到底的的UI动画或特别的HTTP request行为。
         * 2. switchMap 用在只要最后一次行为的结果，适合绝大多数的使用情境。
         * 3. mergeMap 用在并行处理多个observable，适合需要并行处理的行为，像是多个I/O 的并行处理。
         * 特别的：
         * 1. 不确定选哪一个时，使用switchMap
         * 2. 在使用concatAll 或concatMap 时，请注意内部的observable 一定要能够的结束，且外部的observable 发送元素的速度不能比内部的observable 结束时间快太多，不然会有memory issues
         */
    }

    switchMapHandler() {
        /**
         * switchMap 其实就是map 加上switch 简化的写法，switchMap 会在下一个observable 被送出后直接退订前一个未处理完的observable
         * switchMap 会在下一个observable 被送出后直接退订前一个未处理完的observable
         * mergeMap可以把第一个参数所回传的promise物件直接转成observable
         * 例如： fromEvent(document.body, 'click').pipe(switchMap(interval(1000), take(3)))
         * source:              -----------c--c-----------------...
         *                    switchMap(e => interval(1000).pipe(take(3)))
         * example:             -------------0--0-1-2-----------...
         */
        const source = fromEvent(document.querySelector('#btn'), 'click').pipe(
            switchMap(e => interval(1000).pipe(
                take(3)
            ))
        );
        this.switchMapSubscription = source.subscribe({
            next: (value) => { console.log('=====switchMap操作符: ', value); },
            error: (err) => { console.log('=====switchMap操作符: Error: ', err); },
            complete: () => { console.log('=====switchMap操作符: complete!'); }
        });
    }

    mergeMapHandler() {
        /**
         * mergeMap 其实就是map 加上mergeAll 简化的写法
         * mergeMap可以把第一个参数所回传的promise物件直接转成observable
         * 例如:    fromEvent(document.body, 'click').pipe(mergeMap(e => interval(1000).pipe(take(3)))
         * source:            -----------c-c------------------...
         *                 mergeMap(e => interval(1000).pipe(take(3))
         * example:           -------------0-(10)-(21)-2----------...
         */
        const source = fromEvent(document.querySelector('#btn'), 'click').pipe(
            mergeMap(e => interval(1000).pipe(
                take(3)
            ))
        );
        this.mergeMapSubscription = source.subscribe({
            next: (value) => { console.log('=====mergeMap操作符: ', value); },
            error: (err) => { console.log('=====mergeMap操作符: Error: ', err); },
            complete: () => { console.log('=====mergeMap操作符: complete!'); }
        });
    }

    mergeMapFromNetMapHandler() {
        /**
         * mergeMap 其实就是map 加上mergeAll 简化的写法
         * mergeMap可以把第一个参数所回传的promise物件直接转成observable
         * 例如:    fromEvent(document.body, 'click').pipe(mergeMap(e => interval(1000).pipe(take(3)))
         * source:            -----------c-c------------------...
         *                 mergeMap(e => interval(1000).pipe(take(3))
         * example:           -------------0-(10)-(21)-2----------...
         */
        const source = fromEvent(document.querySelector('#btn'), 'click').pipe(
            mergeMap(
                e => from(this.getPostData()),
                (outside, inner, outsideIndex, innerIndex) => {
                    console.log(outside, inner, outsideIndex, innerIndex);
                    // tslint:disable-next-line:no-string-literal
                    return inner['title'];
                },
                3 // 并行处理的数量限制为3个
            )
        );
        this.mergeMapSubscription = source.subscribe({
            next: (value) => { console.log('=====mergeMap【网络请求】: ', value); },
            error: (err) => { console.log('=====mergeMap【网络请求】: Error: ', err); },
            complete: () => { console.log('=====mergeMap【网络请求】: complete!'); }
        });
    }

    concatMapHandler() {
        /**
         * concatMap 其实就是map 加上concatAll 的简化写法, concatMap 也会先处理前一个送出的observable 在处理下一个observable
         * mergeMap可以把第一个参数所回传的promise物件直接转成observable
         * 例如: fromEvent(document.body, 'click').pipe(concatMap(interval(1000), take(3)))
         * source:              -----------c--c------------------...
         *                       concatMap(e => interval(1000).pipe(take(3)))
         * example:             -----------0-1-2-0-1-2-----------...
         */
        const source = fromEvent(document.querySelector('#btn'), 'click').pipe(
            concatMap(e => interval(1000).pipe(
                take(3)
            ))
        );
        this.concatAllSubscription = source.subscribe({
            next: (value) => { console.log('=====concatMap操作符: ', value); },
            error: (err) => { console.log('=====concatMap操作符: Error: ', err); },
            complete: () => { console.log('=====concatMap操作符: complete!'); }
        });
    }

    concatMapFromNetMapHandler() {
        /**
         * concatMap 其实就是map 加上concatAll 的简化写法, concatMap 也会先处理前一个送出的observable 在处理下一个observable
         * concatMap 还有第二个参数是一个selector callback，这个callback 会传入四个参数，分别是
         * 1. 外部observable 送出的元素(click event)
         * 2. 内部observable 送出的元素(response)
         * 3. 外部observable 送出元素的index
         * 4. 内部observable 送出元素的index
         * mergeMap可以把第一个参数所回传的promise物件直接转成observable
         * 例如: fromEvent(document.body, 'click').pipe(concatMap(interval(1000), take(3)))
         * source:              -----------c--c------------------...
         *                       concatMap(interval(1000), take(3))
         * example:             -----------0-1-2-0-1-2-----------...
         */
        const source = fromEvent(document.querySelector('#btn'), 'click').pipe(
            concatMap(
                e => from(this.getPostData()),
                (outside, inner, outsideIndex, innerIndex) => {
                    console.log(outside, inner, outsideIndex, innerIndex);
                    // tslint:disable-next-line:no-string-literal
                    return inner['title'];
                }
            )
        );
        this.concatAllSubscription = source.subscribe({
            next: (value) => { console.log('=====concatMap【网络请求】: ', value); },
            error: (err) => { console.log('=====concatMap【网络请求】: Error: ', err); },
            complete: () => { console.log('=====concatMap【网络请求】: complete!'); }
        });
    }

    switchMapFromNetMapHandler() {
        /**
         * switchMap 其实就是map 加上switch 简化的写法，switchMap 会在下一个observable 被送出后直接退订前一个未处理完的observable
         * switchMap 会在下一个observable 被送出后直接退订前一个未处理完的observable
         * mergeMap可以把第一个参数所回传的promise物件直接转成observable
         * 例如： fromEvent(document.body, 'click').pipe(switchMap(interval(1000), take(3)))
         * source:              -----------c--c-----------------...
         *                    switchMap(e => interval(1000).pipe(take(3)))
         * example:             -------------0--0-1-2-----------...
         */
        const source = fromEvent(document.querySelector('#btn'), 'click').pipe(
            switchMap(
                e => from(this.getPostData()),
                (outside, inner, outsideIndex, innerIndex) => {
                    console.log(outside, inner, outsideIndex, innerIndex);
                    // tslint:disable-next-line:no-string-literal
                    return inner['title'];
                }
            ),
        );
        this.switchMapSubscription = source.subscribe({
            next: (value) => { console.log('=====switchMap【网络请求】: ', value); },
            error: (err) => { console.log('=====switchMap【网络请求】: Error: ', err); },
            complete: () => { console.log('=====switchMap【网络请求】: complete!'); }
        });
    }

    getPostData() {
        return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json());
    }

    ngOnDestroy() {
        if (this.concatAllSubscription) {
            this.concatAllSubscription.unsubscribe();
        }
        if (this.switchMapSubscription) {
            this.switchMapSubscription.unsubscribe();
        }
        if (this.mergeMapSubscription) {
            this.mergeMapSubscription.unsubscribe();
        }
    }
}
