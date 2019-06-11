import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo17',
    template: `
        <h3>Rxjs Demo17 To Study! -- Subject的深入</h3>
        <button class="mgLeft" (click)="normalHandler()">正常Observable</button>
        <button class="mgLeft" (click)="multicastHandler()">组播Observable</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo17Component implements OnInit, OnDestroy {
    normalASubscription: Subscription;
    normalBSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        /**
         * Subject总结：
         * 1、Subject 同时是Observable 又是Observer
         * 2、Subject 会对内部的observers 清单进行组播(multicast)
         */
    }

    normalHandler() {
        const source = interval(1000).pipe(take(4));
        const observableA = {
            next: (value) => { console.log('=====observableA: ', value); },
            error: (err) => { console.log('=====observableA: Error: ', err); },
            complete: () => { console.log('=====observableA: complete!'); }
        };
        const observableB = {
            next: (value) => { console.log('=====observableB: ', value); },
            error: (err) => { console.log('=====observableB: Error: ', err); },
            complete: () => { console.log('=====observableB: complete!'); }
        };
        this.normalASubscription = source.subscribe(observableA);
        this.normalBSubscription = source.subscribe(observableB);
    }

    multicastHandler() {
        const source = interval(1000).pipe(take(4));
        const observableA = {
            next: (value) => { console.log('=====observableA: ', value); },
            error: (err) => { console.log('=====observableA: Error: ', err); },
            complete: () => { console.log('=====observableA: complete!'); }
        };
        const observableB = {
            next: (value) => { console.log('=====observableB: ', value); },
            error: (err) => { console.log('=====observableB: Error: ', err); },
            complete: () => { console.log('=====observableB: complete!'); }
        };
        const subject = {
            observables: [] = [],

            // 第一种写法
            addObservable(observable) {
                this.observables.push(observable);
            },

            // 第二种写法
            subscribe(observable) {
                this.observables.push(observable);
            },

            next(value) {
                this.observables.forEach(o => o.next(value));
            },

            error(value) {
                this.observables.forEach(o => o.error(value));
            },

            complete() {
                this.observables.forEach(o => o.complete());
            }
        };

        // 第一种写法
        subject.addObservable(observableA);
        source.subscribe(subject);
        setTimeout(() => {
            subject.addObservable(observableB);
        }, 1000);

        // 第二种写法
        subject.subscribe(observableA);
        source.subscribe(subject);
        setTimeout(() => {
            subject.subscribe(observableB);
        }, 1000);
    }

    ngOnDestroy() {
        if (this.normalASubscription) {
            this.normalASubscription.unsubscribe();
        }
        if (this.normalBSubscription) {
            this.normalBSubscription.unsubscribe();
        }
    }
}
