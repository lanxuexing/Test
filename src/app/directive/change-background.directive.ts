import { Directive, Input, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appChangeBackground]'
})
export class ChangeBackGroundDirective {
    defaultColor = 'yellow';

    @Input() backgroundColor: string;

    constructor(
        private el: ElementRef,
        private render: Renderer2
    ) {
        this.setStyle(this.defaultColor);
    }

    @HostListener('click')
    onclick() {
        // console.log('哈哈哈哈');
        this.setStyle(this.backgroundColor || this.defaultColor);
    }

    setStyle(color: string) {
        // console.log('颜色', this.backgroundColor);
        this.render.setStyle(this.el.nativeElement, 'background-color', color);
    }
}
