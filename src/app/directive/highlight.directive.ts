import { Directive, HostListener, ElementRef, Renderer2} from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})

export class HighlightDirective {
    constructor(
        private render: Renderer2,
        private el: ElementRef
    ) {}

    @HostListener('document:click', ['$event'])
    onClick() {
        // console.log('所有元素', this.el.nativeElement);
        // console.log('目标元素', event.target);
        if (this.el.nativeElement.contains(event.target)) {
            this.highlight('purple');
        } else {
            this.highlight(null);
        }
    }

    highlight(color: string) {
        this.render.setStyle(this.el.nativeElement, 'background-color', color);
    }
}
