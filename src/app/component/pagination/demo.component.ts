import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pagination-demo',
    template: `
        <div class="container">
            <!-- 基本 基础分页 -->
            <nz-pagination [nzPageIndex]="1" [nzTotal]="50"></nz-pagination>
            <!-- 更多 更多分页 -->
            <p class="mgTop"></p>
            <nz-pagination [nzPageIndex]="1" [nzTotal]="500"></nz-pagination>
            <!-- 改变 改变每页显示条目数 -->
            <p class="mgTop"></p>
            <nz-pagination [nzPageIndex]="3" [nzTotal]="500" nzShowSizeChanger [nzPageSize]="10"></nz-pagination>
            <!-- 跳转 快速跳转到某一页 -->
            <p class="mgTop"></p>
            <nz-pagination [nzPageIndex]="2" [nzTotal]="500" nzShowQuickJumper></nz-pagination>
            <!-- 迷你 迷你版本 -->
            <p class="mgTop"></p>
            <nz-pagination [(nzPageIndex)]="current" [nzTotal]="50" [nzSize]="'small'"></nz-pagination>
            <br />
            <nz-pagination
            [(nzPageIndex)]="current"
            [nzTotal]="50"
            [nzSize]="'small'"
            nzShowSizeChanger
            nzShowQuickJumper
            ></nz-pagination>
            <br />
            <nz-pagination
            [(nzPageIndex)]="current"
            [nzTotal]="50"
            [nzSize]="'small'"
            [nzShowTotal]="totalTemplate"
            ></nz-pagination>
            <ng-template #totalTemplate let-total>Total {{ total }} items</ng-template>
            <!-- 简洁 简单的翻页 -->
            <p class="mgTop"></p>
            <nz-pagination [nzPageIndex]="2" [nzTotal]="50" nzSimple></nz-pagination>
            <!-- 页码 改变页码 -->
            <p class="mgTop"></p>
            <nz-pagination [nzPageIndex]="3" [nzTotal]="50"></nz-pagination>
            <!-- 总数 通过设置 nzShowTotal 展示总共有多少数据 -->
            <p class="mgTop"></p>
            <nz-pagination [nzPageIndex]="1" [nzTotal]="85" [nzPageSize]="20" [nzShowTotal]="totalTemplate"></nz-pagination>
            <br />
            <nz-pagination [nzPageIndex]="1" [nzTotal]="85" [nzPageSize]="20" [nzShowTotal]="rangeTemplate"></nz-pagination>
            <ng-template #totalTemplate let-total> Total {{ total }} items </ng-template>
            <ng-template #rangeTemplate let-range="range" let-total>
            {{ range[0] }}-{{ range[1] }} of {{ total }} items
            </ng-template>
            <!-- 上一步和下一步 修改上一步和下一步为文字链接 -->
            <p class="mgTop"></p>
            <nz-pagination [nzPageIndex]="1" [nzTotal]="500" [nzItemRender]="renderItemTemplate"></nz-pagination>
            <ng-template #renderItemTemplate let-type let-page="page">
            <a *ngIf="type === 'pre'">Previous</a>
            <a *ngIf="type === 'next'">Next</a>
            <a *ngIf="type === 'page'">{{ page }}</a>
            </ng-template>
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
export class PaginationDemoComponent implements OnInit {
    current = 1;

    constructor() { }

    ngOnInit(): void {}
}
