import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cdk',
    template: `
        <h3>Cdk Use Case</h3>
        <div class="grid grid-pad">
            <a class="col-1-4" routerLink="./accessibility">
                <div class="module hero">
                    <h4>Accessibility</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./overlay">
                <div class="module hero">
                    <h4>Overlay</h4>
                </div>
            </a>
        </div>
    `,
    styleUrls: ['./cdk.scss']
})
export class CdkComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
