import { Component, OnInit } from '@angular/core';
import { interval, Subject, asapScheduler } from 'rxjs';
import { map, observeOn } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo20',
    template: `
        <h3>Rxjs Demo20 To Study! -- Subject总结</h3>
        <button (click)="subjectOneHandler()">subject问题一</button>
        <button class="mgLeft" (click)="subjectTwoHandler()">subject问题二</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo20Component implements OnInit {
    constructor() { }

    ngOnInit(): void {
        /**
         * 使用说明：
         * 当我们一个observable 的操作过程中发生了side-effect 而我们不希望这个side-effect 因为多个subscribe 而被触发多次
         */
    }

    subjectOneHandler() {
        /**
         * subject在订阅的时候，是把observer放到一份清单中，并在元素要送出的（next）的时候遍历这份清单，
         * 低版本rxjs的需要手动处理错误，否则程序会崩溃
         */
        const source = interval(1000);
        const subject = new Subject();
        const example = subject.pipe(
            map(x => {
                if (x === 1) {
                    throw new Error('oops');
                }
                return x;
            })
        );
        subject.subscribe(x => console.log('A', x));
        example.subscribe(
            x => console.log('B', x),
            err => console.log('发生了错误: ', err)
        );
        subject.subscribe(x => console.log('C', x));
        const realSubscription = source.subscribe(subject);
        setTimeout(() => {
            realSubscription.unsubscribe();
        }, 7000);
    }

    subjectTwoHandler() {
        /**
         * Scheduler解决方案
         */
        const source = interval(1000).pipe(
            observeOn(asapScheduler)
        );
        const subject = new Subject();
        const example = subject.pipe(
            map(x => {
                if (x === 1) {
                    throw new Error('oops');
                }
                return x;
            })
        );
        subject.subscribe(x => console.log('A', x));
        example.subscribe(
            x => console.log('B', x),
            err => console.log('发生了错误: ', err)
        );
        subject.subscribe(x => console.log('C', x));
        const realSubscription = source.subscribe(subject);
        setTimeout(() => {
            realSubscription.unsubscribe();
        }, 7000);
    }
}
