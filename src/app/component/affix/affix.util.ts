import { reqAnimFrame } from './request-animation';

export interface IndexableObject {
    [key: string]: any; // tslint:disable-line:no-any
}

export function shallowEqual(objA?: IndexableObject, objB?: IndexableObject): boolean {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    // tslint:disable-next-line:prefer-for-of
    for (let idx = 0; idx < keysA.length; idx++) {
        const key = keysA[idx];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        if (objA[key] !== objB[key]) {
            return false;
        }
    }

    return true;
}

const availablePrefixes = ['moz', 'ms', 'webkit'];

export function cancelRequestAnimationFrame(id: number): any {
    if (typeof window === 'undefined') {
        return null;
    }
    if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id);
    }
    const prefix = availablePrefixes.filter(
        key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window
    )[0];

    return prefix
        ? ((window as any)[`${prefix}CancelAnimationFrame`] || (window as any)[`${prefix}CancelRequestAnimationFrame`])
            // @ts-ignore
            .call(this, id)
        : clearTimeout(id);
}

export default function throttleByAnimationFrame(fn: any) {
    let requestId: number | null;

    const later = (args: any[]) => () => {
        requestId = null;
        fn(...args);
    };

    const throttled = (...args: any[]) => {
        if (requestId == null) {
            requestId = reqAnimFrame(later(args));
        }
    };

    // tslint:disable-next-line:no-non-null-assertion
    (throttled as any).cancel = () => cancelRequestAnimationFrame(requestId!);

    return throttled;
}

export function throttleByAnimationFrameDecorator() {
    // tslint:disable-next-line:only-arrow-functions
    return function(target: any, key: string, descriptor: any) {
        const fn = descriptor.value;
        let definingProperty = false;
        return {
            configurable: true,
            get() {
                if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
                    return fn;
                }

                const boundFn = throttleByAnimationFrame(fn.bind(this));
                definingProperty = true;
                Object.defineProperty(this, key, {
                    value: boundFn,
                    configurable: true,
                    writable: true
                });
                definingProperty = false;
                return boundFn;
            }
        };
    };
}

export function _isNumberValue(value: any): boolean {
    return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
}

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export interface NGStyleInterface {
    [klass: string]: any; // tslint:disable-line:no-any
}
