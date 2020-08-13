import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-autosize-demo',
    template: `
        <div class="container">
            <textarea rows="3" autosize [(ngModel)]="text">Some text</textarea>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin: 20px 0;
        }
        textarea {
            display: block;
            font-family: inherit;
            resize: vertical;
            padding: 5px 15px;
            line-height: 1.5;
            box-sizing: border-box;
            width: 100%;
            font-size: 14px;
            color: #5a5e66;
            background-color: #fff;
            border: 1px solid #d8dce5;
            border-radius: 4px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        }
        textarea:focus {
            outline: 0;
            border-color: #409EFF;
        }
    `]
})
export class AutoSizeDemoComponent implements OnInit {
    text: string;
    constructor() { }

    ngOnInit(): void { }
}
