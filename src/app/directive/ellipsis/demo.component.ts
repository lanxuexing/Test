import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ellipsis-demo',
    template: `
        <div>
            <h1>Welcome to ellipsis-demo!</h1>
            <h2>宽度固定(拖动右下角可调整大小):</h2>
            <div class="samples fixed">
            <div class="sample" ellipsis>{{longText}}</div>
            <div class="sample" ellipsis [ellipsis-content]="longText"></div>
            <div class="sample small" ellipsis [ellipsis-content]="number"></div>
            </div>
            <h2>百分比宽度(水平调整窗口大小或垂直调整框的大小，以查看...的变化):</h2>
            <div class="samples flex">
            <div class="sample" ellipsis>{{longText}}</div>
            <div class="sample" ellipsis [ellipsis-content]="longText"></div>
            <div class="sample small" ellipsis [ellipsis-content]="number"></div>
            </div>
            <app-back></app-back>
        </div>
    `,
    styles: [`
        .samples {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        .sample {
            width: 200px;
            height: 200px;
            border: dashed 2px gray;
            margin: 30px;
            overflow: hidden;
        }
        .sample:hover {
            resize: both;
        }
        .small {
            width: 100px;
            height: 20px;
        }
        .samples.flex .sample, .samples.flex .small {
            flex: 1;
            width: inherit;
            height: 100px;
        }
        .samples.flex .sample:hover, .samples.flex .small:hover {
            resize: vertical;
        }
    `]
})
export class EllipsisDemoComponent implements OnInit {
    title = 'ngx-ellipsis-demo';
    longText = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna \
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea\
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy \
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo \
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
    number = 12.4564564564564564;

    constructor() { }

    ngOnInit(): void { }
}
