import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tooltip-window-demo',
    template: `
        <div class="container">
            <p [appTooltipWindow]="'哈哈哈哈哈哈哈哈'" class="title">俄罗斯示威：坐在警察防线前的俄版“天安门少女”奥尔加·米希克</p>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin: 20px 0;
        }
        .title {
            width: 200px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    `]
})
export class TooltipWindowDemoComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
