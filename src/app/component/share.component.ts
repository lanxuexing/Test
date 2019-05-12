import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-share',
    template: `
        <h2>Share Components</h2>
        <ul class="heroes">
            <li>
                <a routerLink="./from">
                    <span class="badge">01</span>Form
                </a>
            </li>
            <li>
                <a routerLink="./tooltip">
                    <span class="badge">02</span>Tooltip
                </a>
            </li>
            <li>
                <a routerLink="./multiselect-dropdown">
                    <span class="badge">03</span>Multiselect-Dropdown
                </a>
            </li>
            <li>
                <a routerLink="./progress">
                    <span class="badge">03</span>Progress
                </a>
            </li>
            <li>
                <a routerLink="./carousel">
                    <span class="badge">03</span>Carousel
                </a>
            </li>
        </ul>
    `,
    styleUrls: ['./share.scss']
})
export class ShareComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
