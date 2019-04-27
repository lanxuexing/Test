import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, ContentChild, ElementRef, Input, Renderer2, TemplateRef, ViewChild } from '@angular/core';


export const fadeAnimation: AnimationTriggerMetadata = trigger(
  'fadeAnimation', [
    state('true', style({
      opacity: 0,
      display: 'none'
    })),
    state('false', style({
      opacity: 1,
      display: 'block'
    })),
    transition('* => *', animate(`250ms ease-in-out`)),
  ]);

export interface Shape { width: number; height: number; }

@Component({
  selector: 'app-tooltip',
  template: `
    <div style="position: relative; display: inline-block;">
      <div [class]="'app-tooltip__popper is-' + effect + ' ' + popperClass"
        style="left: -20000px; top: 0; position: absolute;"
        [@fadeAnimation]="!showPopper" [attr.x-placement]="xPlacement" #popperContent>
        <div x-arrow class="popper__arrow" [hidden]="!visibleArrow"></div>
        <ng-template [ngTemplateOutlet]="tip"></ng-template>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss'],
  animations: [fadeAnimation],
})

// tslint:disable-next-line:component-class-suffix
export class Tooltip implements AfterContentInit {

  @Input() set disabled(val: boolean) {   // todo, is discarded.
    console.warn('Element Angular: (disabled) is discarded, use [elDisabled] replace it.');
  }
  @Input() elDisabled = false;
  @Input() watch = false;
  @Input() placement = 'bottom';
  @Input() popperClass: string;
  @Input() effect = 'dark';
  // tslint:disable-next-line:no-input-rename
  @Input('visible-arrow') visibleArrow = true;
  @ViewChild('popperContent') popperContent: ElementRef;
  @ContentChild('tip') tip: TemplateRef<any>;

  xPlacement = 'bottom';
  showPopper = true;
  cache: any = {};
  tipElementShape: Shape;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
  }

  // get rect
  getPosition(hostRect: any, selfRect: any): void {
    const doubleConventions: boolean = this.placement.includes('-');
    const arrowDir: string = doubleConventions ? this.placement.split('-')[1] : 'center';
    const dir: string = doubleConventions ? this.placement.split('-')[0] : this.placement;
    const position: any = this.getPositionForDir(hostRect, selfRect, dir, arrowDir);
    this.cache.position = position;
    this.cache.hostRect = hostRect;
  }

  setPopoerPositionAndShow(): void {
    const { tipElement, position } = this.cache;
    const arrowElement: Element = tipElement.querySelector('.popper__arrow');
    this.xPlacement = position.arrowFace;
    this.renderer.setStyle(tipElement, 'left', `${position.left}px`);
    this.renderer.setStyle(tipElement, 'top', `${position.top}px`);

    // fix tipbox auto wrap
    this.renderer.setStyle(tipElement, 'width', `${this.tipElementShape.width}px`);
    this.renderer.setStyle(tipElement, 'height', `${this.tipElementShape.height}px`);
    this.renderer.setStyle(arrowElement, position.arrowDir, `${position.arrowPosition}px`);
  }

  bindEvent(host: HTMLElement): void {
    host.addEventListener('mouseenter', () => {
      if (this.elDisabled) { return; }
      this.setPopoerPositionAndShow();
      this.showPopper = true;
    });
    host.addEventListener('mouseleave', () => {
      this.showPopper = false;
      // tslint:disable-next-line:no-unused-expression
      this.watch && this.update();
    });
  }

  update(): void {
    const { tipElement, hostRect } = this.cache;
    this.renderer.setStyle(tipElement, 'width', 'auto');
    this.renderer.setStyle(tipElement, 'height', 'auto');
    setTimeout(() => {
      this.tipElementShape = this.getRealShape(tipElement);
      const tipRect = { width: tipElement.offsetWidth, height: tipElement.offsetHeight };
      this.getPosition(hostRect, tipRect);
      this.renderer.setStyle(tipElement, 'width', `${this.tipElementShape.width}px`);
      this.renderer.setStyle(tipElement, 'height', `${this.tipElementShape.height}px`);
    }, 0);
  }

  ngAfterContentInit(): void {
    const tipElement: HTMLElement = this.popperContent.nativeElement;
    const hostElement: HTMLElement = this.el.nativeElement.children[0];
    this.bindEvent(hostElement);
    this.cache.tipElement = tipElement;

    const timer = setTimeout(() => {
      this.tipElementShape = this.getRealShape(tipElement);
      const tipRect = { width: tipElement.offsetWidth, height: tipElement.offsetHeight };
      const hostRect = hostElement.getBoundingClientRect();
      this.getPosition(hostRect, tipRect);
      clearTimeout(timer);
    }, 0);
  }

  getCSSStyleVal(val: string | null | number, parentNum: number): number {
    if (!val) { return 0; }
    const str = String(val);
    const strVal = str.includes('px') ? str.split('px')[0] :
      str.includes('%') ? Number(str.split('%')[0]) * parentNum * 0.01 : str;
    return Number.isNaN(Number(strVal)) ? 0 : Number(strVal);
  }

  getRealShape(el: HTMLElement) {
    const rect: any = el.getBoundingClientRect();
    const { width, height } = window.getComputedStyle(el);
    return {
      width: this.getCSSStyleVal(width, rect.width),
      height: this.getCSSStyleVal(height, rect.height),
    };
  }

  getPositionForDir = (
    hostRect: ClientRect,
    selfRect: any,
    dir: string,
    arrowDir: string
  ): any => {
    const diffWidth: number = hostRect.width - selfRect.width;
    const diffHeight: number = selfRect.height - hostRect.height;
    const topMap: any = {
      top: - 10 - selfRect.height,
      bottom: hostRect.height,
      left: arrowDir === 'start' ? 0 : arrowDir === 'end' ? 0 - diffHeight : 0 - Math.abs(diffHeight / 2),
      right: arrowDir === 'start' ? 0 : arrowDir === 'end' ? 0 - diffHeight : 0 - Math.abs(diffHeight / 2),
    };

    const leftMap: any = {
      left: - 10 - selfRect.width,
      right: hostRect.width,
      top: arrowDir === 'start' ? 0 : arrowDir === 'end' ? diffWidth : diffWidth / 2,
      bottom: arrowDir === 'start' ? 0 : arrowDir === 'end' ? diffWidth : diffWidth / 2,
    };
    const isHorizontal: boolean = dir === 'left' || dir === 'right';
    const arrowLen = isHorizontal
      ? arrowDir === 'center' ? selfRect.height : Math.min(hostRect.height, selfRect.height)
      : arrowDir === 'center' ? selfRect.width : Math.min(hostRect.height, selfRect.height);

    const position = {
      arrowFace: dir,
      arrowDir: isHorizontal ? (arrowDir === 'end' ? 'bottom' : 'top') : (arrowDir === 'start' ? 'left' : 'right'),
      arrowPosition: arrowLen / 2 - 5,
      top: topMap[dir],
      left: leftMap[dir],
    };

    return position;
  }
}
