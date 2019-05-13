import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-card-loading',
  exportAs: 'nzCardLoading',
  templateUrl: './card-loading.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      nz-card-loading {
        display: block;
      }
    `
  ],
  styleUrls: ['./card.component.less']
})
export class NzCardLoadingComponent {
  constructor(elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-card-loading-content');
  }
}
