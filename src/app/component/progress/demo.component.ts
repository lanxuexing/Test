import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress-demo',
    template: `
        <div class="container">
            <!-- 进度条 标准的进度条 -->
            <nz-progress [nzPercent]="30"></nz-progress>
            <nz-progress [nzPercent]="50" nzStatus="active"></nz-progress>
            <nz-progress [nzPercent]="70" nzStatus="exception"></nz-progress>
            <nz-progress [nzPercent]="100"></nz-progress>
            <nz-progress [nzPercent]="50" [nzShowInfo]="false"></nz-progress>
            <!-- 进度圈 圈形的进度 -->
            <p class="mdTop"></p>
            <nz-progress [nzPercent]="75" nzType="circle"></nz-progress>
            <nz-progress [nzPercent]="70" nzType="circle" nzStatus="exception"></nz-progress>
            <nz-progress [nzPercent]="100" nzType="circle"></nz-progress>
            <!-- 小型进度条 适合放在较狭窄的区域内 -->
            <p class="mdTop"></p>
            <nz-progress [nzPercent]="30" nzSize="small"></nz-progress>
            <nz-progress [nzPercent]="50" nzSize="small" nzStatus="active"></nz-progress>
            <nz-progress [nzPercent]="70" nzSize="small" nzStatus="exception"></nz-progress>
            <nz-progress [nzPercent]="100" nzSize="small"></nz-progress>
            <nz-progress [nzPercent]="50" nzSize="small" [nzShowInfo]="false"></nz-progress>
            <!-- 小型进度圈 小一号的圈形进度 -->
            <p class="mdTop"></p>
            <nz-progress [nzPercent]="75" nzType="circle" [nzWidth]="80"></nz-progress>
            <nz-progress [nzPercent]="70" nzType="circle" [nzWidth]="80" nzStatus="exception"></nz-progress>
            <nz-progress [nzPercent]="100" nzType="circle" [nzWidth]="80"></nz-progress>
            <!-- 进度圈动态展示 会动的进度条才是好进度条 -->
            <p class="mdTop"></p>
            <nz-progress [nzPercent]="percent" nzType="circle"></nz-progress>
            <button class="mgLeft" (click)="decline()">-</button>
            <button (click)="increase()">+</button>
            <!-- 动态展示 会动的进度条才是好进度条 -->
            <nz-progress [nzPercent]="percent"></nz-progress>
            <button class="mgLeft" (click)="decline()">-</button>
            <button (click)="increase()">+</button>
            <!-- 自定义文字格式 nzFormat 属性指定格式 -->
            <p class="mdTop"></p>
            <nz-progress [nzPercent]="75" nzType="circle" [nzFormat]="formatOne"></nz-progress>
            <nz-progress [nzPercent]="100" nzType="circle" [nzFormat]="formatTwo"></nz-progress>
            <!-- 仪表盘 通过设置 nzType="dashboard"，可以很方便地实现仪表盘样式的进度条 -->
            <p class="mdTop"></p>
            <nz-progress [nzPercent]="75" nzType="dashboard"></nz-progress>
            <!-- 分段进度条 标准的进度条 -->
            <p class="mdTop"></p>
            <nz-progress nz-tooltip [nzPercent]="60" [nzSuccessPercent]="30"></nz-progress>
            <!-- 圆角/方角边缘 通过设定 nzStrokeLinecap='square|round' 可以调整进度条边缘的形状 -->
            <p class="mdTop"></p>
            <nz-progress nzStrokeLinecap="square" [nzPercent]="75"></nz-progress>
            <nz-progress nzStrokeLinecap="square" nzType="circle" [nzPercent]="75"></nz-progress>
            <nz-progress nzStrokeLinecap="square" nzType="dashboard" [nzPercent]="75"></nz-progress>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
        .mgLeft {
            margin-left: 8px;
        }
        .mdTop {
            margin-left: 10px;
        }
    `]
})
export class ProgressDemoComponent implements OnInit {
    // 动态展示
    percent = 0;
    // 自定义文字格式 nzFormat 属性指定格式
    formatOne = (percent: number) => `${percent} Days`;
    formatTwo = () => `Done`;

    constructor() { }

    ngOnInit(): void { }

    increase(): void {
        this.percent = this.percent + 10;
        if (this.percent > 100) {
        this.percent = 100;
        }
    }

    decline(): void {
        this.percent = this.percent - 10;
        if (this.percent < 0) {
        this.percent = 0;
        }
    }
}
