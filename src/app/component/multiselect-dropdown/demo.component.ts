import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from './multiselect.model';

@Component({
    selector: 'app-multiselect-dropdown-demo',
    template: `
        <div class="container">
            <multiselect-dropdown
                name="city"
                [placeholder]="'请选择...'"
                [data]="cities"
                [(ngModel)]="selectedItems"
                [disabled]="disabled"
                [settings]="dropdownSettings"
                (onDropDownClose)="onDropDownClose()"
                (onSelect)="onItemSelect($event)"
                (onDeSelect)="onItemDeSelect($event)"
                (onSelectAll)="onSelectAll($event)">
            </multiselect-dropdown>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .container {
            margin-top: 40px;
        }
    `]
})
export class MultiselectDropdownDemoComponent implements OnInit {
    disabled = false;
    ShowFilter = true;
    showAll = true;
    selectedItems: Array<any> = [];
    cities: Array<any> = [];
    dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        defaultOpen: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: '全选',
        unSelectAllText: '取消全选',
        searchPlaceholderText: '请输入检索关键字...',
        enableCheckAll: this.showAll,
        itemsShowLimit: 3,
        allowSearchFilter: this.ShowFilter
    };

    constructor() { }

    ngOnInit(): void {
        this.cities = [
            { item_id: 1, item_text: 'Kotlin' },
            { item_id: 2, item_text: 'Swift' },
            { item_id: 3, item_text: 'Dart' },
            { item_id: 4, item_text: 'Java' },
            { item_id: 5, item_text: 'JavaScript' },
            { item_id: 6, item_text: 'Android' },
            { item_id: 7, item_text: 'Angular' },
            { item_id: 8, item_text: 'React' },
            { item_id: 9, item_text: 'Vue' },
            { item_id: 10, item_text: 'Flutter' },
            { item_id: 11, item_text: 'React Native' },
            { item_id: 12, item_text: 'Fuchsia' }
        ];
        this.selectedItems = [{ item_id: 4, item_text: 'Java' }, { item_id: 6, item_text: 'Android' }];
    }

    onDropDownClose() {
        console.log('dropdown closed');
    }

    onItemSelect(item: any) {
        console.log('onItemSelect', item);
    }

    onItemDeSelect(item: any) {
        console.log('onItemDeSelect', item);
    }

    onSelectAll(items: any) {
        console.log('onSelectAll', items);
    }
}
