import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-collapes-demo',
    template: `
        <div class="container">
            <!-- 折叠面板 可以同时展开多个面板，这个例子默认展开了第一个 -->
            <nz-collapse>
                <nz-collapse-panel
                    *ngFor="let panel of panels"
                    [nzHeader]="panel.name"
                    [nzActive]="panel.active"
                    [nzDisabled]="panel.disabled"
                >
                    <p style="margin:0;">
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
                    guest in many households across the world.
                    </p>
                </nz-collapse-panel>
            </nz-collapse>
            <!-- 手风琴 手风琴，每次只打开一个tab。默认打开第一个 -->
            <p class="mgTop"></p>
            <nz-collapse nzAccordion>
                <nz-collapse-panel *ngFor="let panel of panels2" [nzHeader]="panel.name" [nzActive]="panel.active">
                    <p>{{ panel.name }} content</p>
                </nz-collapse-panel>
            </nz-collapse>
            <!-- 面板嵌套 嵌套折叠面板 -->
            <p class="mgTop"></p>
            <nz-collapse>
                <nz-collapse-panel *ngFor="let panel of panels3" [nzHeader]="panel.name" [nzActive]="panel.active">
                    <p>{{ panel.name }}</p>
                    <div *ngIf="panel.childPanel && panel.childPanel.length > 0">
                    <nz-collapse>
                        <nz-collapse-panel
                        *ngFor="let childPanel of panel.childPanel"
                        [nzHeader]="childPanel.name"
                        [nzActive]="childPanel.active"
                        >
                        <p>
                            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
                            welcome guest in many households across the world.
                        </p>
                        </nz-collapse-panel>
                    </nz-collapse>
                    </div>
                </nz-collapse-panel>
            </nz-collapse>
            <!-- 简洁风格 一套没有边框的简洁样式 -->
            <p class="mgTop"></p>
            <nz-collapse [nzBordered]="false">
                <nz-collapse-panel *ngFor="let panel of panels4" [nzHeader]="panel.name" [nzActive]="panel.active">
                    <p>{{ panel.name }} content</p>
                </nz-collapse-panel>
            </nz-collapse>
            <!-- 自定义面板 自定义各个面板的背景色、圆角、边距和图标 -->
            <p class="mgTop"></p>
            <nz-collapse [nzBordered]="false">
                <nz-collapse-panel
                    #p
                    *ngFor="let panel of panels5; let isFirst = first"
                    [nzHeader]="panel.name"
                    [nzActive]="panel.active"
                    [ngStyle]="panel.customStyle"
                    [nzExpandedIcon]="!isFirst && (panel.icon || expandedIcon)"
                >
                    <p>{{ panel.name }} content</p>
                    <ng-template #expandedIcon let-active>
                    {{ active }}
                        <i class="ant-collapse-arrow" *ngIf="!p.nzActive">👉</i>
                        <i class="ant-collapse-arrow" *ngIf="p.nzActive">👇</i>
                    </ng-template>
                </nz-collapse-panel>
            </nz-collapse>
            <!-- 隐藏箭头 你可以通过 [nzShowArrow]="false" 隐藏 nz-collapse-panel 组件的箭头图标 -->
            <p class="mgTop"></p><nz-collapse>
                <nz-collapse-panel
                *ngFor="let panel of panels6"
                [nzHeader]="panel.name"
                [nzActive]="panel.active"
                [nzDisabled]="panel.disabled"
                [nzShowArrow]="panel.arrow"
                >
                <p style="margin:0;">
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
                    guest in many households across the world.
                </p>
                </nz-collapse-panel>
            </nz-collapse>
            <!-- 额外节点 你可以通过 nzExtra 来指定面板右上角的额外内容 -->
            <p class="mgTop"></p>
            <nz-collapse>
                <nz-collapse-panel
                    *ngFor="let panel of panels7"
                    [nzHeader]="panel.name"
                    [nzActive]="panel.active"
                    [nzExtra]="extraTpl"
                    [nzDisabled]="panel.disabled"
                >
                    <p style="margin:0;">
                    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
                    guest in many households across the world.
                    </p>
                </nz-collapse-panel>
            </nz-collapse>
            <ng-template #extraTpl>
                <small>🌸</small>
            </ng-template>
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
export class CollapesDemoComponent implements OnInit {
    panels = [
        {
          active: true,
          name: 'This is panel header 1',
          disabled: false
        },
        {
          active: false,
          disabled: false,
          name: 'This is panel header 2'
        },
        {
          active: false,
          disabled: true,
          name: 'This is panel header 3'
        }
    ];

    panels2 = [
        {
          active: true,
          name: 'This is panel header 1',
          childPanel: [
            {
              active: false,
              name: 'This is panel header 1-1'
            }
          ]
        },
        {
          active: false,
          name: 'This is panel header 2'
        },
        {
          active: false,
          name: 'This is panel header 3'
        }
    ];

    panels3 = [
        {
          active: true,
          disabled: false,
          name: 'This is panel header 1',
          childPanel: [
            {
              active: true,
              name: 'This is panel header 1-1'
            },
            {
              active: false,
              name: 'This is panel header 1-2'
            }
          ]
        },
        {
          active: false,
          disabled: true,
          name: 'This is panel header 2'
        },
        {
          active: false,
          disabled: false,
          name: 'This is panel header 3'
        }
    ];

    panels4 = [
        {
          active: true,
          disabled: false,
          name: 'This is panel header 1',
          childPannel: [
            {
              active: false,
              disabled: true,
              name: 'This is panel header 1-1'
            }
          ]
        },
        {
          active: false,
          disabled: true,
          name: 'This is panel header 2'
        },
        {
          active: false,
          disabled: false,
          name: 'This is panel header 3'
        }
    ];

    panels5 = [
        {
          active: true,
          disabled: false,
          name: 'This is panel header 1',
          customStyle: {
            background: '#f7f7f7',
            'border-radius': '4px',
            'margin-bottom': '24px',
            border: '0px'
          }
        },
        {
          active: false,
          disabled: true,
          name: 'This is panel header 2',
          icon: 'double-right',
          customStyle: {
            background: '#f7f7f7',
            'border-radius': '4px',
            'margin-bottom': '24px',
            border: '0px'
          }
        },
        {
          active: false,
          disabled: false,
          name: 'This is panel header 3',
          customStyle: {
            background: '#f7f7f7',
            'border-radius': '4px',
            'margin-bottom': '24px',
            border: '0px'
          }
        }
    ];

    panels6 = [
        {
          active: true,
          name: 'This is panel header 1',
          arrow: true
        },
        {
          active: false,
          arrow: false,
          name: 'This is panel header 2'
        }
    ];

    panels7 = [
        {
          active: true,
          name: 'This is panel header 1',
          disabled: false
        },
        {
          active: false,
          disabled: false,
          name: 'This is panel header 2'
        },
        {
          active: false,
          disabled: true,
          name: 'This is panel header 3'
        }
    ];

    constructor() { }

    ngOnInit(): void {}
}
