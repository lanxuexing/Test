import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-click-outsides-demo',
    template: `
        <div class="container">
            <div (click)="onClick($event)"
                (clickOutsides)="onClickedOutside($event)"
                [attachOutsideOnClick]="attachOutsideOnClick"
                [clickOutsidesEnabled]="enabled"
                [emitOnBlur]="true">
                <p>Clicked inside: {{countInside}}</p>
                <p>Clicked outside: {{countOutside}}</p>
                <label>
                    <input type="checkbox" [checked]="attachOutsideOnClick" (click)="_toggleAttachOutsideOnClick()" />
                    <span>Attach on click</span>
                </label>
                <label class="mgLeft">
                    <input type="checkbox" [checked]="enabled" (click)="_toggleEnabled()" />
                    <span>Enabled</span>
                </label>
            </div>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            border: 3px solid #06d68a;
            display: block;
            margin: 2em auto;
            max-width: 800px;
            user-select: none;
        }
        .container div {
            padding: 2em;
        }
        .mgLeft {
            margin-left: 20px;
        }
    `]
})
export class ClickOutsidesDemoComponent implements OnInit {
    public countInside = 0;
    public countOutside = 0;
    public attachOutsideOnClick = false;
    public enabled = true;

    constructor() { }

    ngOnInit(): void { }

    public _toggleAttachOutsideOnClick() {
        this.attachOutsideOnClick = !this.attachOutsideOnClick;
    }

    public _toggleEnabled() {
        this.enabled = !this.enabled;
    }

    public onClick(e: Event) {
        console.log('Clicked inside:', e);
        this.countInside++;
    }

    public onClickedOutside(e: Event) {
        console.log('Clicked outside:', e);
        this.countOutside++;
    }
}
