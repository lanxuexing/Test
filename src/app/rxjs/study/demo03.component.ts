import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, interval, Subscription } from 'rxjs';
import { map, take, mapTo, filter } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo03',
    template: `
        <h3>Rxjs Demo03 To Study! -- Operators操作符</h3>
        <app-back></app-back>
    `,
    styles: [``]
})
export class RxjsDemo03Component implements OnInit, OnDestroy {
    originMapSubscription: Subscription;
    mapSubscription: Subscription;
    mapToSubscription: Subscription;
    filterSubscription: Subscription;

    constructor() { }

    ngOnInit(): void {
        // 1. 传统写法创建Map操作符
        const people = of('Jerry', 'Anna');
        const helloPlople = this.map(people, item => item + ' Hello~');
        this.originMapSubscription = helloPlople.subscribe({
            next: (value) => { console.log('======传统写法创建Map操作符: ', value); },
            error: (error) => { console.log('======传统写法创建Map操作符---Error: ', error); },
            complete: () => { console.log('======传统写法创建Map操作符: complete'); }
        });

        // 图谱
        // ----- 代表一个Observable
        // -----X 代表一个Observable有错误发生
        // -----| 代表一个Observable结束
        // (1234)| 代表一个同步Observable结束
        /**
         * 例如： interval(1000).pipe(map(x => x + 1));
         *       -----0-----1-----2-----3--...
         *              map(x => x + 1)
         *       -----1-----2-----3-----4--...
         */
        this.mapSubscription = interval(1000).pipe(
            map(x => x + 1),
            take(4)
        ).subscribe({
            next: (value) => { console.log('======map操作符: ', value); },
            error: (error) => { console.log('======map操作符---Error: ', error); },
            complete: () => { console.log('======map操作符: complete'); }
        });

        /**
         * 例如： interval(1000).pipe(mapTo(2))
         *      -----0-----1-----2-----3--...
         *              mapTo(2)
         *      -----2-----2-----2-----2--...
         */
        this.mapToSubscription = interval(1000).pipe(
            mapTo('mapTo'),
            take(3)
        ).subscribe({
            next: (value) => { console.log('======mapTo操作符: ', value); },
            error: (error) => { console.log('======mapTo操作符---Error: ', error); },
            complete: () => { console.log('======mapTo操作符: complete'); }
        });

        /**
         * 例如：interval(1000).pipe(filter(x => x % 2 === 0));
         *      -----0-----1-----2-----3-----4--...
         *           filter(x => x % 2 === 0)
         *      -----0-----------2-----------4--...
         */
        this.filterSubscription = interval(1000).pipe(
            filter(x => x % 2 === 0),
            take(5)
        ).subscribe({
            next: (value) => { console.log('======filter操作符: ', value); },
            error: (error) => { console.log('======filter操作符---Error: ', error); },
            complete: () => { console.log('======filter操作符: complete'); }
        });
    }

    map(source, callback) {
        return Observable.create(observer => {
            return source.subscribe(
                (value) => {
                    try {
                        observer.next(callback(value));
                    } catch (e) {
                        observer.error(e);
                    }
                },
                (err) => { observer.error(err); },
                () => { observer.complete(); }
            );
        });
    }

    ngOnDestroy() {
        this.originMapSubscription.unsubscribe();
        this.mapSubscription.unsubscribe();
        this.mapToSubscription.unsubscribe();
        this.filterSubscription.unsubscribe();
    }
}
