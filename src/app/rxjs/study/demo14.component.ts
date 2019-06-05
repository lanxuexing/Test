import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent, interval, from } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo14',
    template: `
        <h3>Rxjs Demo14 To Study! -- Operators操作符(switchMap, mergeMap, concatMap)</h3>
        <button class="mgLeft" (click)="switchMapHandler()">switchMap</button>
        <button class="mgLeft" (click)="mergeMapHandler()">mergeMap</button>
        <button class="mgLeft" (click)="concatMapHandler()">concatMap</button>
        <button class="mgLeft" (click)="concatFromNetMapHandler()">concatMap【网络请求】</button>
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

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    switchMapHandler() {}

    mergeMapHandler() {}

    concatMapHandler() {
        /**
         * concatMap 其实就是map 加上concatAll 的简化写法, concatMap 也会先处理前一个送出的observable 在处理下一个observable
         * 例如: fromEvent(document.body, 'click').pipe(concatMap(interval(1000), take(3)))
         * source:              -----------c--c------------------...
         *                       concatMap(interval(1000), take(3))
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

    concatFromNetMapHandler() {
        /**
         * concatMap 其实就是map 加上concatAll 的简化写法, concatMap 也会先处理前一个送出的observable 在处理下一个observable
         * concatMap 还有第二个参数是一个selector callback，这个callback 会传入四个参数，分别是
         * 1. 外部observable 送出的元素(click event)
         * 2. 内部observable 送出的元素(response)
         * 3. 外部observable 送出元素的index
         * 4. 内部observable 送出元素的index
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

    getPostData() {
        return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json());
    }

    ngOnDestroy() {
        if (this.concatAllSubscription) {
            this.concatAllSubscription.unsubscribe();
        }
    }
}
