# click-outsides

用于处理元素外部的单击事件的`Angular`指令。对于点击下拉菜单或模态对话框外部的反应非常有用。
就像绑定到`click`模板中的常规事件一样，您可以执行以下操作：

```HTML
<div (clickOutsides)="onClickedOutside($event)">My element</div>
```

## Usage

添加`ClickOutsidesModule`到模块导入列表：

```typescript
import { ClickOutsidesModule } from './click-outsides/click-outsides.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ClickOutsidesModule.forRoot()],
  bootstrap: [AppComponent]
})
class AppModule {}
```

然后，您可以在模板中使用该指令：

```typescript
@Component({
  selector: 'app',
  template: `
    <div (clickOutsides)="onClickedOutside($event)">Click outside this</div>
  `
})
export class AppComponent {
  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
  }
}
```

### Options

| 属性 | 类型 | 默认 | 描述 |
| ------------- | ---- | ------- | ----------- |
| `attachOutsideOnClick` | boolean | `false` | 默认情况下，会自动附加外部单击事件处理程序。显式设置此选项可`true`在单击元素后设置处理程序。外部点击事件处理程序将在外部点击发生后被删除。 |
| `clickOutsidesEnabled` | boolean | `true` | 启用指令。 |
| `clickOutsidesEvents` | string | `'click'` | 以逗号分隔的事件列表，用于触发器。例如，对于其他移动支持： `[clickOutsideEvents]="'click,touchstart'"`. |
| `delayClickOutsidesInit` | boolean | `false` | 延迟`click`外部处理程序的初始化。这可能有助于有条件地显示的项目。 |
| `emitOnBlur` | boolean | `false` | 如果启用，则当用户在应用程序窗口外单击时可以发出事件。如果页面包含`iframe`，则特别有用。 |
| `exclude` | string | | 在单击元素外部时要排除的以逗号分隔的`DOM`元素查询字符串。例如： `[exclude]="'button,.btn-primary'"`. |
| `excludeBeforeClick` | boolean | `false` | By default, `clickOutside` 默认情况下，`clickOutsides`寄存器在`init`上排除`DOM`元素。此属性在`clickOutsides`触发事件之前刷新列表。这对于确保排除`init`之后添加到`DOM`的排除元素非常有用。 |
