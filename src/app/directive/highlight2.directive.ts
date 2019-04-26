import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
    selector: '[appHighlight2]'
})
export class Highlight2Directive {

    constructor(
        private el: ElementRef,
        private render: Renderer2
    ) {}

    @HostListener('document:click', ['$event.target'])
    onclick(element: HTMLElement) {
        // console.dir(element);
        if (this.el.nativeElement.contains(event.target)) {
            this.render.setStyle(this.el.nativeElement, 'background', 'purple');
        } else {
            this.render.setStyle(this.el.nativeElement, 'background', null);
        }
    }
}
