import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sticky-thing-demo',
    template: `
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">
        <h3>An Angular directive for making things sticky when the user scrolls.</h3>
        <section class="color-1" #boundary1>
            <div class="container wrap">
                <div class="row">
                <div class="col-6">
                    <div #spacer1></div>
                    <div stickyThing="" [spacer]="spacer1" [boundary]="boundary1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="155mm"
                            viewBox="0 0 210 155">
                            <path
                            [attr.d]="svgPath"
                            style="text-indent:0;text-transform:none" overflow="visible" color="#000" fill="#fff"/>
                        </svg>
                    </div>
                </div>
                <div class="col pt-5">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                </div>
            </div>
        </section>

        <section class="color-2" #boundary2>
            <div class="container wrap">
                <div class="row">
                <div class="col pt-5 text-center">
                    <div #spacerB></div>
                    <div stickyThing="" [spacer]="spacerB" [boundary]="boundary2">
                        <button class="btn btn-light my-4" type="button" (click)="enableSticky = !enableSticky">
                            {{ enableSticky ? 'Disable' : 'Enable'}} sticky element
                        </button>
                    </div>
                </div>
                <div class="col-6">
                    <div #spacer2></div>
                    <div stickyThing="" [enable]="enableSticky" [spacer]="spacer2" [boundary]="boundary2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="155mm"
                            viewBox="0 0 210 155">
                            <path
                            [attr.d]="svgPath"
                            style="text-indent:0;text-transform:none" overflow="visible" color="#000" fill="#fff"/>
                        </svg>
                        <h4 class="text-center mb-4">Now {{ enableSticky ? 'I am sticky' : 'I am not' }}</h4>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <section class="color-3" #boundary3>
            <div class="container wrap">
                <div class="row">
                <div class="col-6">
                    <div #spacer3></div>
                    <div stickyThing="" [spacer]="spacer3" [boundary]="boundary3" [marginTop]="50" [marginBottom]="50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="155mm"
                            viewBox="0 0 210 155">
                            <path
                            [attr.d]="svgPath"
                            style="text-indent:0;text-transform:none" overflow="visible" color="#000" fill="#fff"/>
                        </svg>
                    </div>
                </div>
                <div class="col pt-5">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                </div>
            </div>
        </section>

        <section class="color-4" #boundary4>
            <div class="container wrap">
                <div class="row">
                <div class="col pt-5">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div class="col-6">
                    <div #spacer4></div>
                    <div stickyThing="" [spacer]="spacer4" [boundary]="boundary4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="155mm" viewBox="0 0 210 155">
                            <path
                            [attr.d]="svgPath"
                            style="text-indent:0;text-transform:none" overflow="visible" color="#000" fill="#fff"/>
                        </svg>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <section class="color-5" #boundary5>
            <div class="container wrap">
                <div class="row">
                <div class="col-6">
                    <div #spacer5></div>
                    <div stickyThing="" [spacer]="spacer5" [boundary]="boundary5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="155mm" viewBox="0 0 210 155">
                            <path
                            [attr.d]="svgPath"
                            style="text-indent:0;text-transform:none" overflow="visible" color="#000" fill="#fff"/>
                        </svg>
                    </div>
                </div>
                <div class="col pt-5">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                </div>
            </div>
        </section>
        <app-back></app-back>
    `,
    styleUrls: ['bootstrap.min.css', './common.scss']
})
export class StickyThingDemoComponent implements OnInit {
    enableSticky = true;
    // tslint:disable-next-line:max-line-length
    svgPath = `M11.075 14.317v121.048h190.884V14.317H11.075zm186.228 4.656c-.159 7.155.289 15.69-.146 22.186-5.852 5.068-14.646 4.398-19.714-1.455-6.06-8.816-2.938-15.732 2.692-20.66 5.298-.15 11.55-.072 17.168-.072zm-80.675 25.46c2.91 3.371 5.49 8.117 7.784 13.895 2.79 7.024 5.41 14.71 8.948 20.805-3.158 4.735-6.372 8.46-9.239 9.894-1.245.428-1.913 2.046-1.332 3.228.58 1.181 2.27 1.642 3.369.918 11.729-9.308 16.992-21.615 23.57-33.39 7.884 13.52 15.617 25.047 28.734 37.027-28.102 6.266-49.93 5.856-72.018 5.02-4.862-.184-9.746-.424-14.695-.582 15.491-21.148 16.68-34.985 24.88-56.814zm-18.259 8.73l7.638 6.11c-2.833 15.523-10.595 27.088-19.786 41.83-13.665-.313-28.077-.024-44.448 2.109 14.34-9.125 27.92-21.75 40.738-37.9 2.284 1.52 4.57 3.037 6.838 4.583 4.961-4.586 7.378-11.394 9.02-16.732z`;

    constructor() { }

    ngOnInit(): void { }
}
