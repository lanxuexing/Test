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
            <!-- 滑动 可以左右、上下滑动，容纳更多标签 -->
            <p class="mgTop"></p>
            <div class="mgBottom">
                <label class="mgRight"><input type="radio" name="nzTabPosition" [(ngModel)]="nzTabPosition" value="top">Horizontal</label>
                <label><input type="radio" name="nzTabPosition" [(ngModel)]="nzTabPosition" value="left">Vertical</label>
            </div>
            <input style="float:right;" min="0" max="20" [(ngModel)]="selectedIndex"/>
            <nz-tabset
            style="height:220px;"
            [nzTabPosition]="nzTabPosition"
            [(nzSelectedIndex)]="selectedIndex"
            (nzSelectChange)="log([$event])"
            >
                <nz-tab
                    *ngFor="let tab of tabs4"
                    [nzTitle]="tab.name"
                    (nzSelect)="log(['select', tab])"
                    (nzClick)="log(['click', tab])"
                    (nzDeselect)="log(['deselect', tab])"
                >
                    {{ tab.content }}
                </nz-tab>
            </nz-tabset>
            <!-- 附加内容 可以在页签右边添加附加操作 -->
            <p class="mgTop"></p>
            <nz-tabset [nzTabBarExtraContent]="extraTemplate">
                <nz-tab *ngFor="let tab of tabs3" [nzTitle]="'Tab ' + tab"> Content of tab {{ tab }} </nz-tab>
            </nz-tabset>
            <ng-template #extraTemplate>
                <button nz-button>Extra Action</button>
            </ng-template>
            <!-- 大小 大号页签用在页头区域，小号用在弹出框等较狭窄的容器内 -->
            <p class="mgTop"></p>
            <div class="mgBottom">
                <label class="mgRight"><input type="radio" name="size" [(ngModel)]="size" value="small">Small</label>
                <label class="mgRight"><input type="radio" name="size" [(ngModel)]="size" value="default">Default</label>
                <label><input type="radio" name="size" [(ngModel)]="size" value="large">Large</label>
            </div>
            <nz-tabset [nzSize]="size">
                <nz-tab *ngFor="let tab of tabs3" [nzTitle]="'Tab ' + tab"> Content of tab {{ tab }} </nz-tab>
            </nz-tabset>
            <!-- 位置 有四个位置，nzTabPosition="left|right|top|bottom" -->
            <p class="mgTop"></p>
            <div style="margin-bottom: 16px;">
                Tab position：
                <select [(ngModel)]="position" placeholder="位置" style="width: 80px;">
                    <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
                </select>
            </div>
            <nz-tabset [nzTabPosition]="position" [nzType]="'line'">
                <nz-tab *ngFor="let tab of tabs3" [nzTitle]="'Tab ' + tab"> Content of tab {{ tab }} </nz-tab>
            </nz-tabset>
            <!-- 卡片式页签 另一种样式的页签，不提供对应的垂直样式 -->
            <p class="mgTop"></p>
            <nz-tabset [nzTabPosition]="'top'" [nzType]="'card'">
                <nz-tab *ngFor="let tab of tabs3" [nzTitle]="'Tab' + tab"> Content of Tab Pane {{ tab }} </nz-tab>
            </nz-tabset>
            <!-- 新增和关闭页签 只有卡片样式的页签支持新增和关闭选项 -->
            <p class="mgTop"></p>
            <nz-tabset [nzType]="'card'" [nzTabBarExtraContent]="extraTemplate">
                <nz-tab *ngFor="let tab of tabs5" [nzTitle]="titleTemplate">
                    <ng-template #titleTemplate>
                        <div>
                            {{ tab }}
                            <i (click)="closeTab(tab)" class="ant-tabs-close-x">❌</i>
                        </div>
                    </ng-template>
                    Content of {{ tab }}
                </nz-tab>
            </nz-tabset>
            <ng-template #extraTemplate>
                <i class="ant-tabs-new-tab" (click)="newTab()">➕</i>
            </ng-template>
            <!-- 卡片式页签容器 用于容器顶部，需要一点额外的样式覆盖 -->
            <p class="mgTop"></p>
            <div class="card-container">
                <nz-tabset [nzTabPosition]="'top'" [nzType]="'card'">
                    <nz-tab *ngFor="let tab of tabs3" [nzTitle]="'Tab Title ' + tab">
                    <p>Content of Tab Pane {{ tab }}</p>
                    <p>Content of Tab Pane {{ tab }}</p>
                    <p>Content of Tab Pane {{ tab }}</p>
                    </nz-tab>
                </nz-tabset>
            </div>
            <!-- 自定义新增页签触发器 给自定义触发器绑定事件 -->
            <p class="mgTop"></p>
            <div style="margin-bottom: 16px;">
                <button nz-button (click)="newTab2()">ADD</button>
            </div>
            <nz-tabset [nzType]="'card'" [nzSelectedIndex]="index">
                <nz-tab *ngFor="let tab of tabs6" [nzTitle]="titleTemplate">
                    <ng-template #titleTemplate>
                        <div>{{ tab }}<i class="ant-tabs-close-x" (click)="closeTab2(tab)">❌</i></div>
                    </ng-template>
                    Content of {{ tab }}
                </nz-tab>
            </nz-tabset>
            <!-- 懒加载 默认情况下，nz-tab 中的组件会进行预加载，如果希望当 Tab 被激活时再加载组件，可以使用该示例中的懒加载方式 -->
            <p class="mgTop"></p>
            <nz-tabset>
                <nz-tab nzTitle="Tab Eagerly 1">
                    <nz-demo-tab-content-eagerly></nz-demo-tab-content-eagerly>
                </nz-tab>
                <nz-tab nzTitle="Tab Eagerly 2">
                    <nz-demo-tab-content-eagerly></nz-demo-tab-content-eagerly>
                </nz-tab>
                <nz-tab nzTitle="Tab Lazy 1">
                    <ng-template nz-tab>
                        <nz-demo-tab-content-lazy></nz-demo-tab-content-lazy>
                    </ng-template>
                </nz-tab>
                <nz-tab nzTitle="Tab Lazy 2">
                    <ng-template nz-tab>
                        <nz-demo-tab-content-lazy></nz-demo-tab-content-lazy>
                    </ng-template>
                </nz-tab>
            </nz-tabset>
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
        .mgBottom {
            margin-bottom: 20px;
        }
        .mgRight {
            margin-right: 20px;
        }
        .ard-container {
            background: #f5f5f5;
            overflow: hidden;
            padding: 24px;
            display: block;
        }
        .card-container ::ng-deep .ant-tabs-card .ant-tabs-content {
            height: 120px;
            margin-top: -16px;
        }
        .card-container ::ng-deep .ant-tabs-card .ant-tabs-content .ant-tabs-tabpane {
            background: #fff;
            padding: 16px;
        }
        .card-container ::ng-deep .ant-tabs-card .ant-tabs-bar {
            border-color: #fff;
        }
        .card-container ::ng-deep .ant-tabs-card .ant-tabs-bar .ant-tabs-tab {
            border-color: transparent;
            background: transparent;
        }
        .card-container ::ng-deep .ant-tabs-card .ant-tabs-bar .ant-tabs-tab-active {
            border-color: #fff;
            background: #fff;
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
    tabs4: any[] = [];
    tabs5 = ['Tab 1', 'Tab 2'];
    tabs6 = ['Tab 1', 'Tab 2'];
    nzTabPosition = 'top';
    selectedIndex = 0;
    index = 0;
    size = 'small';
    position = 'top';
    options = [
        { value: 'top', label: 'top' },
        { value: 'left', label: 'left' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom' }
    ];

    constructor() { }

    ngOnInit(): void {
        for (let i = 0; i < 21; i++) {
            this.tabs4.push({
              name: `Tab ${i}`,
              content: `Content of tab ${i}`
            });
        }
        console.log(`I will init when tab active`);
    }

    log(args: any[]): void {
        console.log(args);
    }

    closeTab(tab: { name: string; disabled: boolean; }): void {
        this.tabs5.splice(this.tabs.indexOf(tab), 1);
    }

    newTab(): void {
        this.tabs5.push('New Tab');
    }

    closeTab2(tab: { name: string; disabled: boolean; }): void {
        this.tabs6.splice(this.tabs.indexOf(tab), 1);
    }

    newTab2(): void {
        this.tabs6.push('New Tab');
        this.index = this.tabs.length - 1;
    }
}



// 懒加载...
export class NzDemoTabsLazyComponent {}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-demo-tab-content-lazy',
  template: `
    lazy
  `
})
export class NzDemoTabContentLazyComponent implements OnInit {
  ngOnInit(): void {
    console.log(`I will init when tab active`);
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-demo-tab-content-eagerly',
  template: `
    eagerly
  `
})
export class NzDemoTabContentEagerlyComponent implements OnInit {
  ngOnInit(): void {
    console.log(`I will init eagerly`);
  }
}
