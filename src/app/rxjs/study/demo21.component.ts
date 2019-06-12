import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rxjs-demo21',
    template: `
        <h3>Rxjs Demo21 To Study! -- 自定义Observable</h3>
        <button (click)="observableOneHandler()">实例一Observer</button>
        <button class="mgLeft" (click)="observableTwoHandler()">实例二Observable</button>
        <button class="mgLeft" (click)="exampleHandler()">例子</button>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class RxjsDemo21Component implements OnInit {
    constructor() { }

    ngOnInit(): void {
        /**
         * 三步骤：
         * 1、订阅就是执行一个funciton
         * 2、订阅接收的物件具备next, error, complete 三个方法
         * 3、订阅会返回一个可退订(unsubscribe)的物件
         */
    }

    observableOneHandler() {
        const observable = this.create((observer) => {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
            observer.next('still work');
        });
        const myObserver = {
            next: (value) => {
                console.log(value);
            },
            complete: () => {
                console.log('it is complete');
            }
        };
        observable.subscribe(myObserver);
    }

    create(subscriber) {
        // 第一种写法
        // const observable = {
        //     subscribe: (observer) => {
        //         subscriber(observer);
        //     }
        //     return observable;
        // };

        // 第二种写法
        const observable = {
            subscribe: (observerOrNext?, error?, complete?) => {
                const realObserver = new Observer(observerOrNext, error, complete);
                subscriber(realObserver);
                return realObserver;
            }
        };
        return observable;
    }

    observableTwoHandler() {
        // 第一种写法
        const observable = new Observable((observer) => {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
            observer.next('still work');
        });
        // 第二种写法
        // const observable = Observable.create((observer) => {
        //     observer.next(1);
        //     observer.next(2);
        //     observer.next(3);
        //     observer.complete();
        //     observer.next('still work');
        // });
        const myObserver = {
            next: (value) => {
                console.log(value);
            },
            complete: () => {
                console.log('it is complete');
            }
        };
        observable.subscribe(myObserver);
    }

    exampleHandler() {
        const observable = Observable.fromArray([1, 2, 3, 4, 5]).map(x => x + 3).map(x => x + 1);
        observable.subscribe({
            next: (value) => { console.log('自定义Observable: ', value); },
            error: (err) => { console.log('自定义Observable -- 错误信息: ', err); },
            complete: () => { console.log('自定义Observable -- complete!'); }
        });
    }

}


/**
 * 自定义Observer类，解决两个问题：
 * 1、observable 在结束(complete)不应该再发送新元素
 * 2、当observer实例没有complete方法时，就会报错
 */
class Observer {
    // 预设一个空的observer
    emptyObserver = {
        next: () => {},
        error: (err) => { throw err; },
        complete: () => {}
    };
    destination: { next: any; error: any; complete: any; };
    isStopped: boolean;

    constructor(destinationOrNext?, error?, complete?) {
        switch (arguments.length) {
            case 0:
                // 此时是空的Observer
                this.destination = this.safeObserver(this.emptyObserver);
                break;
            case 1:
                if (!destinationOrNext) {
                    // 此时是空的Observer
                    this.destination = this.safeObserver(this.emptyObserver);
                    break;
                }
                // 这里是建立了operator操作符之后优化的判断，多一个判断，是否传入了destinationOrNext，原来就是observer的实例，如果是就不用再执行this.safeObserver了
                if (destinationOrNext instanceof Observer) {
                    this.destination = destinationOrNext as any;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    // 传入了observer
                    this.destination = this.safeObserver(destinationOrNext);
                    console.log('===', this.destination);
                    break;
                }
                break;
            default:
                // 以上都不符合，说明应该是传入了一到三个function
                this.destination = this.safeObserver(destinationOrNext, error, complete);
                break;
        }
    }

    safeObserver(observerOrNext?, error?, complete?) {
        let next;
        if (typeof (observerOrNext) === 'function') {
            // observerOrNext是next function
            next = observerOrNext;
        } else if (observerOrNext) {
            // observerOrNext是observer
            next = observerOrNext.next || (() => {});
            error = observerOrNext.error || ((err) => { throw err; });
            complete = observerOrNext.complete || (() => {});
        }
        // 回传处理之后的observer实例
        return {
            next,
            error,
            complete
        };
    }

    next(value) {
        if (!this.isStopped && this.next) {
            // 先判断是否停止
            try {
                this.destination.next(value); // 传送新值
            } catch (error) {
                this.unsubscribe();
                throw error;
            }
        }
    }

    error(err) {
        if (!this.isStopped && this.error) {
            // 先判断是否停止
            try {
                this.destination.error(err); // 传送错误信息
            } catch (error) {
                this.unsubscribe();
                throw error;
            }
            this.unsubscribe();
        }
    }

    complete() {
        if (!this.isStopped && this.complete) {
            // 先判断是否停止
            try {
                this.destination.complete(); // 发送停止传送新值信号
            } catch (error) {
                this.unsubscribe();
                throw error;
            }
            this.unsubscribe(); // 停止传送新值, 取消订阅
        }
    }

    unsubscribe() {
        this.isStopped = true;
    }

}


class MapObserver extends Observer {
    callback: any;

    // 这里会传入原来的observer和map的callback
    constructor(observer, callback) {
        // 因为有继承，所以这里要线执行一次父类的构造函数
        super(observer);
        this.callback = callback;
        // 绑定next的this
        this.next = this.next.bind(this);
    }

    next(value) {
        try {
            // this.destination是父类observer保存的observer实例，这里的this.callback(value)就是执行map的操作
            this.destination.next(this.callback(value));
        } catch (error) {
            this.destination.error(error);
            return;
        }
    }
}


class Observable {
    static create: (subscribe: any) => Observable;
    static fromArray: (array: any) => Observable;
    private operator: { call: (observer: any, source: any) => void; };
    private innerSubscribe: any;
    private source: this;

    constructor(subscribe?) {
        if (subscribe) {
            // 把subscribe存到属性里
            this.innerSubscribe = subscribe;
        }
        /**
         * 1、operators(transform, filter, conditional...) 都是回传一个新个observable
         * 2、大部分的operator 其实就是在原本observer 外包裹一层物件，让执行next 方法前先把元素做一次处理
         * 3、operator 回传的observable 订阅时，还是需要执行原本的observable(资料源)，也就说我们要想办法保留原本的observable
         */
    }

    subscribe(...args: any) {
        // 简单的写法
        // const observer = new Observer(...args);
        // this.innerSubscribe(observer);
        // return observer;

        // 优化方案一
        const observer = new Observer(...[].slice.call(arguments));
        if (this.operator) {
            // 先用this.operator判断当前的observable是否具有operator
            this.operator.call(observer, this.source);
        } else {
            // 如果没有operator再直接把observer丢给innerSubscribe
            this.innerSubscribe(observer);
        }
        return observer;
    }

    map(callback) {
        /**
         * 前置步骤：
         * 1、建立新的observable
         * 2、保存原本的observable(资料源)，之后订阅时才有办法执行
         * 3、建立并保存operator 本身的行为，等到订阅时执行
         */

        // 建立新的observable
        const observable = new Observable();
        // 保存当前的observable
        observable.source = this;
        // 存储当前的operator行为，并作为是否具有operator的依据
        observable.operator = {
            call: (observer, source) => {
                // 执行这个operator
                const newObserver = new MapObserver(observer, callback);
                // 建立包裹之后的observer，订阅原本的资料源，并回调
                return source.subscribe(newObserver);
            }
        };
        return observable;
    }

}

// 提供静态方法创建Observable
Observable.create = (subscribe) => {
    return new Observable(subscribe);
};

Observable.fromArray = (array) => {
    if (!Array.isArray(array)) {
        // 如果传入的参数不是阵列（数组）,则抛出错误
        throw new Error('params need to be array');
    }
    return new Observable((observer) => {
        try {
            // 遍历阵列(数组)的每个元素并送出
            array.forEach(value => observer.next(value));
            observer.complete();
        } catch (error) {
            observer.error(error);
        }
    });
};
