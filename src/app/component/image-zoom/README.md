# image-zoom

## input

除*thumbImage* 之外的所有设置都是可选的。如果没有*fullImage*提供了 thumbImage 也会被用作高分辨率版本。

input | 默认值&#160; | 描述
:---:|:---:|---
thumbImage | *none* | (Required) 当用户没有交互时将显示的较小版本的图像。
fullImage | *none* | 缩放时要使用的图像的完整分辨率版本。如果没有提供，将使用 thumbImage。
magnification | 1 | 默认情况下要使用的缩放系数。1 表示我们在其实际分辨率下使用 fullImage。
zoomMode | 'hover' | 缩放模式使用，这些在下表中解释。
enableScrollZoom | false | 如果在将鼠标悬停在图像上以调整放大倍率时应捕获鼠标滚轮，则切换 boolean 值。
scrollStepSize | 0.1 | 使用滚动缩放时，此设置确定每个滚动更改缩放的步数。
enableLens | false | 如果启用，只有鼠标光标周围的一小部分实际上会放大而不是整个图像区域。
lensWidth | 100 | 镜头的宽度，如果启用。
lensHeight | 100 | 镜头高度，如果启用。
circularLens | false | 使镜头圆形而不是方形。如果宽度和高度相等，这只会看起来很好。
minZoomRatio | *baseRatio* | 启用 scrollZoom 可以应用多少缩放的下限。请参阅下文了解详情。
maxZoomRatio | 2 | 启用 scrollZoom 可以应用多少缩放的上限。请参阅下文了解详情。
scrollParentSelector | *none* | 父滚动视图的选择器作为字符串。当滚动视图不是主窗口时，这避免了光标的缩放间隙。示例：'＃scrolling-frame'

### 缩放模式 (Zoom modes)

模式 | 描述
:---:|---
hover | 只要鼠标光标在缩略图上移动，它就会显示缩放的图像，直到它离开缩略图。
click | 与悬停类似，但只有在用户单击图像时才会开始缩放。将光标移离图像会再次禁用它。
toggle | 单击图像将缩放光标点。再次单击将恢复小图像。
hover-freeze | 首先单击启用悬停模式，第二次单击冻结缩放图像，第三次单击恢复缩略图。

### 缩放比例 (Zoom ratio)

*minZoomRatio* 和*maxZoomRatio* 设置中使用的缩放比率是指缩略图和完整尺寸图像的相对大小。所述*baseRatio*默认值是所计算的比率，这将使在尺寸缩放图像等于所述缩略图。例如，如果全尺寸图像比缩略图大 10x，则*minZoomRatio* 将默认为*0.1*，因为在全尺寸图像中，最小尺寸图像可以显示为原始尺寸的*0.1*倍。为默认值*maxZoomRatio*为*1*意味着全尺寸图像会出现最大的是原来的两倍。

## output

该组件输出可以触发的跟随事件。

output&#160; | 描述
:---:|---
onZoomScroll | 每当用户使用滚轮更改缩放级别时，此事件将以当前缩放比率触发（参见上文）。
onZoomPosition | 当变焦聚焦的位置发生变化时，此事件会发出一个*Coord*事件（从模块导出的界面），其中*X / Y*（以像素为单位）相对缩略图位于左上角。实际上每当用户将鼠标光标移动到图像上时。

## Using this library

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxImageZoomModule.forRoot() // <-- Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use its component in your Angular application:

```xml
<!-- You can now use ImageZoom component in app.component.html -->
<h1>
  {{title}}
</h1>
<ngx-image-zoom
    [thumbImage]=myThumbnail
    [fullImage]=myFullresImage
></ngx-image-zoom>
```
