import { QueryList } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NzCarouselContentDirective } from '../carousel-content.directive';
import { PointerVector } from '../carousel-definitions';

import { NzCarouselBaseStrategy } from './base-strategy';

export class NzCarouselTransformStrategy extends NzCarouselBaseStrategy {
  private isDragging = false;
  private isTransitioning = false;

  private get vertical(): boolean {
    // tslint:disable-next-line:no-non-null-assertion
    return this.carouselComponent!.nzVertical;
  }

  dispose(): void {
    super.dispose();
    this.renderer.setStyle(this.slickTrackEl, 'transform', null);
  }

  withCarouselContents(contents: QueryList<NzCarouselContentDirective> | null): void {
    super.withCarouselContents(contents);

    // tslint:disable-next-line:no-non-null-assertion
    const carousel = this.carouselComponent!;
    const activeIndex = carousel.activeIndex;

    if (this.contents.length) {
      if (this.vertical) {
        this.renderer.setStyle(this.slickListEl, 'height', `${this.unitHeight}px`);
        this.renderer.setStyle(this.slickTrackEl, 'height', `${this.length * this.unitHeight}px`);
        this.renderer.setStyle(
          this.slickTrackEl,
          'transform',
          `translate3d(0, ${-activeIndex * this.unitHeight}px, 0)`
        );
      } else {
        this.renderer.setStyle(this.slickTrackEl, 'width', `${this.length * this.unitWidth}px`);
        this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-activeIndex * this.unitWidth}px, 0, 0)`);
      }

      this.contents.forEach((content: NzCarouselContentDirective) => {
        this.renderer.setStyle(content.el, 'position', 'relative');
        this.renderer.setStyle(content.el, 'width', `${this.unitWidth}px`);
      });
    }
  }

  // tslint:disable-next-line:variable-name
  switch(_f: number, _t: number): Observable<void> {
    const { to: t } = this.getFromToInBoundary(_f, _t);
    const complete$ = new Subject<void>();

    this.renderer.setStyle(this.slickTrackEl, 'transition', 'transform 500ms ease');

    if (this.vertical) {
      this.verticalTransform(_f, _t);
    } else {
      this.horizontalTransform(_f, _t);
    }

    this.isTransitioning = true;
    this.isDragging = false;

    setTimeout(() => {
      this.renderer.setStyle(this.slickTrackEl, 'transition', null);
      this.contents.forEach((content: NzCarouselContentDirective) => {
        this.renderer.setStyle(content.el, this.vertical ? 'top' : 'left', null);
      });

      if (this.vertical) {
        this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-t * this.unitHeight}px, 0)`);
      } else {
        this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-t * this.unitWidth}px, 0, 0)`);
      }

      this.isTransitioning = false;

      complete$.next();
      complete$.complete();
    // tslint:disable-next-line:no-non-null-assertion
    }, this.carouselComponent!.nzTransitionSpeed);

    return complete$.asObservable();
  }

  // tslint:disable-next-line:variable-name
  dragging(_vector: PointerVector): void {
    if (this.isTransitioning) {
      return;
    }

    // tslint:disable-next-line:no-non-null-assertion
    const activeIndex = this.carouselComponent!.activeIndex;

    // tslint:disable-next-line:no-non-null-assertion
    if (this.carouselComponent!.nzVertical) {
      if (!this.isDragging && this.length > 2) {
        if (activeIndex === this.maxIndex) {
          this.prepareVerticalContext(true);
        } else if (activeIndex === 0) {
          this.prepareVerticalContext(false);
        }
      }
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(0, ${-activeIndex * this.unitHeight + _vector.x}px, 0)`
      );
    } else {
      if (!this.isDragging && this.length > 2) {
        if (activeIndex === this.maxIndex) {
          this.prepareHorizontalContext(true);
        } else if (activeIndex === 0) {
          this.prepareHorizontalContext(false);
        }
      }
      this.renderer.setStyle(
        this.slickTrackEl,
        'transform',
        `translate3d(${-activeIndex * this.unitWidth + _vector.x}px, 0, 0)`
      );
    }

    this.isDragging = true;
  }

  // tslint:disable-next-line:variable-name
  private verticalTransform(_f: number, _t: number): void {
    const { from: f, to: t } = this.getFromToInBoundary(_f, _t);
    const needToAdjust = this.length > 2 && _t !== t;

    if (needToAdjust) {
      this.prepareVerticalContext(t < f);
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-_t * this.unitHeight}px, 0)`);
    } else {
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(0, ${-t * this.unitHeight}px, 0`);
    }
  }

  // tslint:disable-next-line:variable-name
  private horizontalTransform(_f: number, _t: number): void {
    const { from: f, to: t } = this.getFromToInBoundary(_f, _t);
    const needToAdjust = this.length > 2 && _t !== t;

    if (needToAdjust) {
      this.prepareHorizontalContext(t < f);
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-_t * this.unitWidth}px, 0, 0)`);
    } else {
      this.renderer.setStyle(this.slickTrackEl, 'transform', `translate3d(${-t * this.unitWidth}px, 0, 0`);
    }
  }

  private prepareVerticalContext(lastToFirst: boolean): void {
    if (lastToFirst) {
      this.renderer.setStyle(this.firstEl, 'top', `${this.length * this.unitHeight}px`);
      this.renderer.setStyle(this.lastEl, 'top', null);
    } else {
      this.renderer.setStyle(this.firstEl, 'top', null);
      this.renderer.setStyle(this.lastEl, 'top', `${-this.unitHeight * this.length}px`);
    }
  }

  private prepareHorizontalContext(lastToFirst: boolean): void {
    if (lastToFirst) {
      this.renderer.setStyle(this.firstEl, 'left', `${this.length * this.unitWidth}px`);
      this.renderer.setStyle(this.lastEl, 'left', null);
    } else {
      this.renderer.setStyle(this.firstEl, 'left', null);
      this.renderer.setStyle(this.lastEl, 'left', `${-this.unitWidth * this.length}px`);
    }
  }
}
