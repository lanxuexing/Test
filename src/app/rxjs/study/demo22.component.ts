import { Component, OnInit } from '@angular/core';
import { Observable, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo22',
    template: `
        <h3>Rxjs Demo22 To Study! -- Scheduler基本概念</h3>
        <button (click)="asyncObservableHandler()">异步Observable</button>
        <button class="mgLeft" (click)="observableTwoHandler()">实例二Observable</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo22Component implements OnInit {
    constructor() { }

    ngOnInit(): void {
        /**
         * Observable 有一个优势是可以同时处理同步和非同步行为，但这个优势也带来了一个问题，就是我们常常会搞不清处现在的observable 执行方式是同步的还是非同步的
         * 而Scheduler就是用来解决这个问题的
         *
         * Scheduler 控制一个observable 的订阅什么时候开始，以及发送元素什么时候送达，简言之Scheduler 会影响Observable 开始执行及元素送达的时机
         * 1、Scheduler 是一个资料结构。它知道如何根据优先级或其他标准来储存并伫列任务。
         * 2、Scheduler 是一个执行环境。它意味着任务何时何地被执行，比如像是立即执行、在回呼(callback)中执行、setTimeout 中执行、animation frame 中执行
         * 3、Scheduler是一个虚拟时钟。它透过now()这个方法提供了时间的概念，我们可以让任务在特定的时间点被执行。
         *
         * 不同的operator会预设不同的scheduler，大多数creation operators最后一个参数都能接收Scheduler
         * 只要是observable就可以用这个observeOn()方法来使用Scheduler
         *
         * 1、queue 很适合用在会有递回的operator 且具有大量资料时使用，在这个情况下queue 能避免不必要的效能损耗。
         * 2、asap 的行为很好理解，它是非同步的执行，在浏览器其实就是setTimeout 设为0 秒(在NodeJS 中是用process.nextTick)，
         * asap 因为都是在setTimeout 中执行，所以不会有block event loop 的问题，很适合用在永远不会退订的observable
         * 3、使用setInterval 来运作，通常是跟时间相关的operator 才会用到。
         * 4、利用Window.requestAnimationFrame这个API去实作的，所以执行周期就跟Window.requestAnimationFrame一模一样。
         * 在做复杂运算，且高频率触发的UI 动画时，就很适合使用animationFrame，以可以搭配throttle operator 使用。
         */
    }

    asyncObservableHandler() {
        const source = Observable.create((observer) => {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
        });
        source.pipe(
            observeOn(asyncScheduler)
        ).subscribe({
            next: (value) => { console.log('=====asyncObservable: ', value); },
            error: (err) => { console.log('=====asyncObservable: Error: ', err); },
            complete: () => { console.log('=====asyncObservable: complete!'); }
        });
    }
}
