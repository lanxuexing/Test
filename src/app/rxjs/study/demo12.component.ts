import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, from, interval, of, empty, observable } from 'rxjs';
import { zip, map, catchError, take, retry, retryWhen, delay, repeat, startWith, concat } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo12',
    template: `
        <h3>Rxjs Demo12 To Study! -- Operators操作符(catchError, retry, retryWhen, repeat)</h3>
        <button class="mgLeft" (click)="catchErrorFromOfHandler()">catchError【of继续】</button>
        <button class="mgLeft" (click)="catchErrorFromEmptyHandler()">catchError【empty直接结束】</button>
        <button class="mgLeft" (click)="catchErrorFromResetHandler()">catchError【empty重试】</button>
        <button class="mgLeft" (click)="retryHandler()">retry</button>
        <button class="mgLeft" (click)="retryWhenHandler()">retryWhen</button>
        <button class="mgLeft" (click)="repeatHandler()">repeat</button>
        <button class="mgLeft" (click)="exampleHandler()">example实例</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo12Component implements OnInit, OnDestroy {
    catchErrorSubscription: Subscription;
    retrySubscription: Subscription;
    retryWhenSubscription: Subscription;
    repeatWhenSubscription: Subscription;
    exampleSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    catchErrorFromOfHandler() {
        /**
         * catch 可以回传一个observable 来送出新的值
         * 例如： from(['a', 'b', 'c', 'd', 2]).pipe(zip(interval(500), (x, y) => x)).pipe(map(x => x.toUpperCase(), catch(e => of('h'))));
         * source1:         -----(abcd2)|
         * source2:         -----0-----1-----2-----3-----4--..
         *                          zip(source2, (x, y) => x)
         * newest:          -----a-----b-----c-----d-----2|
         *                          map(x => x.toUpperCase())
         * source3:         -----A-----B-----C-----D-----X|
         *                          catch(e => of('h'))
         * example:         -----A-----B-----C-----D-----h|
         */
        const source = from(['a', 'b', 'c', 'd', 2]).pipe(
            zip(interval(500), (x, y) => x)
        );
        const newest = source.pipe(
            map((x: string) => x.toUpperCase())
        );
        const catchObservable = newest.pipe(
            map((x: string) => x.toUpperCase()),
            catchError(err => of('h'))
        );
        this.catchErrorSubscription = catchObservable.subscribe({
            next: (value) => { console.log('=====catch操作符: ', value); },
            error: (err) => { console.log('=====catch操作符: Error: ', err); },
            complete: () => { console.log('=====catch操作符: complete!'); }
        });
    }

    catchErrorFromEmptyHandler() {
        /**
         * catch 可以回传一个observable 来送出新的值
         * 例如： from(['a', 'b', 'c', 'd', 2]).pipe(zip(interval(500), (x, y) => x)).pipe(map(x => x.toUpperCase(), catch(e => empty())));
         * source1:         -----(abcd2)|
         * source2:         -----0-----1-----2-----3-----4--..
         *                          zip(source2, (x, y) => x)
         * newest:          -----a-----b-----c-----d-----2|
         *                          map(x => x.toUpperCase())
         * source3:         -----A-----B-----C-----D-----X|
         *                          catch(e => empty())
         * example:         -----A-----B-----C-----D|
         */
        const source = from(['a', 'b', 'c', 'd', 2]).pipe(
            zip(interval(500), (x, y) => x)
        );
        const newest = source.pipe(
            map((x: string) => x.toUpperCase())
        );
        const catchObservable = newest.pipe(
            map((x: string) => x.toUpperCase()),
            catchError(err => empty())
        );
        this.catchErrorSubscription = catchObservable.subscribe({
            next: (value) => { console.log('=====catch操作符: ', value); },
            error: (err) => { console.log('=====catch操作符: Error: ', err); },
            complete: () => { console.log('=====catch操作符: complete!'); }
        });
    }

    catchErrorFromResetHandler() {
        /**
         * catch 可以回传一个observable 来送出新的值
         * 例如： from(['a', 'b', 'c', 'd', 2]).pipe(zip(interval(500), (x, y) => x)).pipe(map(x => x.toUpperCase(), catch((e, obs) => obs)));
         * source1:         -----(abcd2)|
         * source2:         -----0-----1-----2-----3-----4--..
         *                          zip(source2, (x, y) => x)
         * newest:          -----a-----b-----c-----d-----2|
         *                          map(x => x.toUpperCase())
         * source3:         -----A-----B-----C-----D-----X|
         *                          catch((err, observable) => observable)
         * example:         -----A-----B-----C-----D|
         */
        const source = from(['a', 'b', 'c', 'd', 2]).pipe(
            zip(interval(500), (x, y) => x)
        );
        const newest = source.pipe(
            map((x: string) => x.toUpperCase())
        );
        const catchObservable = newest.pipe(
            map((x: string) => x.toUpperCase()),
        ).pipe(
            catchError((err, obs) => obs),
            take(5)
        );
        this.catchErrorSubscription = catchObservable.subscribe({
            next: (value) => { console.log('=====catch操作符: ', value); },
            error: (err) => { console.log('=====catch操作符: Error: ', err); },
            complete: () => { console.log('=====catch操作符: complete!'); }
        });
    }

    retryHandler() {
        /**
         * 当一个observable发生错误时，可以进行重试
         * 例如： from(['a', 'b', 'c', 'd', 2]).pipe(zip(interval(500), (x, y) => x)).pipe(map(x => x.toUpperCase(), retry()));
         * source:          -----a-----b-----c-----d-----2|
         *                      map(x => x.toUpperCase())
         *                  -----a-----b-----c-----d-----X|
         *                              retry(1)
         * example:         -----a-----b-----c-----d--------a----b----c----d----X|
         */
        const source = from(['a', 'b', 'c', 'd', 2]).pipe(
            zip(interval(500), (x, y) => x)).pipe(
                map((x: string) => x.toUpperCase(),
            )
        ).pipe(
            retry(1)
        );
        this.retrySubscription = source.subscribe({
            next: (value) => { console.log('=====retry操作符: ', value); },
            error: (err) => { console.log('=====retry操作符: Error: ', err); },
            complete: () => { console.log('=====retry操作符: complete!'); }
        });
    }

    retryWhenHandler() {
        /**
         * retryWhen可以把例外发生的元素放到一个observable中，让我们可以直接操作这个observable，并等到这个observable操作完后再重新订阅一次原本的observable。
         * 例如： from(['a', 'b', 'c', 'd', 2]).pipe(zip(interval(500), (x, y) => x)).pipe(
         *          map(x => x.toUpperCase(),
         *          retryWhen(errorObs => errorObs.delay(1000)))
         *       );
         * source:              ----a----b----c----d----2|
         *                       map(x => x.toUpperCase())
         *                      ----a----b----c----d----X|
         *                  retryWhen(errorObs => errorObs.delay(1000))
         * example:             ----a----b----c----d-------------------a----b----c----d----...
         */
        const source = from(['a', 'b', 'c', 'd', 2]).pipe(
            zip(interval(500), (x, y) => x)
        ).pipe(
            map((x: string) => x.toUpperCase()),
            retryWhen(errObservable => errObservable.pipe(
                delay(1000)
            )),
            take(10)
        );
        this.retryWhenSubscription = source.subscribe({
            next: (value) => { console.log('=====retryWhen操作符: ', value); },
            error: (err) => { console.log('=====retryWhen操作符: Error: ', err); },
            complete: () => { console.log('=====retryWhen操作符: complete!'); }
        });
    }

    repeatHandler() {
        /**
         * source :         ----a----b----c|
         *                          repeat(1)
         * example:         ----a----b----c----a----b----c|
         */
        const source = from(['a', 'b', 'c']).pipe(
            zip(interval(500), (x, y) => x)
        ).pipe(
            map((x: string) => x.toUpperCase()),
            repeat(1)
        );
        this.repeatWhenSubscription = source.subscribe({
            next: (value) => { console.log('=====repeat操作符: ', value); },
            error: (err) => { console.log('=====repeat操作符: Error: ', err); },
            complete: () => { console.log('=====repeat操作符: complete!'); }
        });
    }

    exampleHandler() {
        const source = from(['a', 'b', 'c', 'd', 2]).pipe(
            zip(interval(500), (x, y) => x)
        ).pipe(
            map((x: string) => x.toUpperCase()),
            catchError((error, obs) => empty().pipe(
                startWith('连续发生错误, 5s之后进行重试'),
                concat(obs.pipe(
                    delay(5000)
                )),
                take(20)
            ))
        );
        this.exampleSubscription = source.subscribe({
            next: (value) => { console.log('=====example实例: ', value); },
            error: (err) => { console.log('=====example实例: Error: ', err); },
            complete: () => { console.log('=====example实例: complete!'); }
        });
    }

    ngOnDestroy() {
        if (this.catchErrorSubscription) {
            this.catchErrorSubscription.unsubscribe();
        }
        if (this.retrySubscription) {
            this.retrySubscription.unsubscribe();
        }
        if (this.retryWhenSubscription) {
            this.retryWhenSubscription.unsubscribe();
        }
        if (this.repeatWhenSubscription) {
            this.repeatWhenSubscription.unsubscribe();
        }
        if (this.exampleSubscription) {
            this.exampleSubscription.unsubscribe();
        }
    }
}
