import { InjectionToken } from '@angular/core';

export interface NzI18nInterface {
    locale: string;
    Pagination: NzPaginationI18nInterface;
}

export interface NzPaginationI18nInterface {
    items_per_page: string;
    jump_to: string;
    jump_to_confirm: string;
    page: string;
    prev_page: string;
    next_page: string;
    prev_5: string;
    next_5: string;
    prev_3: string;
    next_3: string;
}

export interface IndexableObject {
    [key: string]: any;
}

export type DateLocale = any;

export const NZ_I18N = new InjectionToken<NzI18nInterface>('nz-i18n');

export const NZ_DATE_LOCALE = new InjectionToken<DateLocale>('nz-date-locale');

export function _isNumberValue(value: any): boolean {
    return !isNaN(parseFloat(value as any)) && !isNaN(Number(value));
}

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}

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

// tslint:disable-next-line: no-any
export function InputNumber(): any {
    // tslint:disable-line: no-any
    return propDecoratorFactory('InputNumber', toNumber);
}

export function isInteger(value: string | number): boolean {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
