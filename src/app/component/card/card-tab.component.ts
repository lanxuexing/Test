import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-card-tab',
  exportAs: 'nzCardTab',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-tab.component.html',
  styleUrls: ['./card.component.less']
})
export class NzCardTabComponent {
  @ViewChild(TemplateRef) template: TemplateRef<void>;
}
