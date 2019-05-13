import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-affix-demo',
    template: `
        <div class="container">
            <!-- 基本 最简单的用法 -->
            <div class="longHeight">
                <nz-affix>
                    <button>
                        <span>Affix top</span>
                    </button>
                </nz-affix>
                <br />
                <nz-affix nzOffsetBottom="0">
                    <button>
                        <span>Affix bottom</span>
                    </button>
                </nz-affix>
            </div>
            <!-- 固定状态改变的回调 可以获得是否固定的状态 -->
            <p class="mdTop"></p>
            <div class="middleHeight">
                <nz-affix [nzOffsetTop]="120" (nzChange)="onChange($event)">
                    <button>
                        <span>120px to affix top</span>
                    </button>
                </nz-affix>
            </div>
            <!-- 滚动容器 用 nzTarget 设置 nz-affix 需要监听其滚动事件的元素，默认为 window -->
            <p class="mdTop"></p>
            <div class="scrollable-container" #target>
                <div class="background">
                    <nz-affix [nzTarget]="target" id="affix-container-target">
                        <button>
                            <span>Fixed at the top of container</span>
                        </button>
                    </nz-affix>
                </div>
            </div>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
        .longHeight {
            height: 1800px;
        }
        .middleHeight {
            height: 500px;
        }
        .mdTop {
            margin-top: 10px;
        }
        .scrollable-container {
            height: 100px;
            overflow-y: scroll;
        }
        .background {
            padding-top: 60px;
            height: 300px;
            background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);
        }
    `]
})
export class AffixDemoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    onChange(status: boolean) {
        console.log(status);
    }
}
