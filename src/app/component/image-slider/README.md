# Image Slider with Lightbox

An Angular responsive image slider with lightbox popup.
Also support youtube and mp4 video urls.

## Setup

**Import module in your `app.module.ts`:**

```typescript
import { ImageSliderModule } from './image-slider/image-slider.module';
...

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        ImageSliderModule.forRoot(),
        ...
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}

```

**Add component in your template file.**

```html
<ng-image-slider [images]="imageObject" #nav></ng-image-slider>
```

**ImageObject format.**

```js
imageObject: Array<object> = [
    {
        image: 'assets/img/slider/1.jpg',
        thumbImage: 'assets/img/slider/1_min.jpeg',
    }
];
```

**Image, Youtube and MP4 url's object format.**

 ```js
imageObject: Array<object> = [{
        video: 'https://youtu.be/6pxRHBw-k8M',
        title: 'Video with title',
        posterImage: 'assets/img/slider/2_min.jpeg',
        thumbImage: 'assets/img/slider/1_min.jpeg',
        image: 'assets/img/slider/1.jpg',
    },
    ...
];
```

## optional

| 名称 | 类型 | 数据类型| 描述 | 默认 |
|------|------|-----------|-------------|---------|
| infinite | @Input  | boolean   | 如果值为`true`，则为无限滑动图像. | false |
| imagePopup | @Input  | boolean | 在滑块图像上单击启用图像`lightBox`弹出选项. | true |
| animationSpeed | @Input  | number | 通过此用户可以设置滑块动画速度。最小值为`0.1`秒，最大值为`5`秒 | 1 |
| slideImage | @Input | number | 设置左/右箭头单击时将移动的图像数量. | 1 |
| imageSize | @Input | object | 设置滑块图像的宽度和高度 `{width: 400, height: 300}` | `{width: 205, height: 200}` |
| autoSlide | @Input | number | 根据提供的时间自动滑动图像。仅当无限选项为真时，选项才有效。最小值为`1`秒，最大值为`5`秒. | 0 |
| showArrow | @Input | boolean | 隐藏/显示滑块箭头按钮 | true |
| direction | @Input | string | 设置文字方向。你可以传递 **rtl** / **ltr** / **auto** | ltr |
| imageClick | @Output | n/a | 在滑块图像上单击事件时执行。返回图像索引. | n/a |
| arrowClick | @Output | n/a | 单击滑块左/右箭头时执行. | n/a |
| lightboxArrowClick | @Output | n/a | 单击`Lightbox`下一个/上一个箭头时执行. | n/a |

## Add custom navigation button

```typescript
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
    selector: 'sample',
        template:`
        <ng-image-slider [images]="imageObject" #nav>
        </ng-image-slider>
        <button (click)="prevImageClick()">Prev</button>
        <button (click)="nextImageClick()">Next</button>
        `
})
class Sample {
    @ViewChild('nav') slider: NgImageSliderComponent;
    imageObject = [{...}]
  
    prevImageClick() {
        this.slider.prev();
    }
    nextImageClick() {
        this.slider.next();
    }
}
```
