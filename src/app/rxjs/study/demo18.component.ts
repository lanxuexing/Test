import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

@Component({
    selector: 'app-rxjs-demo18',
    template: `
        <h3>Rxjs Demo18 To Study! -- Observer(Subject, BehaviorSubject, ReplaySubject, AsyncSubject)</h3>
        <button (click)="subjectHandler()">Subject</button>
        <button class="mgLeft" (click)="behaviorSubjectHandler()">BehaviorSubject</button>
        <button class="mgLeft" (click)="replaySubjectHandler()">ReplaySubject</button>
        <button class="mgLeft" (click)="asyncSubjectHandler()">AsyncSubject</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo18Component implements OnInit {
    constructor() { }

    ngOnInit(): void { }

    subjectHandler() {
        const subject = new Subject();
        const observerA = {
            next: (value) => { console.log('=====observerA: ', value); },
            error: (err) => { console.log('=====observerA: Error: ', err); },
            complete: () => { console.log('=====observerA: complete!'); }
        };
        const observerB = {
            next: (value) => { console.log('=====observerB: ', value); },
            error: (err) => { console.log('=====observerB: Error: ', err); },
            complete: () => { console.log('=====observerB: complete!'); }
        };
        subject.subscribe(observerA);
        subject.subscribe(observerB);
        setTimeout(() => {
            subject.next(1);
            subject.next(2);
        }, 1000);
    }

    behaviorSubjectHandler() {
        /**
         * BehaviorSubject代表当下的状态
         * BehaviorSubject 在建立时就需要给定一个状态，并在之后任何一次订阅，就会先送出最新的状态
         */
        const subject = new BehaviorSubject(0); // 0为起始值
        const observerA = {
            next: (value) => { console.log('=====observerA: ', value); },
            error: (err) => { console.log('=====observerA: Error: ', err); },
            complete: () => { console.log('=====observerA: complete!'); }
        };
        const observerB = {
            next: (value) => { console.log('=====observerB: ', value); },
            error: (err) => { console.log('=====observerB: Error: ', err); },
            complete: () => { console.log('=====observerB: complete!'); }
        };
        subject.subscribe(observerA);
        subject.next(1);
        subject.next(2);
        subject.next(3);
        setTimeout(() => {
            subject.subscribe(observerB);
        }, 3000);
    }

    replaySubjectHandler() {
        /**
         * ReplaySubject是事件的重放，代表事件
         * 在新订阅时重新发送最后的几个元素
         */
        const subject = new ReplaySubject(2);
        const observerA = {
            next: (value) => { console.log('=====observerA: ', value); },
            error: (err) => { console.log('=====observerA: Error: ', err); },
            complete: () => { console.log('=====observerA: complete!'); }
        };
        const observerB = {
            next: (value) => { console.log('=====observerB: ', value); },
            error: (err) => { console.log('=====observerB: Error: ', err); },
            complete: () => { console.log('=====observerB: complete!'); }
        };
        subject.subscribe(observerA);
        subject.next(1);
        subject.next(2);
        subject.next(3);
        setTimeout(() => {
            subject.subscribe(observerB);
        }, 3000);
    }

    asyncSubjectHandler() {
        /**
         * AsyncSubject有点像是operator last，会在subject结束后送出最后一个值.
         */
        const subject = new AsyncSubject();
        const observerA = {
            next: (value) => { console.log('=====observerA: ', value); },
            error: (err) => { console.log('=====observerA: Error: ', err); },
            complete: () => { console.log('=====observerA: complete!'); }
        };
        const observerB = {
            next: (value) => { console.log('=====observerB: ', value); },
            error: (err) => { console.log('=====observerB: Error: ', err); },
            complete: () => { console.log('=====observerB: complete!'); }
        };
        subject.subscribe(observerA);
        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.complete();
        setTimeout(() => {
            subject.subscribe(observerB);
        }, 3000);
    }
}
