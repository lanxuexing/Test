import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { fadeMotion } from './back-top.animate';
import { toNumber } from './back-top.util';
import { NzScrollService } from './scroll.service';
import { Platform } from './platform.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nz-back-top',
  exportAs: 'nzBackTop',
  animations: [fadeMotion],
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzBackTopComponent implements OnInit, OnDestroy {
  private scroll$: Subscription | null = null;
  private target: HTMLElement | null = null;

  // tslint:disable-next-line:no-inferrable-types
  visible: boolean = false;

  @Input() nzTemplate: TemplateRef<void>;

  // tslint:disable-next-line:no-inferrable-types
  private visibilityHeight: number = 400;

  @Input()
  set nzVisibilityHeight(value: number) {
    this.visibilityHeight = toNumber(value, 400);
  }

  get nzVisibilityHeight(): number {
    return this.visibilityHeight;
  }

  @Input()
  set nzTarget(el: string | HTMLElement) {
    this.target = typeof el === 'string' ? this.doc.querySelector(el) : el;
    this.registerScrollEvent();
  }

  @Output() readonly nzClick: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private scrollSrv: NzScrollService,
    // tslint:disable-next-line:no-any
    @Inject(DOCUMENT) private doc: any,
    private platform: Platform,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.scroll$) {
      this.registerScrollEvent();
    }
  }

  clickBackTop(): void {
    this.scrollSrv.scrollTo(this.getTarget(), 0);
    this.nzClick.emit(true);
  }

  private getTarget(): HTMLElement | Window {
    return this.target || window;
  }

  private handleScroll(): void {
    if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight) {
      return;
    }
    this.visible = !this.visible;
    this.cd.markForCheck();
  }

  private removeListen(): void {
    if (this.scroll$) {
      this.scroll$.unsubscribe();
    }
  }

  private registerScrollEvent(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.removeListen();
    this.handleScroll();
    this.scroll$ = fromEvent(this.getTarget(), 'scroll')
      .pipe(
        throttleTime(50),
        distinctUntilChanged()
      )
      .subscribe(() => this.handleScroll());
  }

  ngOnDestroy(): void {
    this.removeListen();
  }
}
