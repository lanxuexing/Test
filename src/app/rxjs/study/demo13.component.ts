import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, interval, of, Subscription } from 'rxjs';
import { map, concatAll, take, switchMap, mergeAll } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo13',
    template: `
        <h3>Rxjs Demo13 To Study! -- Operators操作符(switchMap, mergeAll, concatAll)</h3>
        <button class="mgLeft" (click)="switchMapHandler()">switchMap</button>
        <button class="mgLeft" (click)="mergeAllHandler()">mergeAll</button>
        <button class="mgLeft" (click)="mergeAllFromParamsHandler()">mergeAll【带参数】</button>
        <button class="mgLeft" (click)="concatAllHandler()">concatAll</button>
        <button class="mgLeft" id="btn">Button-Click</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo13Component implements OnInit, OnDestroy {
    concatAllSubscription: Subscription;
    switchMapSubscription: Subscription;
    mergeAllSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束

        /**
         * Observable<Observable<T>>
         * Observable<Observable<T>> => Observable<T>
         */
    }

    switchMapHandler() {
        /**
         * switch最重要的就是他会在新的observable送出后直接处理新的observable不管前一个observable是否完成，
         * 每当有新的observable送出就会直接把旧的observable退订(unsubscribe)，永远只处理最新的observable!
         * 例如：fromEvent(document.body, 'click').pipe(map(e => interval(1000))).pipe(switch())
         * click:          ---------c-c------------------c--..
         *                       map(e => interval(1000))
         * source:         ---------o-o------------------o--..
         *                           \ \                  \
         *                            \ \                  0----1----2--...
         *                             \ ----0----1----2----3----4--...
         *                             ----0----1----2----3----4--...
         *                       switch()
         * example:        -----------------0----1----2----0----1--..
         */
        const source = fromEvent(document.getElementById('btn'), 'click').pipe(
            map(e => interval(1000)),
            take(10),
            switchMap((obs, index) => {console.log(index); return obs; })
        );
        this.switchMapSubscription = source.subscribe({
            next: (value) => { console.log('=====switchMap操作符: ', value); },
            error: (err) => { console.log('=====switchMap操作符: Error: ', err); },
            complete: () => { console.log('=====switchMap操作符: complete!'); }
        });
    }

    mergeAllHandler() {
        /**
         * mergeAll会把二维的observable 转成一维的，并且能够同时处理所有的observable
         * mergeAll可以传入一个数值，这个数值代表他可以同时处理的observable 数量(如果我们传入1其行为就会跟concatAll是一模一样的)
         * 例如：fromEvent(document.body, 'click').pipe(map(e => interval(1000))).pipe(mergeAll())
         * click:           ---------c-c------------------c--..
         *                        map(e => interval(1000))
         * source:          ---------o-o------------------o--..
         *                            \ \                  \----0----1--...
         *                             \ ----0----1----2----3----4--...
         *                              ----0----1----2----3----4--...
         *                        mergeAll()
         * example:         ----------------00---11---22---33---(04)4--...
         */
        const source = fromEvent(document.getElementById('btn'), 'click').pipe(
            map(e => interval(1000).pipe(
                take(5)
            )),
            mergeAll()
        );
        this.mergeAllSubscription = source.subscribe({
            next: (value) => { console.log('=====mergeAll操作符: ', value); },
            error: (err) => { console.log('=====mergeAll操作符: Error: ', err); },
            complete: () => { console.log('=====mergeAll操作符: complete!'); }
        });
    }

    mergeAllFromParamsHandler() {
        /**
         * mergeAll会把二维的observable 转成一维的，并且能够同时处理所有的observable
         * mergeAll可以传入一个数值，这个数值代表他可以同时处理的observable 数量(如果我们传入1其行为就会跟concatAll是一模一样的)
         * 例如：fromEvent(document.body, 'click').pipe(map(e => interval(1000))).pipe(mergeAll())
         * click:           ---------c-c------------------c--..
         *                        map(e => interval(1000))
         * source:          ---------o-o------------------o--..
         *                            \ \                  \----0----1--...
         *                             \ ----0----1----2----3----4--...
         *                              ----0----1----2----3----4--...
         *                        mergeAll()
         * example:         ----------------00---11---22---33---(04)4--...
         */
        const source = fromEvent(document.getElementById('btn'), 'click').pipe(
            map(e => interval(1000).pipe(
                take(5)
            )),
            mergeAll(2)
        );
        this.mergeAllSubscription = source.subscribe({
            next: (value) => { console.log('=====mergeAll操作符: ', value); },
            error: (err) => { console.log('=====mergeAll操作符: Error: ', err); },
            complete: () => { console.log('=====mergeAll操作符: complete!'); }
        });
    }

    concatAllHandler() {
        /**
         * concatAll 最重要的重点就是他会处理完前一个observable 才会在处理下一个observable
         * 即： concatAll会一个一个处理，一定是等前一个observable完成(complete)才会处理下一个observable
         * 例如：fromEvent(document.body, 'click').pipe(map(e => interval(1000))).pipe(concatAll())
         * click:          ---------c-c------------------c--..
         *                      map(e => interval(1000))
         * source:         ---------o-o------------------o--..
         *                           \ \
         *                            \ ----0----1----2----3----4--...
         *                             ----0----1----2----3----4--...
         *                      concatAll()
         * example:        ----------------0----1----2----3----4--..
         */
        const source = fromEvent(document.getElementById('btn'), 'click').pipe(
            map(e => interval(1000)),
            take(6),
            concatAll()
        );
        this.concatAllSubscription = source.subscribe({
            next: (value) => { console.log('=====concatAll操作符: ', value); },
            error: (err) => { console.log('=====concatAll操作符: Error: ', err); },
            complete: () => { console.log('=====concatAll操作符: complete!'); }
        });
    }

    ngOnDestroy() {
        if (this.concatAllSubscription) {
            this.concatAllSubscription.unsubscribe();
        }
        if (this.switchMapSubscription) {
            this.switchMapSubscription.unsubscribe();
        }
        if (this.mergeAllSubscription) {
            this.mergeAllSubscription.unsubscribe();
        }
    }
}
