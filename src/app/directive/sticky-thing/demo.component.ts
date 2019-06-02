import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sticky-thing-demo',
    template: `
        <h3>An Angular directive for making things sticky when the user scrolls.</h3>
        <app-back></app-back>
    `,
    styles: [``]
})
export class StickyThingDemoComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
