import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  HostBinding,
  DoCheck,
  Renderer2
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'textarea[autosize]'
})
export class AutosizeDirective implements AfterViewInit, DoCheck {
  @HostBinding('style.overflow')
  public overflow = 'hidden';

  @Input()
  @HostBinding('rows')
  public rows = 1;

  constructor(private elem: ElementRef, private renderer: Renderer2) {}

  public ngAfterViewInit() {
    this.resize();
  }

  public ngDoCheck() {
    this.resize();
  }

  @HostListener('input')
  private resize() {
    const textarea = this.elem.nativeElement as HTMLTextAreaElement;
    // 计算不包含在滚动高度中的边框高度
    const borderHeight = textarea.offsetHeight - textarea.clientHeight;
    // 重置文本区域高度为自动，以正确计算新的高度
    this.setHeight('auto');
    // 设置新的高度
    this.setHeight(`${textarea.scrollHeight + borderHeight}px`);
  }

  private setHeight(value: string) {
    this.renderer.setStyle(this.elem.nativeElement, 'height', value);
  }
}
