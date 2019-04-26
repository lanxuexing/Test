import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
    selector: '[appUnless]'
})
export class UnlessDirective {
    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>
    ) {}

    @Input('appUnless')
    set condition(newcondition: boolean) {
        if (!newcondition) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainerRef.clear();
        }
    }
}
