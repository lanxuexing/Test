import { Directive, HostListener} from '@angular/core';

@Directive({
    selector: 'button[appCounting]',
    // host: {
    //     '(click)': 'onClick($event.target)'
    // }
})
export class CountClicksDirective {
    numberOfClicks = 0;

    @HostListener('click', ['$event.target'])
    onClick(btn: HTMLElement) {
        // console.log('button', btn, 'number of clicks', this.numberOfClicks++);
    }
}
