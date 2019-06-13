import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
    selector: 'app-image-slider-demo',
    template: `
        <div class="margin-auto demo-div box-shadow" [ngStyle]="{'width':sliderWidth+'px', 'min-height': sliderImageHeight+'px'}">
            <image-slider *ngIf="showSlider" #nav
                [images]="imageObject"
                [infinite]="sliderInfinite"
                [imagePopup]="sliderImagePopup"
                [showArrow]="sliderArrowShow"
                [imageSize]="{width: sliderImageWidth, height: sliderImageHeight}"
                [autoSlide]="sliderAutoSlide ? 1 : 0"
                [slideImage]="+sliderSlideImage"
                [animationSpeed]="sliderAnimationSpeed"
                (imageClick)="imageOnClick($event)"
                (arrowClick)="arrowOnClick($event)"
                (lightboxArrowClick)="lightboxArrowClick($event)">
            </image-slider>
        </div>
        <p class="demo-title-sub margin-auto">PLAY WITH IT!</p>
        <table class="margin-auto box-shadow">
            <tr>
                <td colspan="2">
                    <label>Use Custom Arrow Buttons:</label>
                    <button type="button" (click)="prevImageClick()">Prev</button>
                    <button type="button" (click)="nextImageClick()">Next</button>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="block title">Responsive Slider:</label>
                    <small>Slider use parent element 100% width. Here we are setting parent element width</small>
                </td>
                <td>
                    <span class="input-icon input-icon-right">
                        <input type="number" min="325" max="1218" [value]="sliderWidth" [(ngModel)]="sliderWidth"
                        (change)="onChangeHandler()" />
                        <i>px</i>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="block title">Image Size:</label>
                    <small>Set slider images width and height. Pass object like &#123;width: 400, height: 300&#125;.</small>
                </td>
                <td>
                    <div class="size-div">
                        <span class="input-title">Width</span>
                        <span class="input-icon input-icon-right">
                            <input type="number" max="500" [value]="sliderImageWidth" [(ngModel)]="sliderImageWidth" />
                            <i>px</i>
                        </span>
                    </div>
                    <div class="size-div">
                        <span class="input-title">Height</span>
                        <span class="input-icon input-icon-right">
                            <input type="number" max="500" [value]="sliderImageHeight" [(ngModel)]="sliderImageHeight" />
                            <i>px</i>
                        </span>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="title block">Hide/Show Slider Arrow:</label>
                    <small>Can hide provided arrows buttons and use custom arrow.</small>
                </td>
                <td>
                    <label class="switch">
                        <input type="checkbox" checked [(ngModel)]="sliderArrowShow">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Infinate option:</label>
                </td>
                <td>
                    <label class="switch">
                        <input type="checkbox" (change)="onChangeHandler()" checked [(ngModel)]="sliderInfinite">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Image Popup option:</label>
                </td>
                <td>
                    <label class="switch">
                        <input type="checkbox" checked [(ngModel)]="sliderImagePopup">
                        <span class="slider round"></span>
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Image Auto Slide option:</label>
                </td>
                <td >
                    <label class="switch">
                        <input type="checkbox" (change)="onChangeHandler()" [(ngModel)]="sliderAutoSlide">
                        <span class="slider round"></span>
                    </label>
                    <small>(Note: Auto Slide will work only if <b>Infinate option</b> is <b>true)</b></small>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Animation Speed option:</label>
                </td>
                <td>
                    <input class="range-slider__range" type="range" [value]="sliderAnimationSpeed"
                    [(ngModel)]="sliderAnimationSpeed" min="0.1" max="5" step=".1" />
                    <span class="range-slider__value">{{sliderAnimationSpeed}}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <label class="block title">Slide Image at a time:</label>
                    <small>Set how many images will move on left/right arrow click.</small>
                </td>
                <td>
                    <select (change)="onChangeHandler()" [(ngModel)]="sliderSlideImage">
                        <option value="1">1 Image</option>
                        <option value="2">2 Images</option>
                        <option value="3">3 Images</option>
                    </select>
                </td>
            </tr>
        </table>
        <app-back></app-back>
    `,
    styles: [`
        .margin-auto {
            margin: 0px auto;
        }
        .demo-title-main {
            display: block;
            font-weight: bold;
        }
        .demo-title-sub {
            padding: 0 0 5px 0;
            font-weight: bold;
            width: 90%
        }
        .demo-div {
            padding: 10px 10px 10px 10px;
            box-sizing: border-box;
            border: 1px solid;
            border-color: #CFCFCF;
            margin-bottom: 20px;
        }
        .text-center {
            text-align: center;
        }
        .box-shadow {
            box-shadow: 0 2px 2px rgba(0,0,0,.24), 0 0 2px rgba(0,0,0,.12);
        }
        /* Toggle css */
        .switch {
            position: relative;
            display: inline-block;
            width: 36px;
            height: 14px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.38);
            -webkit-transition: .4s;
            transition: .4s;
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: -5px;
            bottom: -3px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)
        }
        input:checked+.slider {
            background-color: rgba(233,30,99,.5);
        }
        input:focus+.slider {
            box-shadow: 0 0 1px #e91e63;
        }
        input:checked+.slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
            background-color: #e91e63;
        }
        /* Rounded sliders */
        .slider.round {
            border-radius: 34px;
        }
        .slider.round:before {
            border-radius: 50%;
        }
        /* Range slider */
        .range-slider {
            width: 100%;
        }
        .range-slider__range {
            -webkit-appearance: none;
            width: 70%;
            height: 10px;
            border-radius: 5px;
            background: #d7dcdf;
            outline: none;
            padding: 0;
            margin: 0;
        }
        .range-slider__range::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #e91e63;
            cursor: pointer;
            transition: background 0.15s ease-in-out;
        }
        .range-slider__range::-webkit-slider-thumb:hover {
            background: #e91e63;
        }
        .range-slider__range:active::-webkit-slider-thumb {
            background: #e91e63;
        }
        .range-slider__range::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border: 0;
            border-radius: 50%;
            background: #e91e63;
            cursor: pointer;
            transition: background 0.15s ease-in-out;
        }
        .range-slider__range::-moz-range-thumb:hover {
            background: #e91e63;
        }
        .range-slider__range:active::-moz-range-thumb {
            background: #e91e63;
        }
        .range-slider__range:focus::-webkit-slider-thumb {
            box-shadow: 0 0 0 3px #fff, 0 0 0 6px rgba(233,30,99,.5);
        }
        .range-slider__value {
            display: inline-block;
            position: relative;
            width: 60px;
            color: #fff;
            line-height: 20px;
            text-align: center;
            border-radius: 3px;
            background: #e91e63;
            padding: 5px 10px;
            margin-left: 8px;
        }
        .range-slider__value:after {
            position: absolute;
            top: 8px;
            left: -7px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-right: 7px solid #e91e63;
            border-bottom: 7px solid transparent;
            content: '';
        }
        ::-moz-range-track {
            background: #d7dcdf;
            border: 0;
        }
        input::-moz-focus-inner,
        input::-moz-focus-outer {
            border: 0;
        }
        table {
            border-collapse: collapse;
            width: 90%;
        }
        table,
        th,
        td {
            border: 1px solid #ccc;
            height: 32px;
        }
        table td {
            padding-left: 8px;
        }
        table input {
            height: 26px;
        }
        .size-div {
            margin-bottom: 5px;
            display: inline-block;
            margin-left: 10px;
        }
        .size-div span.input-title {
            display: inline-block;
            width: 42px;
        }
        .size-div input {
            width: 75px;
        }
        .block {
            display: block;
        }
        .input-icon {
            position: relative;
            width: 80%;
        }
        .input-icon>i {
            position: absolute;
            display: block;
            transform: translate(0, -50%);
            top: 50%;
            pointer-events: none;
            width: 25px;
            text-align: center;
            font-style: normal;
            color: #888888;
        }
        .input-icon>input {
            padding-left: 25px;
            padding-right: 0;
        }
        .input-icon-right>i {
            right: 0;
        }
        .input-icon-right>input {
            padding-left: 0;
            padding-right: 25px;
            text-align: right;
        }
        select {
            width: 50%;
            height: 30px;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class ImageSliderDemoComponent implements OnInit {
    @ViewChild('nav') ds: ImageSliderDemoComponent;
    title = 'Ng Image Slider';
    showSlider = true;

    sliderWidth = 940;
    sliderImageWidth = 300;
    sliderImageHeight = 225;
    sliderArrowShow = true;
    sliderInfinite = false;
    sliderImagePopup = true;
    sliderAutoSlide = false;
    sliderSlideImage = 1;
    sliderAnimationSpeed: any = 1;
    imageObject: Array<object> = [];

    constructor() {
        this.setImageObject();
    }

    ngOnInit(): void { }

    onChangeHandler() {
        this.setImageObject();
        this.showSlider = false;
        setTimeout(() => {
            this.showSlider = true;
        }, 10);
    }

    setImageObject() {
        this.imageObject = [{
            video: 'https://youtu.be/tYa6OLQHrEc',
            title: 'Youtube example one with title.'
        }, {
            video: 'https://youtu.be/6pxRHBw-k8M'
        }, {
            video: 'assets/video/movie.mp4',
            title: 'MP4 Video example one with title and No Poster-Image.'
        }, {
            video: 'assets/video/movie2.mp4',
            posterImage: 'assets/img/slider/2_min.jpeg',
            title: 'MP4 Video exmaple two with Poster-Image.'
        }, {
            image: 'assets/img/slider/4.jpg',
            thumbImage: 'assets/img/slider/4_min.jpeg',
            title: 'Most beautiful birds in the world flying.'
        }, {
            image: 'assets/img/slider/5.jpg',
            thumbImage: 'assets/img/slider/5_min.jpeg'
        }, {
            image: 'assets/img/slider/6.jpg',
            thumbImage: 'assets/img/slider/6_min.jpeg'
        }, {
            image: 'assets/img/slider/7.jpg',
            thumbImage: 'assets/img/slider/7_min.jpeg'
        }, {
            image: 'assets/img/slider/8.jpg',
            thumbImage: 'assets/img/slider/8_min.jpeg'
        }, {
            image: 'assets/img/slider/9.jpg',
            thumbImage: 'assets/img/slider/9_min.jpeg'
        }];
    }

    imageOnClick(index) {
        console.log('index', index);
    }

    arrowOnClick(event) {
        console.log('arrow click event', event);
    }

    lightboxArrowClick(event) {
        console.log('popup arrow click', event);
    }

    prevImageClick() {
        (this.ds as any).prev();
    }

    nextImageClick() {
        (this.ds as any).next();
    }
}
