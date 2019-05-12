import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-back-top-demo',
    template: `
        <div class="container">
            <!-- 滚动容器 设置 nzTarget 参数，允许对某个容器返回顶部 -->
            <div class="long-div" #divTarget>
                <div class="long-div" #divTarget>
                    <div class="long-div-inner"></div>
                    <nz-back-top [nzTarget]="divTarget"></nz-back-top>
                </div>
            </div>
            <!-- 基本 最简单的用法 -->
            <nz-back-top></nz-back-top>
            <div class="longHeight"></div>
            <!-- 自定义样式 可以自定义回到顶部按钮的样式，限制宽高：40px * 40px (这个覆盖了上边的基本简单用法) -->
            <!--
            <nz-back-top [nzTemplate]="tpl" [nzVisibilityHeight]="100" (nzOnClick)="notify()">
                <ng-template #tpl>
                    <div class="ant-back-top-inner">UP</div>
                </ng-template>
            </nz-back-top>
            -->
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
        .long-div {
            height: 300px;
            overflow-y: scroll;
            background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);
        }
        .long-div-inner {
            height: 1500px;
        }
        .longHeight {
            height: 1800px;
        }
        .ant-back-top {
            bottom: 100px;
        }
        .ant-back-top-inner {
            height: 40px;
            width: 40px;
            line-height: 40px;
            border-radius: 4px;
            background-color: #1088e9;
            color: #fff;
            text-align: center;
            font-size: 20px;
        }
    `]
})
export class BackTopDemoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}
}
