import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-statistic-demo',
    template: `
        <div class="container">
            <!-- 基本用法 简单的展示 -->
            <div class="space-evenly">
                <nz-statistic [nzValue]="1949101 | number" [nzTitle]="'Active Users'"></nz-statistic>
                <nz-statistic [nzValue]="2019.111 | number: '1.0-2'" [nzTitle]="'Account Balance (CNY)'"></nz-statistic>
            </div>
            <!-- 单位 通过前缀和后缀添加单位 -->
            <p class="mgTop"></p>
            <div class="space-around">
                <nz-statistic [nzValue]="1128 | number" [nzTitle]="'Feedback'" [nzPrefix]="prefixTpl"></nz-statistic>
                <ng-template #prefixTpl>👍</ng-template>
                <nz-statistic [nzValue]="93" [nzTitle]="'Unmerged'" [nzSuffix]="'/ 100'"></nz-statistic>
            </div>
            <!-- 在卡片中使用 在卡片中展示统计数值 -->
            <p class="mgTop"></p>
            <div style="background: #ECECEC; padding: 30px;">
                <div class="space-around">
                    <nz-statistic
                        [nzValue]="11.28 | number: '1.0-2'"
                        [nzTitle]="'Active'"
                        [nzPrefix]="prefixTplOne"
                        [nzSuffix]="'%'"
                        [nzValueStyle]="{ color: '#3F8600' }"
                    >
                    </nz-statistic>
                    <ng-template #prefixTplOne>👆</ng-template>
                    <nz-statistic
                        [nzValue]="9.3 | number: '1.0-2'"
                        [nzTitle]="'Idle'"
                        [nzPrefix]="prefixTplTwo"
                        [nzSuffix]="'%'"
                        [nzValueStyle]="{ color: '#CF1322' }"
                    >
                    </nz-statistic>
                    <ng-template #prefixTplTwo>👇</ng-template>
                </div>
            </div>
            <!-- 倒计时 倒计时组件 -->
            <p class="mgTop"></p>
            <div class="space-around">
                <nz-countdown [nzValue]="deadline" [nzTitle]="'Countdown'"></nz-countdown>
                <nz-countdown [nzValue]="deadline" [nzTitle]="'Million Seconds'" [nzFormat]="'HH:mm:ss:SSS'"></nz-countdown>
                <nz-countdown [nzValue]="deadline" [nzTitle]="'Day Level'" [nzFormat]="'D 天 H 时 m 分 s 秒'"></nz-countdown>
            </div>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
        .space-evenly {
            display: flex;
            justify-content: space-evenly;
        }
        .space-around {
            display: flex;
            justify-content: space-evenly;
        }
        .mgTop {
            margin-top: 10px;
        }
    `]
})
export class StatisticDemoComponent implements OnInit {
    deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

    constructor() { }

    ngOnInit(): void {}
}
