import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[clickOutsides]' })
export class ClickOutsidesDirective implements OnInit, OnChanges, OnDestroy {

  @Input() clickOutsidesEnabled = true;

  @Input() attachOutsideOnClick = false;
  @Input() delayClickOutsidesInit = false;
  @Input() emitOnBlur = false;

  @Input() exclude = '';
  @Input() excludeBeforeClick = false;

  @Input() clickOutsidesEvents = '';

  @Output() clickOutsides: EventEmitter<Event> = new EventEmitter<Event>();

  // tslint:disable-next-line:variable-name
  private _nodesExcluded: Array<HTMLElement> = [];
  // tslint:disable-next-line:variable-name
  private _events: Array<string> = ['click'];

  constructor(
      // tslint:disable-next-line:variable-name
      private _el: ElementRef,
      // tslint:disable-next-line:variable-name
      private _ngZone: NgZone,
      @Inject(PLATFORM_ID) private platformId: object) {
    this._initOnClickBody = this._initOnClickBody.bind(this);
    this._onClickBody = this._onClickBody.bind(this);
    this._onWindowBlur = this._onWindowBlur.bind(this);
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) { return; }

    this._init();
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) { return; }

    this._removeClickOutsidesListener();
    this._removeAttachOutsideOnClickListener();
    this._removeWindowBlurListener();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!isPlatformBrowser(this.platformId)) { return; }

    if (changes.attachOutsideOnClick || changes.exclude || changes.emitOnBlur) {
      this._init();
    }
  }

  private _init() {
    if (this.clickOutsidesEvents !== '') {
      this._events = this.clickOutsidesEvents.split(',').map(e => e.trim());
    }

    this._excludeCheck();

    if (this.attachOutsideOnClick) {
      this._initAttachOutsideOnClickListener();
    } else {
      this._initOnClickBody();
    }

    if (this.emitOnBlur) {
      this._initWindowBlurListener();
    }
  }

  private _initOnClickBody() {
    if (this.delayClickOutsidesInit) {
      setTimeout(this._initClickOutsidesListener.bind(this));
    } else {
      this._initClickOutsidesListener();
    }
  }

  private _excludeCheck() {
    if (this.exclude) {
      try {
        const nodes = Array.from(document.querySelectorAll(this.exclude)) as Array<HTMLElement>;
        if (nodes) {
          this._nodesExcluded = nodes;
        }
      } catch (err) {
        console.error('[ng-click-outside] Check your exclude selector syntax.', err);
      }
    }
  }

  private _onClickBody(ev: Event) {
    if (!this.clickOutsidesEnabled) { return; }

    if (this.excludeBeforeClick) {
      this._excludeCheck();
    }

    if (!this._el.nativeElement.contains(ev.target) && !this._shouldExclude(ev.target)) {
      this._emit(ev);

      if (this.attachOutsideOnClick) {
        this._removeClickOutsidesListener();
      }
    }
  }

  private _onWindowBlur(ev: Event) {
    setTimeout(() => {
      if (!document.hidden) {
        this._emit(ev);
      }
    });
  }

  private _emit(ev: Event) {
    if (!this.clickOutsidesEnabled) { return; }

    this._ngZone.run(() => this.clickOutsides.emit(ev));
  }

  private _shouldExclude(target): boolean {
    for (const excludedNode of this._nodesExcluded) {
      if (excludedNode.contains(target)) {
        return true;
      }
    }

    return false;
  }

  private _initClickOutsidesListener() {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => document.body.addEventListener(e, this._onClickBody));
    });
  }

  private _removeClickOutsidesListener() {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => document.body.removeEventListener(e, this._onClickBody));
    });
  }

  private _initAttachOutsideOnClickListener() {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => this._el.nativeElement.addEventListener(e, this._initOnClickBody));
    });
  }

  private _removeAttachOutsideOnClickListener() {
    this._ngZone.runOutsideAngular(() => {
      this._events.forEach(e => this._el.nativeElement.removeEventListener(e, this._initOnClickBody));
    });
  }

  private _initWindowBlurListener() {
    this._ngZone.runOutsideAngular(() => {
      window.addEventListener('blur', this._onWindowBlur);
    });
  }

  private _removeWindowBlurListener() {
    this._ngZone.runOutsideAngular(() => {
      window.removeEventListener('blur', this._onWindowBlur);
    });
  }

}
