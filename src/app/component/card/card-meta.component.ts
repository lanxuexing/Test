import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-card-meta',
  exportAs: 'nzCardMeta',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './card-meta.component.html',
  styles: [
    `
      nz-card-meta {
        display: block;
      }
    `
  ],
  styleUrls: ['./card.component.less']
})
export class NzCardMetaComponent {
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzDescription: string | TemplateRef<void>;
  @Input() nzAvatar: TemplateRef<void>;

  constructor(elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-card-meta');
  }
}
