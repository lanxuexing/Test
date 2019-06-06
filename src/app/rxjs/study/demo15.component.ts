import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent } from 'rxjs';
import { debounceTime, filter, map, switchMap, retry } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo15',
    template: `
        <h3>Rxjs Demo15 To Study! -- 简易Auto Complete实例</h3>
        <div class="autocomplete">
            <input class="input" type="search" autocomplete="off" [(ngModel)]="inputValue" #searchInput>
            <ul class="suggest" #suggestList>
            </ul>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        .autocomplete {
            position: relative;
            display: inline-block;
            margin: 20px;
        }
        .input {
            width: 200px;
            border: none;
            border-bottom: 1px solid black;
            padding: 0;
            line-height: 24px;
            font-size: 16px;
        }
        .input:focus {
            outline: none;
            border-bottom-color: blue;
        }
        .suggest {
            width: 200px;
            list-style: none;
            padding: 0;
            margin: 0;
            -webkit-box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .suggest li {
            cursor: pointer;
            padding: 5px;
        }
        .suggest li:hover {
            background-color: lightblue;
        }
    `]
})
export class RxjsDemo15Component implements OnInit {
    url = 'https://zh.wikipedia.org/w/api.php?action=opensearch&format=json&limit=5&origin=*';
    @ViewChild('searchInput') searchInput: ElementRef<HTMLElement>;
    @ViewChild('suggestList') suggestList: ElementRef<HTMLElement>;
    inputValue = '';

    constructor() {
        /**
         * 实现步骤：
         * 1. 准备input#search 以及ul#suggest-list 的HTML 与CSS
         * 2. 在input#search 输入文字时，等待100 毫秒再无输入，就发送HTTP Request
         * 3. 当Response 还没回来时，使用者又输入了下一个文字就舍弃前一次的并再发送一次新的Request
         * 4. 接受到Response 之后显示建议选项
         * 5. 鼠标点击后取代input#search 的文字
         */
    }

    ngOnInit(): void {
        const keyword = fromEvent(this.searchInput.nativeElement, 'input');
        const selectItem = fromEvent(this.suggestList.nativeElement, 'click');
        keyword.pipe(
            filter((e: Event) => (e.target as HTMLInputElement).value.length > 2), // 大于两个字的时候开始检索
            debounceTime(100),
            switchMap(
                (e: Event) => from(this.getSuggestList((e.target as HTMLInputElement).value)).pipe(
                    retry(3) // 接口若是调用失败，则重试三次
                ),
                (e, res) => res[1]
            )
        ).subscribe(list => this.render(list));
        selectItem.pipe(
            filter((e: Event) => (e.target as HTMLElement).matches('li')),
            map((e: Event) => (e.target as HTMLElement).innerText)
        ).subscribe(text => {
            this.inputValue = text;
            this.render();
        });
    }

    getSuggestList(keyword) {
        return fetch(this.url + '&search=' + keyword, { method: 'GET', mode: 'cors' }).then(res => res.json());
    }

    render(suggestArr = []) {
        this.suggestList.nativeElement.innerHTML = suggestArr.map(item => {
            return `<li>${item}</li>`;
        }).join('');
    }
}
