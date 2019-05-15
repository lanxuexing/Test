import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean } from './collapes.util';

import { NzCollapseComponent } from './collapse.component';
import { collapseMotion } from './collapse.animate';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-collapse-panel',
  exportAs: 'nzCollapsePanel',
  templateUrl: './collapse-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [collapseMotion],
  styles: [
    `
      nz-collapse-panel {
        display: block;
      }
    `
  ],
  styleUrls: ['./collapes.component.less'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.ant-collapse-no-arrow]': '!nzShowArrow'
  }
})
export class NzCollapsePanelComponent implements OnInit, OnDestroy {
  @Input() @InputBoolean() @HostBinding('class.ant-collapse-item-active') nzActive = false;
  @Input() @InputBoolean() @HostBinding('class.ant-collapse-item-disabled') nzDisabled = false;
  @Input() @InputBoolean() nzShowArrow = true;
  @Input() nzExtra: string | TemplateRef<void>;
  @Input() nzHeader: string | TemplateRef<void>;
  @Input() nzExpandedIcon: string | TemplateRef<void>;
  @Output() readonly nzActiveChange = new EventEmitter<boolean>();

  clickHeader(): void {
    if (!this.nzDisabled) {
      this.nzCollapseComponent.click(this);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    @Host() private nzCollapseComponent: NzCollapseComponent,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-collapse-item');
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addPanel(this);
  }

  ngOnDestroy(): void {
    this.nzCollapseComponent.removePanel(this);
  }
}
