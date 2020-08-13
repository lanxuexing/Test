import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-demo',
    template: `
        <div class="container">
            <!-- 典型卡片 包含标题、内容、操作区域 -->
            <nz-card style="width:300px;" nzTitle="Card title" [nzExtra]="extraTemplate">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </nz-card>
            <ng-template #extraTemplate>
            <a>More</a>
            </ng-template>
            <!-- 无边框 在灰色背景上使用无边框的卡片 -->
            <p class="mdTop"></p>
            <div style="background: #ECECEC;padding:30px;">
                <nz-card style="width:300px;" [nzBordered]="false" nzTitle="Card title" [nzExtra]="extraTemplate">
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </nz-card>
            </div>
            <ng-template #extraTemplate>
                <a>More</a>
            </ng-template>
            <!-- 简洁卡片 只包含内容区域 -->
            <p class="mdTop"></p>
            <nz-card style="width:300px;">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </nz-card>
            <!-- 更灵活的内容展示 可以利用 nz-card-meta 支持更灵活的内容 -->
            <p class="mdTop"></p>
            <nz-card nzHoverable style="width:240px" [nzCover]="coverTemplate">
                <nz-card-meta nzTitle="Europe Street beat" nzDescription="www.instagram.com"></nz-card-meta>
            </nz-card>
            <ng-template #coverTemplate>
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </ng-template>
            <!-- 预加载的卡片 数据读入前会有文本块样式 -->
            <p class="mdTop"></p>
            <nz-card style="width: 300px;margin-top: 16px" [nzActions]="[actionSetting, actionEdit, actionEllipsis]">
                <p>这里是内容区域</p>
            </nz-card>
            <ng-template #actionSetting>
                <span>设置</span>
            </ng-template>
            <ng-template #actionEdit>
                <span>编辑</span>
            </ng-template>
            <ng-template #actionEllipsis>
                <span>更多</span>
            </ng-template>
            <!-- 网格型内嵌卡片 一种常见的卡片内容区隔模式 -->
            <p class="mdTop"></p>
            <nz-card nzTitle="Cart Title">
                <div nz-card-grid [ngStyle]="gridStyle">Content</div>
                <div nz-card-grid [ngStyle]="gridStyle">Content</div>
                <div nz-card-grid [ngStyle]="gridStyle">Content</div>
                <div nz-card-grid [ngStyle]="gridStyle">Content</div>
                <div nz-card-grid [ngStyle]="gridStyle">Content</div>
                <div nz-card-grid [ngStyle]="gridStyle">Content</div>
                <div nz-card-grid [ngStyle]="gridStyle">Content</div>
            </nz-card>
            <!-- 内部卡片 可以放在普通卡片内部，展示多层级结构的信息 -->
            <p class="mdTop"></p>
            <nz-card nzTitle="Card Title">
                <p style="font-size:14px;color:rgba(0, 0, 0, 0.85);margin-bottom:16px;font-weight: 500;">
                    Group title
                </p>
                <nz-card nzType="inner" nzTitle="Inner Card Title" [nzExtra]="extraTemplate">
                    <a>Inner Card Content</a>
                </nz-card>
                <nz-card nzType="inner" style="margin-top:16px;" nzTitle="Inner Card Title" [nzExtra]="extraTemplate">
                    <a>Inner Card Content</a>
                </nz-card>
            </nz-card>
            <ng-template #extraTemplate>
                <a>More</a>
            </ng-template>
            <!-- 支持更多内容配置 一种支持封面、头像、标题和描述信息的卡片 -->
            <p class="mdTop"></p>
            <nz-card style="width:300px;" [nzCover]="coverTemplate" [nzActions]="[actionSetting, actionEdit, actionEllipsis]">
                <nz-card-meta
                    nzTitle="Card title"
                    nzDescription="This is the description"
                    [nzAvatar]="avatarTemplate"
                ></nz-card-meta>
            </nz-card>
            <ng-template #avatarTemplate>
                <img alt="example" width="32" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
            </ng-template>
            <ng-template #coverTemplate>
                <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            </ng-template>
            <ng-template #actionSetting>
                <i nz-icon type="setting"></i>
            </ng-template>
            <ng-template #actionEdit>
                <i nz-icon type="edit"></i>
            </ng-template>
            <ng-template #actionEllipsis>
                <i nz-icon type="ellipsis"></i>
            </ng-template>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
        p {
            margin: 0;
        }
        .mdTop {
            margin-top: 10px;
        }
    `]
})
export class CardDemoComponent implements OnInit {
    loading = true;
    gridStyle = {
        width: '25%',
        textAlign: 'center'
    };

    constructor() { }

    ngOnInit(): void {}
}
