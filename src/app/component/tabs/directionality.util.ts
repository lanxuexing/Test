
import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, inject, Injectable, InjectionToken, OnDestroy, Optional } from '@angular/core';


export type Direction = 'ltr' | 'rtl';
export const DIR_DOCUMENT = new InjectionToken<Document>('cdk-dir-doc', {
    providedIn: 'root',
    factory: DIR_DOCUMENT_FACTORY,
});
export function DIR_DOCUMENT_FACTORY(): Document {
    return inject(DOCUMENT);
}


/**
 * The directionality (LTR / RTL) context for the application (or a subtree of it).
 * Exposes the current direction and a stream of direction changes.
 */
@Injectable({ providedIn: 'root' })
export class Directionality implements OnDestroy {
    /** The current 'ltr' or 'rtl' value. */
    readonly value: Direction = 'ltr';

    /** Stream that emits whenever the 'ltr' / 'rtl' state changes. */
    readonly change = new EventEmitter<Direction>();

    // tslint:disable-next-line:variable-name
    constructor(@Optional() @Inject(DIR_DOCUMENT) _document?: any) {
        if (_document) {
            // TODO: handle 'auto' value -
            // We still need to account for dir="auto".
            // It looks like HTMLElemenet.dir is also "auto" when that's set to the attribute,
            // but getComputedStyle return either "ltr" or "rtl". avoiding getComputedStyle for now
            const bodyDir = _document.body ? _document.body.dir : null;
            const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
            const value = bodyDir || htmlDir;
            this.value = (value === 'ltr' || value === 'rtl') ? value : 'ltr';
        }
    }

    ngOnDestroy() {
        this.change.complete();
    }
}
