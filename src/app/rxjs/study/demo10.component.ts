import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { take, throttle, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo09',
    template: `
        <h3>Rxjs Demo10 To Study! -- Operators操作符(throttleTime, debounceTime)</h3>
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

    constructor() { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    debounceTimeHandler() {}

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
        if (this.debounceTimeSubscription) {
            this.debounceTimeSubscription.unsubscribe();
        }
        if (this.throttleTimeSubscription) {
            this.throttleTimeSubscription.unsubscribe();
        }
    }
}
