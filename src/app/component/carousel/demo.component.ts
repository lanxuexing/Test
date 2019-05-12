import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-carousel-demo',
    template: `
        <div class="container">
            <!-- 基本 最简单的用法 -->
            <nz-carousel [nzEffect]="effect">
                <div nz-carousel-content *ngFor="let index of array"><h3>{{index}}</h3></div>
            </nz-carousel>
            <!-- 垂直 垂直显示 -->
            <p class="mdTop"></p>
            <nz-carousel nzVertical>
                <div nz-carousel-content *ngFor="let index of array"><h3>{{index}}</h3></div>
            </nz-carousel>
            <!-- 渐显 切换效果为渐显 -->
            <p class="mdTop"></p>
            <nz-carousel [nzEffect]="'fade'">
                <div nz-carousel-content *ngFor="let index of array"><h3>{{index}}</h3></div>
            </nz-carousel>
            <!-- 自动切换 定时切换下一张 -->
            <p class="mdTop"></p>
            <nz-carousel nzAutoPlay>
                <div nz-carousel-content *ngFor="let index of array"><h3>{{index}}</h3></div>
            </nz-carousel>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
        .mdTop {
            margin-left: 10px;
        }
        [nz-carousel-content] {
            text-align: center;
            height: 160px;
            line-height: 160px;
            background: #364d79;
            color: #fff;
            overflow: hidden;
        }
        h3 {
            color: #fff;
        }
    `]
})
export class CarouselDemoComponent implements OnInit {
    array = [ 1, 2, 3, 4 ];
    effect = 'scrollx';

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => {
            this.effect = 'fade';
        }, 3000);
    }
}
