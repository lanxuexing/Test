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
            <a class="col-1-4" routerLink="./demo01">
                <div class="module hero">
                    <h4>Rxjs基础Demo01</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./demo02">
                <div class="module hero">
                    <h4>Rxjs基础Demo02</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./demo03">
                <div class="module hero">
                    <h4>Rxjs基础Demo03</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./demo04">
                <div class="module hero">
                    <h4>Rxjs基础Demo04</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./demo05">
                <div class="module hero">
                    <h4>Rxjs基础Demo05</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./demo06">
                <div class="module hero">
                    <h4>Rxjs基础Demo06</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./demo07">
                <div class="module hero">
                    <h4>Rxjs基础Demo07</h4>
                </div>
            </a>
            <a class="col-1-4" routerLink="./demo08">
                <div class="module hero">
                    <h4>Rxjs基础Demo08</h4>
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
