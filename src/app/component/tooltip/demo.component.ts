import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tooltip-demo',
    template: `
        <div class="container">
            <app-tooltip placement="top-start">
                <button>上左</button>
                <ng-template #tip>
                    <span>placement is top-start</span>
                </ng-template>
            </app-tooltip>

            <app-tooltip placement="top-start" effect="light">
                <button>Light</button>
                <ng-template #tip>
                    <span>placement is top-start</span>
                </ng-template>
            </app-tooltip>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 100px;
        }
        app-tooltip button {
            padding: 4px 20px;
            line-height: 24px;
            margin: 8px 15px 0;
            border-radius: 20px;
            font-size: 15px;
            color: #fff;
            background-color: #ea6f5a;
        }
    `]
})
export class TooltipDemoComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
