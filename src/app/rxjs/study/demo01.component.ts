import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo01',
    template: ``,
    styles: [``]
})
export class RxjsDemo01Component implements OnInit {
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
    }
}
