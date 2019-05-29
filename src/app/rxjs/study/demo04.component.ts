import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription, interval, fromEvent, of } from 'rxjs';
import { take, first, takeUntil, map, concatAll } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo04',
    template: `
        <h3>Rxjs Demo04 To Study! -- Operators操作符(take, first, takeUntil, concatAll)</h3>
        <button class="mgLeft" (click)="takeHandler()">take</button>
        <button class="mgLeft" (click)="firstHandler()">first</button>
        <button class="mgLeft" (click)="takeUntilHandler()">takeUntil</button>
        <button class="mgLeft" (click)="concatAllHandler()">concatAll</button>
        <button class="mgLeft" id="game">click me end Game</button>
        <button class="mgLeft" id="egg">click egg</button>
        <div class="drag" id="drag">drag me</div>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
        .drag {
            width: 70px;
            height: 24px;
            font-size: 12px;
            text-align: center;
            background: #EEE;
            line-height: 24px;
            cursor: default;
            border-radius: 4px;
            position: absolute;
            left: 580px;
            top: 155px;
        }
    `]
})
export class RxjsDemo04Component implements OnInit, OnDestroy {
    takeSubscription: Subscription;
    firstSubscription: Subscription;
    takeUnitlSubscription: Subscription;
    concatAllSubscription: Subscription;
    dragSubscription: Subscription;

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束

        // 简易拖拉
        const mouseDown = fromEvent(document.getElementById('drag'), 'mousedown');
        const mouseMove = fromEvent(document.body, 'mousemove');
        const mouseUp = fromEvent(document.body, 'mouseup');
        const drag = mouseDown.pipe(
            map(_ => mouseMove.pipe(takeUntil(mouseUp))),
            concatAll(),
            map((event: MouseEvent) => ({x: event.clientX, y: event.clientY}))
        );
        this.dragSubscription = drag.subscribe({
            next: (value) => {
                console.log('=====drag: ', value);
                const dragDom = document.getElementById('drag');
                console.log('dragDom', dragDom);
                // this.renderer.setStyle(
                //     dragDom,
                //     'top',
                //     value.y
                // );
                // this.renderer.setStyle(
                //     dragDom,
                //     'left',
                //     value.x
                // );
                dragDom.style.left = value.x + 'px';
                dragDom.style.top = value.y + 'px';
            },
            error: (err) => { console.log('=====drag: Error: ', err); },
            complete: () => { console.log('=====drag: complete!'); }
        });
    }

    takeHandler() {
        /**
         * 例如：      interval(1000).pipe(take(4))
         * source:    -----0-----1-----2-----3-----4--..
         *                      take(4)
         * newest     -----0-----1-----2-----3|
         */
        const takeObservable = interval(1000).pipe(take(4));
        this.takeSubscription = takeObservable.subscribe({
            next: (value) => { console.log('=====table操作符: ', value); },
            error: (err) => { console.log('=====table操作符: Error: ', err); },
            complete: () => { console.log('=====table操作符: complete!'); }
        });
    }

    firstHandler() {
        /**
         * 例如：       interval(1000).pipe(first())
         * source:     -----0-----1-----2-----3--..
         *                      first()
         * newest:     -----0|
         */
        const firstObservable = interval(1000).pipe(first());
        this.firstSubscription = firstObservable.subscribe({
            next: (value) => { console.log('=====first操作符: ', value); },
            error: (err) => { console.log('=====first操作符: Error: ', err); },
            complete: () => { console.log('=====first操作符: complete!'); }
        });
    }

    takeUntilHandler() {
        /**
         * 例如：       interval(1000).pipe(takeUntil(click))
         * source:     -----0-----1-----2-----3--..
         * click:      --------------------c-----
         *                  takeUntil(click)
         * newest:     -----0-----1-----2--|
         */
        const clickObservable = fromEvent(document.getElementById('game'), 'click');
        const takeUnitlObservable = interval(1000).pipe(takeUntil(clickObservable));
        this.takeUnitlSubscription =  takeUnitlObservable.subscribe({
            next: (value) => { console.log('=====takeUntil操作符: ', value); },
            error: (err) => { console.log('=====takeUntil操作符: Error: ', err); },
            complete: () => { console.log('=====takeUntil操作符: complete!'); }
        });
    }

    concatAllHandler() {
        /**
         * 必须先等前一个observable完成(complete)，才会继续下一个
         * 例如：Observable里边还是Observable
         * click:       ------------c------------c-----...
         *                  map(e => of(1,2,3))
         * source:      ------------o------------o-----...
         *                           \            \
         *                            (1,2,3)|     (1,2,3)|
         *                  concatAll()
         * newest:      ------------(1,2,3)------(1,2,3)--..
         */
        const eventObservable = fromEvent(document.getElementById('egg'), 'click');
        const mapObservable = eventObservable.pipe(map(x => of(1, 2, 3)));
        const concatAllObservable = mapObservable.pipe(concatAll());
        this.concatAllSubscription = concatAllObservable.subscribe({
            next: (value) => { console.log('=====concatAll操作符: ', value); },
            error: (err) => { console.log('=====concatAll操作符: Error: ', err); },
            complete: () => { console.log('=====concatAll操作符: complete!'); }
        });
    }

    ngOnDestroy() {
        if (this.takeSubscription) {
            this.takeSubscription.unsubscribe();
        }
        if (this.firstSubscription) {
            this.firstSubscription.unsubscribe();
        }
        if (this.takeUnitlSubscription) {
            this.takeUnitlSubscription.unsubscribe();
        }
        if (this.concatAllSubscription) {
            this.concatAllSubscription.unsubscribe();
        }
        if (this.dragSubscription) {
            this.dragSubscription.unsubscribe();
        }
    }
}
