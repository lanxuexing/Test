import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription, interval, empty, fromEvent } from 'rxjs';
import { take, delay, delayWhen, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo09',
    template: `
        <h3>Rxjs Demo08 To Study! -- Operators操作符(delay, delayWhen)</h3>
        <button class="mgLeft" (click)="delayHandler()">delay</button>
        <button class="mgLeft" (click)="delayWhenHandler()">delayWhen</button>
        <button class="mgLeft" (click)="exampleHandler()">example实例</button>
        <div class="imageContainer">
            <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover6.jpg" alt="">
            <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover5.jpg" alt="">
            <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover4.jpg" alt="">
            <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover3.jpg" alt="">
            <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover2.jpg" alt="">
            <img src="https://res.cloudinary.com/dohtkyi84/image/upload/c_scale,w_50/v1483019072/head-cover1.jpg" alt="">
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
        .imageContainer {
            position: absolute;
            top: 140px;
            left: 340px;
        }
        img {
            position: absolute;
            border-radius: 50%;
            border: 3px white solid;
            transform: translate3d(0,0,0);
        }
    `]
})
export class RxjsDemo09Component implements OnInit, OnDestroy {
    mouseMove;
    domArray;
    delaySubscription: Subscription;
    delayWhenSubscription: Subscription;

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
        this.domArray = document.getElementsByTagName('img');
        this.mouseMove = fromEvent(document, 'mousemove').pipe(
            map((mouseEvent: MouseEvent) => {
                return {
                    x: mouseEvent.clientX,
                    y: mouseEvent.clientY
                };
            })
        );
    }

    delayHandler() {
        /**
         * 延迟observable 一开始发送元素的时间点
         * 例如： interval(300).pipe(1000)
         * source:       --0--1--2--3--4|
         *                  delay(500)
         * newest:       -------0--1--2--3--4|
         */
        const delayObservable = interval(300).pipe(
            take(5),
            delay(500)
        );
        this.delaySubscription = delayObservable.subscribe({
            next: (value) => { console.log('=====delay操作符: ', value); },
            error: (err) => { console.log('=====delay操作符: Error: ', err); },
            complete: () => { console.log('=====delay操作符: complete!'); }
        });
    }

    delayWhenHandler() {
        /**
         * 影响每个元素，而且需要传一个callback 并回传一个observable
         * delayWhen简单说就是等到callback回传的observable送出元素后，真正的observable才开始送出元素
         * 也就是说回传的observable送出几个元素其实跟延迟时间是无关的，重点是第n 个回传的observable送出第一个元素的时间
         * 例如：interval(300).pipe(take(5), delayWhen(x => empty().pipe(delay(100 * x * x)))
         * source :       --0--1--2--3--4|
         *             delayWhen(x => empty().pipe(delay(100 * x * x)))
         * newest:        --0---1----2-----3-----4|
         */
        const delayWhenObservable = interval(300).pipe(
            take(5),
            delayWhen(x => empty().pipe(
                delay(100 * x * x)
            ))
        );
        this.delayWhenSubscription = delayWhenObservable.subscribe({
            next: (value) => { console.log('=====delayWhen操作符: ', value); },
            error: (err) => { console.log('=====delayWhen操作符: Error: ', err); },
            complete: () => { console.log('=====delayWhen操作符: complete!'); }
        });
    }

    exampleHandler() {
        this.followMourse(Array.from(this.domArray));
    }

    followMourse(domArray: any[]) {
        const delayTime = 600;
        domArray.forEach((item, index) => {
            this.mouseMove.pipe(
                delay(delayTime * (Math.pow(0.65, index) + Math.cos(index / 4)) / 2)
            ).subscribe(pos => {
                this.renderer.setStyle(item, 'transform', `translate3d(${pos.x}px, ${pos.y}px, 0)`);
            });
        });
    }

    ngOnDestroy() {
        if (this.delaySubscription) {
            this.delaySubscription.unsubscribe();
        }
        if (this.delayWhenSubscription) {
            this.delayWhenSubscription.unsubscribe();
        }
    }
}
