import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabs-demo',
    template: `
        <div class="container">
            <!-- 基本 默认选中第一项 -->
            <nz-tabset>
                <nz-tab nzTitle="Tab 1">
                Content of Tab Pane 1
                </nz-tab>
                <nz-tab nzTitle="Tab 2">
                Content of Tab Pane 2
                </nz-tab>
                <nz-tab nzTitle="Tab 3">
                Content of Tab Pane 3
                </nz-tab>
            </nz-tabset>
            <!-- 禁用 禁用某一项 -->
            <p class="mgTop"></p>
            <nz-tabset>
                <nz-tab *ngFor="let tab of tabs" [nzTitle]="tab.name" [nzDisabled]="tab.disabled">
                    {{ tab.name }}
                </nz-tab>
            </nz-tabset>
            <!-- 图标 有图标的标签 -->
            <p class="mgTop"></p>
            <nz-tabset>
                <nz-tab *ngFor="let tab of tabs2" [nzTitle]="titleTemplate">
                    <ng-template #titleTemplate>
                        <ng-container *ngIf="tab.icon === 'apple'">🍎{{ tab.name }}</ng-container>
                        <ng-container *ngIf="tab.icon === 'android'">🍐{{ tab.name }}</ng-container>
                    </ng-template>
                    {{ tab.name }}
                </nz-tab>
            </nz-tabset>
            <!-- 卡片式页签 另一种样式的页签，不提供对应的垂直样式 -->
            <p class="mgTop"></p>
            <nz-tabset [nzTabPosition]="'top'" [nzType]="'card'">
                <nz-tab *ngFor="let tab of tabs3" [nzTitle]="'Tab' + tab"> Content of Tab Pane {{ tab }} </nz-tab>
            </nz-tabset>
            <!--  -->
            <p class="mgTop"></p>
            <!--  -->
            <p class="mgTop"></p>
            <!--  -->
            <p class="mgTop"></p>
            <!--  -->
            <p class="mgTop"></p>
            <!--  -->
            <p class="mgTop"></p>
            <!--  -->
            <p class="mgTop"></p>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
        .mgTop {
            margin-top: 10px;
        }
    `]
})
export class TabsDemoComponent implements OnInit {
    tabs = [
        {
          name: 'Tab 1',
          disabled: false
        },
        {
          name: 'Tab 2',
          disabled: true
        },
        {
          name: 'Tab 3',
          disabled: false
        }
    ];
    tabs2 = [
        {
          active: true,
          name: 'Tab 1',
          icon: 'apple'
        },
        {
          active: false,
          name: 'Tab 2',
          icon: 'android'
        }
    ];
    tabs3 = [1, 2, 3];

    constructor() { }

    ngOnInit(): void {}
}
