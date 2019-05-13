export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export function _isNumberValue(value) {
    // 先判定是否为number
    if (typeof value !== 'number') {
        return false;
    }
    if (!isNaN(value)) {
        return true;
    } else {
        return false;
    }
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

// tslint:disable-next-line: no-any
export function InputNumber(): any {
    // tslint:disable-line: no-any
    return propDecoratorFactory('InputNumber', toNumber);
}

// tslint:disable-next-line:no-any
export function isNotNil(value: any): boolean {
    return typeof value !== 'undefined' && value !== null;
}
