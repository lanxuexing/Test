import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzStatisticValueType } from './statistic-definitions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:component-selector
  selector: 'nz-statistic',
  exportAs: 'nzStatistic',
  templateUrl: './statistic.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'ant-statistic'
  },
  styles: ['nz-statistic { display: block; }'],
  styleUrls: ['./statistic.component.less']
})
export class NzStatisticComponent {
  @Input() nzPrefix: string | TemplateRef<void>;
  @Input() nzSuffix: string | TemplateRef<void>;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzValue: NzStatisticValueType;
  @Input() nzValueStyle = {};
  @Input() nzValueTemplate: TemplateRef<{ $implicit: NzStatisticValueType }>;
}
