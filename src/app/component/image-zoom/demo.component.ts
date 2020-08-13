import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-image-zoom-demo',
    template: `
        <div class="container">
            <!-- 1. 基本使用 -->
            <table class="table">
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                <li>Zoom mode: <em>hover</em></li>
                            </ul>
                        </td>
                        <td>
                            <image-zoom [thumbImage]="'assets/image/thumb.jpg'"
                                [fullImage]="'assets/image/fullres.jpg'" [zoomMode]="'hover'"
                                [magnification]="1">
                                <div class="ngxImageZoomContainer" style="width: 650px; height: 401px;"><img
                                        class="ngxImageZoomThumbnail" height="100%" width="100%"
                                        src="assets/image/thumb.jpg">
                                    <div class="ngxImageZoomFullContainer"
                                        style="top: 0px; left: 0px; width: 650px; height: 401px; border-radius: 0px; display: none;">
                                        <img class="ngxImageZoomFull" src="assets/image/fullres.jpg"
                                                style="width: 3250px; height: 2005px; display: none; top: -1284px; left: -152px;">
                                    </div>
                                </div>
                            </image-zoom>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Zoom mode: <em>click</em></li>
                                <li>Scroll zooming: <em>enabled</em></li>
                            </ul>
                        </td>
                        <td>
                            <image-zoom [thumbImage]="'assets/image/thumb.jpg'"
                                [fullImage]="'assets/image/fullres.jpg'" [zoomMode]="'click'"
                                [magnification]="1" [enableScrollZoom]="true">
                                <div class="ngxImageZoomContainer" style="width: 650px; height: 401px;"><img
                                        class="ngxImageZoomThumbnail" height="100%" width="100%"
                                        src="assets/image/thumb.jpg">
                                    <div class="ngxImageZoomFullContainer"
                                        style="top: 0px; left: 0px; width: 650px; height: 401px; border-radius: 0px; display: none;">
                                        <img class="ngxImageZoomFull" src="assets/image/fullres.jpg"
                                                style="width: 650px; height: 401px; display: none; top: 0px; left: 0px;"></div>
                                </div>
                            </image-zoom>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Zoom mode: <em>click</em></li>
                                <li>Lens mode: <em>enabled</em></li>
                                <li>Lens width: <em>150</em></li>
                                <li>Lens height: <em>150</em></li>
                                <li>Circular lens: <em>enabled</em></li>
                            </ul>
                        </td>
                        <td>
                            <image-zoom [thumbImage]="'assets/image/thumb.jpg'"
                                [fullImage]="'assets/image/fullres.jpg'" [zoomMode]="'click'"
                                [magnification]="1" [enableLens]="true"
                                [lensWidth]="150" [lensHeight]="150"
                                [circularLens]="true">
                                <div class="ngxImageZoomContainer" style="width: 650px; height: 401px;"><img
                                        class="ngxImageZoomThumbnail" height="100%" width="100%"
                                        src="assets/image/thumb.jpg">
                                    <div class="ngxImageZoomFullContainer ngxImageZoomLensEnabled"
                                        style="width: 150px; height: 150px; border-radius: 75px; display: none;
                                        top: 100px; left: 569px;">
                                        <img class="ngxImageZoomFull" src="assets/image/fullres.jpg"
                                                style="width: 3250px; height: 2005px; display: none; top: -800px; left: -3145px;">
                                    </div>
                                </div>
                            </image-zoom>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Zoom mode: <em>toggle</em></li>
                                <li>Magnification: <em>0.5</em></li>
                            </ul>
                        </td>
                        <td>
                            <image-zoom [thumbImage]="'assets/image/thumb.jpg'"
                                [fullImage]="'assets/image/fullres.jpg'" [zoomMode]="'toggle'"
                                [magnification]="0.5">
                                <div class="ngxImageZoomContainer" style="width: 650px; height: 401px;"><img
                                        class="ngxImageZoomThumbnail" height="100%" width="100%"
                                        src="assets/image/thumb.jpg">
                                    <div class="ngxImageZoomFullContainer"
                                        style="top: 0px; left: 0px; width: 650px; height: 401px; border-radius: 0px; display: none;">
                                        <img class="ngxImageZoomFull" src="assets/image/fullres.jpg"
                                                style="width: 1625px; height: 1002.5px; display: none; top: -219px; left: -624px;">
                                    </div>
                                </div>
                            </image-zoom>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Zoom mode: <em>hover-freeze</em></li>
                                <li>Scroll zooming: <em>enabled</em></li>
                                <li>Lens mode: <em>enabled</em></li>
                                <li>Lens width: <em>163</em></li>
                                <li>Lens height: <em>100</em></li>
                            </ul>
                        </td>
                        <td>
                            <image-zoom [thumbImage]="'assets/image/thumb.jpg'"
                                [fullImage]="'assets/image/fullres.jpg'" [zoomMode]="'hover-freeze'"
                                [magnification]="1" [enableLens]="true"
                                [lensWidth]="163" [lensHeight]="100"
                                [enableScrollZoom]="true">
                                <div class="ngxImageZoomContainer" style="width: 650px; height: 401px;"><img
                                        class="ngxImageZoomThumbnail" height="100%" width="100%"
                                        src="assets/image/thumb.jpg">
                                    <div class="ngxImageZoomFullContainer ngxImageZoomLensEnabled"
                                        style="width: 163px; height: 100px; border-radius: 0px; display: none;
                                        top: 105px; left: 557.5px;">
                                        <img class="ngxImageZoomFull" src="assets/image/fullres.jpg"
                                                style="width: 650px; height: 401px; display: none; top: -105px; left: -557.5px;">
                                    </div>
                                </div>
                            </image-zoom>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li>Zoom mode: <em>hover</em></li>
                                <li>Scroll zooming: <em>enabled</em></li>
                                <li>Lens mode: <em>enabled</em></li>
                            </ul> Module output: <ul>
                                <li>Magnification: 0.2</li>
                                <li>Cursor position: <ul>
                                        <li>X: 649</li>
                                        <li>Y: 74</li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        <td>
                            <image-zoom enablelens="true" enablescrollzoom="true" zoommode="hover"
                                [thumbImage]="'assets/image/thumb.jpg'" [fullImage]="'assets/image/fullres.jpg'"
                                [zoomMode]="'hover'" [enableLens]="true"
                                [enableScrollZoom]="true">
                                <div class="ngxImageZoomContainer" style="width: 650px; height: 401px;"><img
                                        class="ngxImageZoomThumbnail" height="100%" width="100%"
                                        src="assets/image/thumb.jpg">
                                    <div class="ngxImageZoomFullContainer ngxImageZoomLensEnabled"
                                        style="width: 100px; height: 100px; border-radius: 0px; display: none; top: 24px; left: 599px;">
                                        <img class="ngxImageZoomFull" src="assets/image/fullres.jpg"
                                                style="width: 650px; height: 401px; display: none; top: -24px; left: -599px;">
                                    </div>
                                </div>
                            </image-zoom>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
        .table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 1rem;
            background-color: transparent;
        }
        table {
            border-collapse: collapse;
        }
        .table td, .table th {
            padding: .75rem;
            vertical-align: top;
            border-top: 1px solid #dee2e6;
        }
        .ngxImageZoomContainer {
            position: relative;
            margin: auto;
            overflow: hidden;
        }
        img {
            vertical-align: middle;
            border-style: none;
        }
        .ngxImageZoomFullContainer {
            position: absolute;
            overflow: hidden;
        }
        .ngxImageZoomFull {
            position: absolute;
            max-width: none;
            max-height: none;
            display: none;
        }
    `]
})
export class ImageZoomDemoComponent implements OnInit {
    myThumbnail = 'https://wittlock.github.io/image-zoom/assets/thumb.jpg';
    myFullresImage = 'https://wittlock.github.io/image-zoom/assets/fullres.jpg';

    constructor() { }

    ngOnInit(): void { }
}
