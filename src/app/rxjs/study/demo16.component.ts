import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, interval, Subscription } from 'rxjs';
import { count, groupBy, map, mergeAll, reduce, switchAll, take, window, windowToggle, zip } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo16',
    template: `
        <h3>Rxjs Demo16 To Study! -- Operators操作符(window, windowToggle, groupBy)</h3>
        <button (click)="windowHandler()">window</button>
        <button class="mgLeft" (click)="exampleHandler()">统计Example</button>
        <button class="mgLeft" (click)="windowToggleHandler()">windowToggle</button>
        <button class="mgLeft" (click)="groupByHandler()">groupBy</button>
        <button class="mgLeft" (click)="calcTotalHandler()">算总分</button>
        <button class="mgLeft" id="btn">Button-Click</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo16Component implements OnInit, OnDestroy {
    windowSubscription: Subscription;
    exampleSubscription: Subscription;
    windowToggleSubscription: Subscription;
    groupBySubscription: Subscription;
    calcTotalSubscription: Subscription;

    constructor() {}

    ngOnInit(): void {
        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
    }

    windowHandler() {
        /**
         * window把一段时间内送出的元素拆出来放到新的observable变成Observable<T> => Observable<Observable<T>>，这里可以和buffer类比
         * 即：buffer 是把拆分出来的元素放到阵列并送出阵列；window 是把拆分出来的元素放到observable 并送出observable
         * 例如：interval(1000).pipe(window(fromEvent(document.body, 'click)))
         * click:               --------------c-------------c-----------------c----
         * source:              -----0-----1-----2-----3-----4-----5-----6------7--
         *                                      window(click)
         * example:             o-------------o-------------o-----------------o----
         *                       \             \             \
         *                        -----0-----1|--2-----3----|-4-----5-----6---|
         * newest:              -------0-----1----2-----3-----4-----5-----6---|
         */
        const source = interval(1000).pipe(
            window(
                fromEvent(document.querySelector('#btn'), 'click')
            ),
            switchAll(),
            take(20)
        );
        this.windowSubscription = source.subscribe({
            next: (value) => { console.log('=====window操作符: ', value); },
            error: (err) => { console.log('=====window操作符: Error: ', err); },
            complete: () => { console.log('=====window操作符: complete!'); }
        });
    }

    exampleHandler() {
        /**
         * 统计1s内点击了几次
         * source:              ---------0---------1---------2--...
         * click:               --cc---cc----c-c----------------...
         *                                  window(source)
         * example:             o--------o---------o---------o--..
         *                       \        \         \         \
         *                        -cc---cc|---c-c---|---------|--..
         *                                  count()
         * newest:              o--------o---------o---------o--
         *                       \        \         \         \
         *                        -------4|--------2|--------0|--..
         *                                  switch()
         * success:               ---------4---------2---------0--...
         */
        const source = fromEvent(document.getElementById('btn'), 'click').pipe(
            window(interval(1000)),
            map(innerObservable => innerObservable.pipe(
                count()
            )),
            switchAll(),
            take(30)
        );
        this.exampleSubscription = source.subscribe({
            next: (value) => { console.log('=====统计: ', value); },
            error: (err) => { console.log('=====统计: Error: ', err); },
            complete: () => { console.log('=====统计: complete!'); }
        });
    }

    windowToggleHandler() {
        /**
         * windowToggle 不像window 只能控制内部observable 的结束，windowToggle 可以传入两个参数
         * 第一个是开始的observable，第二个是一个callback 可以回传一个结束的observable
         * 例如：interval(1000).pipe(windowToggle(fromEvent(document.body, 'mousedown'), () => fromEvent(document.body, 'mouseup')))
         * source:              ----0----1----2----3----4----5--...
         * mouseDown:           -------D------------------------...
         * mouseUp:             ---------------------------U----...
         *                     windowToggle(mouseDown, () => mouseUp)
         * newest:              -------o-------------------------...
         *                              \
         *                               -1----2----3----4--|
         *                              switch()
         * example:             ---------1----2----3----4---------...
         */
        const source = interval(1000).pipe(
            windowToggle(
                fromEvent(document.getElementById('btn'), 'mousedown'),
                () => fromEvent(document.getElementById('btn'), 'mouseup')
            ),
            switchAll()
        );
        this.windowToggleSubscription = source.subscribe({
            next: (value) => { console.log('=====windowToggle操作符: ', value); },
            error: (err) => { console.log('=====windowToggle操作符: Error: ', err); },
            complete: () => { console.log('=====windowToggle操作符: complete!'); }
        });
    }

    groupByHandler() {
        /**
         * groupBy可以帮我们把相同条件的元素拆分成一个Observable，其实就跟平常在下SQL 是一样个概念
         * 例如：interval(300).pipe(take(5), groupBy(x => x % 2))
         * source：             ---0---1---2---3---4|
         *                       groupBy(x => x % 2)
         * example:             ---o---o------------|
         *                          \   \
         *                           \   1-------3----|
         *                            0-------2-------4|
         */
        const source = interval(300).pipe(
            take(5),
            groupBy(x => x % 2),
        );
        this.groupBySubscription = source.subscribe({
            next: (value) => { console.log('=====groupBy操作符: ', value); },
            error: (err) => { console.log('=====groupBy操作符: Error: ', err); },
            complete: () => { console.log('=====groupBy操作符: complete!'); }
        });
    }

    calcTotalHandler() {
        /**
         * 计算每个学生的成绩总分
         * source:              --o--o--o--o--o--o|
         *                 groupBy(person => person.name)
         *                      --i--------i------|
         *                         \        \
         *                          \         o--o--o|
         *                           o--o--o--|
         *                 map(group => group.reduce(...))
         *                      --i---------i------|
         *                         \         \
         *                          o|        o|
         *                           mergeAll()
         * example:             --o---------o------|
         */
        const people = [
            {name: 'Anna', score: 100, subject: 'English'},
            {name: 'Anna', score: 90, subject: 'Math'},
            {name: 'Anna', score: 96, subject: 'Chinese' },
            {name: 'Jerry', score: 80, subject: 'English'},
            {name: 'Jerry', score: 100, subject: 'Math'},
            {name: 'Jerry', score: 90, subject: 'Chinese' },
        ];
        const source = from(people).pipe(
            zip(interval(300), (x, y) => x),
            groupBy(inner => inner.name),
            map(item => item.pipe(
                reduce((acc, curr) => ({
                    name: curr.name,
                    score: acc.score + curr.score
                }))
            )),
            mergeAll()
        );
        source.subscribe({
            next: (value) => { console.log('=====统计分数: ', value); },
            error: (err) => { console.log('=====统计分数: Error: ', err); },
            complete: () => { console.log('=====统计分数: complete!'); }
        });
    }

    ngOnDestroy() {
        if (this.windowSubscription) {
            this.windowSubscription.unsubscribe();
        }
        if (this.exampleSubscription) {
            this.exampleSubscription.unsubscribe();
        }
        if (this.windowToggleSubscription) {
            this.windowToggleSubscription.unsubscribe();
        }
        if (this.groupBySubscription) {
            this.groupBySubscription.unsubscribe();
        }
        if (this.calcTotalSubscription) {
            this.calcTotalSubscription.unsubscribe();
        }
    }
}
