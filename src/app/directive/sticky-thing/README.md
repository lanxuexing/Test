# Sticky Things

一个`Angular`指令，当用户滚动时，使事情变得粘滞。

## Requirements

* Angular (需要`Angular 4.x`或更高)
* 支持所有主流浏览器和`IE9`及更高版本（可能不支持较低版本）

## Features

* 粘住所有的东西！
* 超级顺畅！
* 在现实世界的项目中测试
* 支持`Angular Universal`
* 切换到粘滞模式时防止页面跳转
* 纯`Angular`解决方案

## Import

导入模块

```typescript
import { StickyThingModule } from './sticky-thing/sticky-thing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    StickyThingModule.forRoot()
  ],
  providers: [],
})
export class SomeModule { }
```

## Usage

```html
<div #spacer></div>
<div stickyThing [spacer]="spacer">
  I am sticky!
</div>
```

## 滚动容器

默认情况下，`Sticky Things`希望你的身体成为滚动的元素。但是，如果在`overflow`容器中使用`Sticky Things`，则必须使该容器知道该容器。

最好使用查询选择器。如果提供了一个字符串，它将被调用`document.querySelector`。相反，也可以提供`HTML`元素（`nativeElement`）。

```html
<div class="scroll-container">
  <div #spacer></div>
  <div [spacer]="spacer" stickyThing="" [scrollContainer]="'.scroll-container'">
    Scroll by!
  </div>
</div>
```

## 边界元素

如果定义了边界元素，则粘性元素仅在边界元素的高度内滚动，然后停止。如果您有多个粘性元素，这很有用，因为它可以防止堆叠。

```html
<div #boundary style="height:1000px;">
  <div #spacer></div>
  <div stickyThing [spacer]="spacer" [boundary]="boundary">
    I am sticky but only inside #boundary!
  </div>
</div>
```

提示：边界特征仍处于测试阶段 - 可能会发生位置错误！

## 间隔

间隔不是必需的，但是当粘性效果进入时会阻止页面跳转。

## 启用

`enable`（默认`true`）输入可用于动态地激活或去激活粘指令（例如仅具有在特定条件下发粘的`Navbar`）。

```html
<div #spacer></div>
<div stickyThing [spacer]="spacer" [enable]="enableSticky">
  I can become sticky only when enableSticky is true!
</div>
```

## 边距

一个`marginTop`（默认`0`）输入可用于一些顶级的间距增加了脱胶，如果你不希望它在上面贴权。它期望`number`您想要用于空间的像素。

```html
<div #boundary style="height:1000px;">
  <div #spacer></div>
  <div stickyThing [spacer]="spacer" marginTop="30">
    I leave 30px of space to the top when I'm sticky!
  </div>
</div>
```
