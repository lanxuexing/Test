import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-share',
    template: `
        <h2>Share Components</h2>
        <div class="flex">
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
                        <span class="badge">04</span>Progress
                    </a>
                </li>
                <li>
                    <a routerLink="./carousel">
                        <span class="badge">05</span>Carousel
                    </a>
                </li>
                <li>
                    <a routerLink="./divider">
                        <span class="badge">06</span>Divider
                    </a>
                </li>
                <li>
                    <a routerLink="./back-top">
                        <span class="badge">07</span>Back-Top
                    </a>
                </li>
                <li>
                    <a routerLink="./card">
                        <span class="badge">08</span>Card
                    </a>
                </li>
                <li>
                    <a routerLink="./tabs">
                        <span class="badge">09</span>Tabs
                    </a>
                </li>
                <li>
                    <a routerLink="./statistic">
                        <span class="badge">10</span>Statistic
                    </a>
                </li>
                <li>
                    <a routerLink="./affix">
                        <span class="badge">11</span>Affix
                    </a>
                </li>
                <li>
                    <a routerLink="./pagination">
                        <span class="badge">12</span>Pagination
                    </a>
                </li>
                <li>
                    <a routerLink="./collapes">
                        <span class="badge">13</span>Collapes
                    </a>
                </li>
                <li>
                    <a routerLink="./image-zoom">
                        <span class="badge">14</span>Image-Zoom
                    </a>
                </li>
                <li>
                    <a routerLink="./modal">
                        <span class="badge">15</span>Modal
                    </a>
                </li>
            </ul>
        </div>
    `,
    styleUrls: ['./share.scss']
})
export class ShareComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
