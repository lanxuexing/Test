import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rxjs-demo',
    template: `
        <h3>Rxjs Demo To Study!</h3>
        <app-rxjs-demo01></app-rxjs-demo01>
        <app-back></app-back>
    `,
    styles: [``]
})
export class RxjsDemoComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
