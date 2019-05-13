import { ChangeDetectorRef, QueryList, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

import { NzCarouselContentDirective } from '../carousel-content.directive';
import { FromToInterface, NzCarouselComponentAsSource, PointerVector } from '../carousel-definitions';

export abstract class NzCarouselBaseStrategy {
  // Properties that strategies may want to use.
  protected carouselComponent: NzCarouselComponentAsSource | null;
  protected contents: NzCarouselContentDirective[];
  protected slickListEl: HTMLElement;
  protected slickTrackEl: HTMLElement;
  protected length: number;
  protected unitWidth: number;
  protected unitHeight: number;

  protected get maxIndex(): number {
    return this.length - 1;
  }

  protected get firstEl(): HTMLElement {
    return this.contents[0].el;
  }

  protected get lastEl(): HTMLElement {
    return this.contents[this.maxIndex].el;
  }

  constructor(
    carouselComponent: NzCarouselComponentAsSource,
    protected cdr: ChangeDetectorRef,
    protected renderer: Renderer2
  ) {
    this.carouselComponent = carouselComponent;
  }

  withCarouselContents(contents: QueryList<NzCarouselContentDirective> | null): void {
    // TODO: carousel and its contents should be separated.
    // tslint:disable-next-line:no-non-null-assertion
    const carousel = this.carouselComponent!;
    const rect = carousel.el.getBoundingClientRect();
    this.slickListEl = carousel.slickListEl;
    this.slickTrackEl = carousel.slickTrackEl;
    this.unitWidth = rect.width;
    this.unitHeight = rect.height;
    this.contents = contents ? contents.toArray() : [];
    this.length = this.contents.length;
  }

  /**
   * Trigger transition.
   */
  // tslint:disable-next-line:variable-name
  abstract switch(_f: number, _t: number): Observable<void>;

  /**
   * When user drag the carousel component.
   * @optional
   */
  // tslint:disable-next-line:variable-name
  dragging(_vector: PointerVector): void {}

  /**
   * Destroy a scroll strategy.
   */
  dispose(): void {}

  protected getFromToInBoundary(f: number, t: number): FromToInterface {
    const length = this.maxIndex + 1;
    return { from: (f + length) % length, to: (t + length) % length };
  }
}
