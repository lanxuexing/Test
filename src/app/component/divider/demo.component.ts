import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-divider-demo',
    template: `
        <div class="container">
            <!-- 水平分割线 默认为水平分割线，可在中间加入文字 -->
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
            quae sunt a te dicta? Refert tamen, quo modo.</p>
            <nz-divider></nz-divider>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
            quae sunt a te dicta? Refert tamen, quo modo.</p>
            <nz-divider nzText="With Text"></nz-divider>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
            quae sunt a te dicta? Refert tamen, quo modo.</p>
            <nz-divider nzDashed [nzText]="text">
                <ng-template #text><i nz-icon type="plus"></i> Add</ng-template>
            </nz-divider>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
            quae sunt a te dicta? Refert tamen, quo modo.</p>
            <nz-divider nzText="With Text" nzOrientation="left"></nz-divider>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
            quae sunt a te dicta? Refert tamen, quo modo.</p>
            <nz-divider nzText="With Text" nzOrientation="right"></nz-divider>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
            quae sunt a te dicta? Refert tamen, quo modo.</p>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            width: 50%;
            margin-top: 40px;
        }
    `]
})
export class DividerDemoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}
}
