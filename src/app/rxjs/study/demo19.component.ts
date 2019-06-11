import { Component, OnInit } from '@angular/core';
import { interval, Subject, ConnectableObservable } from 'rxjs';
import { take, tap, multicast, refCount, publish, publishBehavior, publishReplay, publishLast, share } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo19',
    template: `
        <h3>Rxjs Demo19 To Study! -- Observable操作符(multicast, refCount, publish, share)</h3>
        <button (click)="subjectHandler()">subject</button>
        <button class="mgLeft" (click)="multicastHandler()">multicast</button>
        <button class="mgLeft" (click)="refCountHandler()">refCount</button>
        <button class="mgLeft" (click)="publishHandler()">publish</button>
        <button class="mgLeft" (click)="shareHandler()">share</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo19Component implements OnInit {
    constructor() { }

    ngOnInit(): void { }

    subjectHandler() {
        const source = interval(1000).pipe(take(3));
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
        const subject = new Subject();
        subject.subscribe(observerA);
        source.subscribe(subject);
        setTimeout(() => {
            subject.subscribe(observerB);
        }, 1000);
    }

    multicastHandler() {
        /**
         * multicast 可以用来挂载subject 并回传一个可连结(connectable)的observable
         */
        const source = interval(1000).pipe(
            tap(x => console.log('send: ' + x)),
            multicast(() => new Subject())
        );
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
        const subscriptionA = source.subscribe(observerA);
        // 必须真的等到执行connect()后才会真的用subject订阅source，并开始送出元素，如果没有执行connect() observable是不会真正执行的
        const realSubscription = (source as ConnectableObservable<any>).connect();
        let subscriptionB;
        setTimeout(() => {
            subscriptionB = source.subscribe(observerB);
        }, 1000);
        setTimeout(() => {
            subscriptionA.unsubscribe();
            subscriptionB.unsubscribe();
        }, 5000);
        setTimeout(() => {
            realSubscription.unsubscribe(); // 要把connect()回传的subscription退订才会真正停止observable的执行
        }, 7000);
    }

    refCountHandler() {
        /**
         * refCount 必须搭配multicast 一起使用，他可以建立一个只要有订阅就会自动connect 的observable
         * 当source 一被observerA 订阅时(订阅数从0 变成1)，就会立即执行并发送元素，我们就不需要再额外执行connect
         */
        const source = interval(1000).pipe(
            tap(x => console.log('seed: ' + x)),
            multicast(() => new Subject()),
            refCount()
        );
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
        const subscriptionA = source.subscribe(observerA);
        let subscriptionB;
        setTimeout(() => {
            subscriptionB = source.subscribe(observerB);
        }, 1000);
        setTimeout(() => {
            subscriptionA.unsubscribe();
            subscriptionB.unsubscribe();
        }, 5000);
    }

    publishHandler() {
        /**
         * 其实multicast(() => new Subject())很常用到，我们有一个简化的写法那就是publish
         */
        const source = interval(1000).pipe(
            tap(x => console.log('seed: ' + x)),
            publish(), // 发布所有值
            // publishBehavior(0), // 发布最新的值, 0是初始值
            // publishReplay(1), // 重播最近的一个事件
            // publishLast(), // 发布最后的一个值
            refCount()
        );
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
        const subscriptionA = source.subscribe(observerA);
        let subscriptionB;
        setTimeout(() => {
            subscriptionB = source.subscribe(observerB);
        }, 1000);
        setTimeout(() => {
            subscriptionA.unsubscribe();
            subscriptionB.unsubscribe();
        }, 5000);
    }

    shareHandler() {
        /**
         * publish + refCount 可以在简写成share
         */
        const source = interval(1000).pipe(
            tap(x => console.log('seed: ' + x)),
            // publish(),
            // refCount()
            share()
        );
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
        const subscriptionA = source.subscribe(observerA);
        let subscriptionB;
        setTimeout(() => {
            subscriptionB = source.subscribe(observerB);
        }, 1000);
        setTimeout(() => {
            subscriptionA.unsubscribe();
            subscriptionB.unsubscribe();
        }, 5000);
    }
}
