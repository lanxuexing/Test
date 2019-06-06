import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { take, throttle, throttleTime, debounceTime, debounce } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo10',
    template: `
        <h3>Rxjs Demo10 To Study! -- Operators操作符(debounce, throttleTime, debounceTime)</h3>
        <button class="mgLeft" (click)="debounceHandler()">debounce</button>
        <button class="mgLeft" (click)="debounceTimeHandler()">debounceTime</button>
        <button class="mgLeft" (click)="throttleTimeHandler()">throttleTime</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo10Component implements OnInit, OnDestroy {
    debounceTimeSubscription: Subscription;
    throttleTimeSubscription: Subscription;
    debounceSubscription: Subscription;

    constructor() {
        /**
         * 使用说明：
         * debounce 是我妈一直催我做某件事，我就一直赌气不去做，直到我妈不再催我一段时间后，我就自动去做。简而言之debounce 就是一直触发就不做，等到静止一段时间后去做
         * throttle 是我跟我妈拿钱，但我妈一个月只会给我一次钱，这一个月中间我跟我妈要多少次钱都没有用(我妈不会给我)。简而言之throttle 就是频率限制。
         */
    }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    debounceHandler() {
        const source1 = interval(300).pipe(take(5));
        const source2 = interval(1000);
        this.debounceSubscription = source1.pipe(
            debounce(_ => source2)
        ).subscribe({
            next: (value) => { console.log('=====debounce操作符: ', value); },
            error: (err) => { console.log('=====debounce操作符: Error: ', err); },
            complete: () => { console.log('=====debounce操作符: complete!'); }
        });
    }

    debounceTimeHandler() {
        const debounceTimeObservable = interval(300).pipe(
            take(5),
            debounceTime(1000)
        );
        this.debounceTimeSubscription = debounceTimeObservable.subscribe({
            next: (value) => { console.log('=====debounceTime操作符: ', value); },
            error: (err) => { console.log('=====debounceTime操作符: Error: ', err); },
            complete: () => { console.log('=====debounceTime操作符: complete!'); }
        });
    }

    throttleTimeHandler() {
        const throttleObservable = interval(300).pipe(
            take(5),
            throttleTime(1000),
        );
        this.throttleTimeSubscription = throttleObservable.subscribe({
            next: (value) => { console.log('=====throttleTime操作符: ', value); },
            error: (err) => { console.log('=====throttleTime操作符: Error: ', err); },
            complete: () => { console.log('=====throttleTime操作符: complete!'); }
        });
    }

    ngOnDestroy() {
        if (this.debounceSubscription) {
            this.debounceSubscription.unsubscribe();
        }
        if (this.debounceTimeSubscription) {
            this.debounceTimeSubscription.unsubscribe();
        }
        if (this.throttleTimeSubscription) {
            this.throttleTimeSubscription.unsubscribe();
        }
    }
}
