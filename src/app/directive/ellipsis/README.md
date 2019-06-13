# ellipsis

如果包含的文本溢出，则提供显示省略号的指令。仅支持文本（没有`html`内容）！

## Installation

将模块添加到你的 `app.module.ts`:

```typescript
import { EllipsisModule } from './ellipsis/ellipsis.module';

// ...

@NgModule({
  // ...
  imports: [
    // ...
    EllipsisModule.forRoot(),
  ]
  // ...
})
export class AppModule {}

```

## Usage

模板中的任何位置：

```html
<div style="width: 100px; height: 100px;" ellipsis>Your very long text</div>

<!-- 或动态内容: -->
<div style="width: 100px; height: 100px;" ellipsis [ellipsis-content]="yourDynamicContent"></div>
```

### Extra options

您可以添加以下属性来更改指令的行为：

| 属性 | 含义 |
| ---- | ---- |
| __ellipsis__ | `required`如果传递属性值（例如`ellipsis="More ..."`），则可以覆盖将附加的文本，如果需要截断文本（默认值：`"..."`）|
| __ellipsis-content__ | 使用该动态内容，这将受到异步变化（如: `[ellipsis-content]="myVar"`) |
| __ellipsis-word-boundaries__ | 如果传递此属性，则文本不会仅截断任何字符，而只会截断属性值中的字符。例如: `ellipsis-word-boundaries=" \n"` 允许文本仅在空格和换行符处中断 |
| __ellipsis-resize-detection__ | 如何检测调整大小事件 - 这些是可能的值：
<ul>
  <li>__element-resize-detector__: 默认使用`element-resize-detector`及其`scroll`策略。</li>
  <li>__element-resize-detector-object__: 不建议使用`element-resize-detector`及其`object`策略</li>
  <li>__window__: 仅使用angular的内置功能检查整个窗口是否已调整大小/更改方向`HostListener`（可能性能更好，但显然不会在`javascript`直接或间接引起的调整大小时触发。）</li>
</ul> |
| __ellipsis-click-more__ | 事件发射器 - 如果设置，`ellipsis`属性定义的文本将转换为可单击的链接。例如，当用户点击链接时，`(ellipsis-click-more)="moreClicked()"`将调用组件的moreClicked()方法。|
