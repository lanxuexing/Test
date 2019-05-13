import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nz-tab-body]',
  exportAs: 'nzTabBody',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tab-body.component.html',
  styleUrls: ['./tab.component.less'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.ant-tabs-tabpane-active]': 'active',
    '[class.ant-tabs-tabpane-inactive]': '!active'
  }
})
export class NzTabBodyComponent {
  @Input() content: TemplateRef<void>;
  @Input() active = false;
  @Input() forceRender = false;
}
