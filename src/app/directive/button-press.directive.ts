import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appButtonPress]',
    // host: {
    //     'role': 'button',
    //     '[class.active]': 'isActive'
    // }
})
export class ButtonPressDirective {
    // isActive: boolean;

    @HostBinding('attr.role') role = 'button';
    @HostBinding('class.active') isActive: boolean;

    @HostListener('mousedown')
    onMousedown() {
        this.isActive = true;
    }

    @HostListener('mouseup')
    onmouseup() {
        this.isActive = false;
    }
}
