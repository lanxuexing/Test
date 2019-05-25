import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo01',
    template: `
        <button (click)="emitMessage()">Observable Click</button>
    `,
    styles: [``]
})
export class RxjsDemo01Component implements OnInit {
    listerers: any[];
    producer: any;
    constructor() { }

    ngOnInit(): void {
        // 原生JS一次点击
        const hander = (e) => {
            console.log('原生js点击事件', e);
            document.body.removeEventListener('click', hander);
        };
        document.body.addEventListener('click', hander);

        // Rxjs一次点击
        fromEvent(document.body, 'click').pipe(
            take(1)
        ).subscribe(e => console.log('Rxjs点击事件', e));

        console.log('====================自己实现的ES6版本的Observable===================');
        this.producer = new Producer();
        this.producer.addEventListener(this.listener1);
        this.producer.addEventListener(this.listener2);
        this.producer.notify('hello Observable');

        // Iterator
        console.log('====================Iterator===================');
        const arr = [1, 2, 3];
        const iterator = arr[Symbol.iterator]();
        console.log(iterator.next());
        console.log(iterator.next());
        console.log(iterator.next());
        console.log(iterator.next());

        // 自己实现的ES6版本的Iterator
        console.log('==================自己实现的ES6版本的Iterator====================');
        const newIterator = new IteratorFormArray([4, 5, 6]);
        console.log(newIterator.next());
        console.log(newIterator.next());
        console.log(newIterator.next());
        console.log(newIterator.next());

        console.log('====================自己实现的原生JS版本的Observable===================');
        const producerFormOrigin = new ProducerFormOrigin();
        producerFormOrigin.addEventListener(this.listener1);
        producerFormOrigin.addEventListener(this.listener2);
        producerFormOrigin.notify('hello Observable Form origin');

        // 自己实现的ES6版本的Iterator
        console.log('==================自己实现的原生JS版本的Iterator====================');
        const iteratorFormOrigin = new IteratrorFormArrayFormOrigin([7, 8, 9]);
        console.log(iteratorFormOrigin.next());
        console.log(iteratorFormOrigin.next());
        console.log(iteratorFormOrigin.next());
        console.log(iteratorFormOrigin.next());

        // Generator版本的Iterator
        console.log('===========================Generator版本的Iterator============================');
        const generatorIterator = getNumber('30天精通 RxJs (05)');
        console.log(generatorIterator.next());
        console.log(generatorIterator.next());
        console.log(generatorIterator.next());
        console.log(generatorIterator.next());
        console.log(generatorIterator.next());
    }

    listener1(message) {
        console.log(message + 'form listener1');
    }

    listener2(message) {
        console.log(message + 'form listener2');
    }

    emitMessage() {
        this.producer.notify('new hello Observable');
    }

}

// 原生JS版本Observable
function ProducerFormOrigin() {
    if (!(this instanceof ProducerFormOrigin)) {
        throw new Error('请使用 new Producer()');
    }
    this.listeners = [];
}

ProducerFormOrigin.prototype.addEventListener = function(listener) {
    if (typeof listener === 'function') {
        this.listeners.push(listener);
    }
};

ProducerFormOrigin.prototype.removeEventListener = function(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
};

ProducerFormOrigin.prototype.notify = function(message) {
    this.listeners.forEach(listener => {
        listener(message);
    });
};

// ES6写法一个Observable
class Producer {
    listener: any[] = [];
    constructor() {
        this.listener = [];
    }

    addEventListener(listener) {
        this.listener.push(listener);
    }

    removeEventListener(listener) {
        this.listener.splice(this.listener.indexOf(listener), 1);
    }

    notify(message) {
        this.listener.forEach(listener => {
            listener(message);
        });
    }
}


// 原生写法一个Iterator
function IteratrorFormArrayFormOrigin(arr) {
    if (!(this instanceof IteratrorFormArrayFormOrigin)) {
        throw new Error('请使用 new IteratrorFormArray');
    }

    this._array = arr;
    this._cursor = 0;
}

IteratrorFormArrayFormOrigin.prototype.next = function() {
    return this._cursor < this._array.length ? { value: this._array[this._cursor++], done: false } : { value: undefined, done: true };
};

// ES6写法一个Iterator
class IteratorFormArray {
    array: any[] = [];
    cursor: number;

    constructor(arr) {
        this.array = arr;
        this.cursor = 0;
    }

    next() {
        return this.cursor < this.array.length ? { value: this.array[this.cursor++], done: false } : { value: undefined, done: true };
    }
}

// Generator版本的Iterator
function* getNumber(words) {
    for (const word of words) {
        if (/^[0-9]+$/.test(word)) {
            yield parseInt(word, 10);
        }
    }
}
