import { ElementRef } from '@angular/core';

// tslint:disable-next-line: no-any
function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: any, propName: string) => void {
    // tslint:disable-next-line: no-any
    function propDecorator(target: any, propName: string): void {
        const privatePropName = `$$__${propName}`;

        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
        }

        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });

        Object.defineProperty(target, propName, {
            get(): string {
                return this[privatePropName]; // tslint:disable-line:no-invalid-this
            },
            set(value: T): void {
                this[privatePropName] = fallback(value); // tslint:disable-line:no-invalid-this
            }
        });
    }

    return propDecorator;
}

export function coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
}

export function toBoolean(value: boolean | string): boolean {
    return coerceBooleanProperty(value);
}


// tslint:disable-next-line: no-any
export function InputBoolean(): any {
    return propDecoratorFactory('InputBoolean', toBoolean);
}

export function coerceNumberProperty(value: any): number;
export function coerceNumberProperty<D>(value: any, fallback: D): number | D;
export function coerceNumberProperty(value: any, fallbackValue = 0) {
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export function _isNumberValue(value: any): boolean {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
}

export function coerceElement<T>(elementOrRef: ElementRef<T> | T): T {
    return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export type NzSizeLDSType = 'large' | 'default' | 'small';
