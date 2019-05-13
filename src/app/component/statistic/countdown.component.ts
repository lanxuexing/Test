import { Platform } from './platform.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { REFRESH_INTERVAL } from './statistic-definitions';
import { NzStatisticComponent } from './statistic.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:component-selector
  selector: 'nz-countdown',
  exportAs: 'nzCountdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./statistic.component.less']
})
export class NzCountdownComponent extends NzStatisticComponent implements OnInit, OnChanges, OnDestroy {
  // tslint:disable-next-line:no-inferrable-types
  @Input() nzFormat: string = 'HH:mm:ss';

  diff: number;

  private target: number;
  // tslint:disable-next-line:variable-name
  private updater_: Subscription | null;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private platform: Platform) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzValue) {
      this.target = Number(changes.nzValue.currentValue);
      if (!changes.nzValue.isFirstChange()) {
        this.syncTimer();
      }
    }
  }

  ngOnInit(): void {
    this.syncTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  syncTimer(): void {
    if (this.target >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer(): void {
    if (this.platform.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.stopTimer();
        this.updater_ = interval(REFRESH_INTERVAL).subscribe(() => {
          this.updateValue();
          this.cdr.detectChanges();
        });
      });
    }
  }

  stopTimer(): void {
    if (this.updater_) {
      this.updater_.unsubscribe();
      this.updater_ = null;
    }
  }

  /**
   * Update time that should be displayed on the screen.
   */
  protected updateValue(): void {
    this.diff = Math.max(this.target - Date.now(), 0);

    if (this.diff === 0) {
      this.stopTimer();
    }
  }
}
