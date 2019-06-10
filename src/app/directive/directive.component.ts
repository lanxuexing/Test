import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-directive',
    template: `
        <h3>Directive Use Case</h3>
        <div class="grid grid-pad">
            <a class="col-1-4" routerLink="./sticky-thing">
                <div class="module hero">
                    <h4>Sticky-Thing</h4>
                    <div class="circle"></div>
                </div>
            </a>
            <a class="col-1-4" routerLink="./ellipsis">
                <div class="module hero">
                    <h4>Ellipsis</h4>
                    <div class="circle"></div>
                </div>
            </a>
        </div>
    `,
    styleUrls: ['./directive.scss']
})
export class DirectiveComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
