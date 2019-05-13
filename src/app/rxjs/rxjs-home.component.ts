import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rxjs-home',
    template: `
        <h3>Rxjs Use Case</h3>
        <div class="grid grid-pad">
            <a class="col-1-4" routerLink="./share-replay">
                <div class="module hero">
                    <h4>ShareReplay</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./study">
                <div class="module hero">
                    <h4>RxjsDemo</h4>
                </div>
            </a>
        </div>
    `,
    styleUrls: ['./rxjs.scss']
})
export class RxjsHomeComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
