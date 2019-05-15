import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { InputBoolean } from './collapes.util';

import { NzCollapsePanelComponent } from './collapse-panel.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-collapse',
  exportAs: 'nzCollapse',
  templateUrl: './collapse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      nz-collapse {
        display: block;
      }
    `
  ],
  styleUrls: ['./collapes.component.less'],
})
export class NzCollapseComponent {
  private listOfNzCollapsePanelComponent: NzCollapsePanelComponent[] = [];
  @Input() @InputBoolean() nzAccordion = false;
  @Input() @InputBoolean() nzBordered = true;

  addPanel(value: NzCollapsePanelComponent): void {
    this.listOfNzCollapsePanelComponent.push(value);
  }

  removePanel(value: NzCollapsePanelComponent): void {
    this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
  }

  click(collapse: NzCollapsePanelComponent): void {
    if (this.nzAccordion && !collapse.nzActive) {
      this.listOfNzCollapsePanelComponent
        .filter(item => item !== collapse)
        .forEach(item => {
          if (item.nzActive) {
            item.nzActive = false;
            item.nzActiveChange.emit(item.nzActive);
            item.markForCheck();
          }
        });
    }
    collapse.nzActive = !collapse.nzActive;
    collapse.nzActiveChange.emit(collapse.nzActive);
  }
}
