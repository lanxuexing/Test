# Multiselect Dropdown

Multiselect dropdown component 用于`Web`应用程序，易于集成和使用，它可以绑定到任何自定义数据源。

## Getting Started

## Features

- 具有`single/multiple`选择选项的下拉列表
- 绑定到任何自定义数据源
- 使用自定义占位符文本搜索项目
- 限制选择
- 选择/取消选择所有项目

### Installation

添加到你的模块

```ts
import { MultiSelectDropDownModule } from 'multiselect-dropdown';
// ...

@NgModule({
  imports: [
    MultiSelectDropDownModule.forRoot()
    // ...
  ]
  // ...
})
export class AppModule {}
```

### Usage

```ts
import { Component, OnInit } from '@angular/core';

export class AppComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
```

```html
<multiselect-dropdown
  [placeholder]="'custom placeholder'"
  [data]="dropdownList"
  [(ngModel)]="selectedItems"
  [settings]="dropdownSettings"
  (onSelect)="onItemSelect($event)"
  (onSelectAll)="onSelectAll($event)"
>
</multiselect-dropdown>
```

### Input

| 属性                        | 类型       | 描述                                                                                                                                                                                                                                                                                                                                              | 默认值       |
| :----------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ |
| singleSelection                | Boolean    | 组件的模式，如果设置`true`用户可以选择多个选项                                                                                                                                                                                                                                                                              | false                |
| placeholder                    | String     | 未选择任何项目时，在下拉列表中显示的文本。                                                                                                                                                                                                                                                                                             | 'Select'            |
| disabled                       | Boolean    | 禁用下拉列表                                                                                                                                                                                                                                                                                                                                     | false               |
| data                           | Array<any> | 要从中选择的项目数组。应该是具有`id`和`text`属性的对象数组。您还可以使用自定义属性。在这种情况下，您需要映射`idField`和`textField`属性。为方便起见，您还可以传递一个字符串数组，在这种情况下，`ID`和文本都使用相同的字符串（不需要映射） | n/a                 |
| idField                        | String     | 在自定义对象数组的情况下映射`id`字段                                                                                                                                                                                                                                                                                                           | 'id'                |
| textField                      | String     | 在自定义对象数组的情况下映射文本字段                                                                                                                                                                                                                                                                                                         | 'text'              |
| enableCheckAll                 | Boolean    | 启用该选项以选择列表中的所有项目                                                                                                                                                                                                                                                                                                            | false               |
| selectAllText                  | String     | 要显示为`select all`选项标签的文本                                                                                                                                                                                                                                                                                                        | Select All          |
| unSelectAllText                | String     | 要显示为`unSelect`选项标签的文本 option                                                                                                                                                                                                                                                                                                          | UnSelect All        |
| allowSearchFilter              | Boolean    | 为列表启用过滤器选项。                                                                                                                                                                                                                                                                                                                           | false
| searchPlaceholderText          | String     | 自定义搜索占位符                                                                                                                                                                                                                                                                                                                                | Search              |
| clearSearchFilter              | Boolean    | 清除搜索过滤器下拉关闭                                                                                                                                                                                                                                                                                                                           | true                |
| maxHeight                      | Number     | 设置下拉列表的最大高度(单位：px).                                                                                                                                                                                                                                                                                                           | 197                 |
| itemsShowLimit                 | Number     | 限制要在输入字段中显示的项目数。如果未设置将显示所有选中。                                                                                                                                                                                                                                                                 | All                 |
| limitSelection                 | Number     | 限制从下拉列表中选择的项目数。达到限制后，将禁用所有未选择的项目。                                                                                                                                                                                                                            | none                |
| searchPlaceholderText          | String     | 搜索占位符文本的自定义文本。默认值为`Search`                                                                                                                                                                                                                                                                             | 'Search'            |
| noDataAvailablePlaceholderText | String     | 没有数据时的自定义文本。                                                                                                                                                                                                                                                                                                                   | 'No data available' |
| closeDropDownOnSelection       | Boolean    | 选中项目时关闭下拉列表。仅适用于单一选择的`cas`                                                                                                                                                                                                                                                                    | false               |
| defaultOpen                    | Boolean    | 打开状态下拉列表                                                                                                                                                                                                                                                                                                                                   | false               |

### Output

- `onSelect` - 选中项目时返回所选项目。示例：(onSelect)="onItemSelect($event)"
- `onSelectAll` - 退回所有物品。示例：(onSelectAll)="onSelectAll($event)".
- `onDeSelect` - 取消选中项目时返回未选择的项目。示例：(onDeSelect)="onItemDeSelect($event)"
- `onFilterChange` - 返回按键。示例：(onFilterChange)="onFilterChange($event)"
- `onDropDownClose`- 示例：(onDropDownClose)="onDropDownClose()"
